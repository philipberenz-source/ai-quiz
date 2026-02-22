export const createMultiplayerSocketController = ({
  io,
  repository,
  service,
  cleanup,
  generateQuestions,
  constants,
}) => {
  const emitToUser = (userId, eventName, payload) => {
    io.to(service.userRoom(userId)).emit(eventName, payload);
  };

  const emitGameUpdated = (game) => {
    emitToUser(
      game.player1ClerkId,
      "game:updated",
      service.toGameSnapshot(game, game.player1ClerkId)
    );
    emitToUser(
      game.player2ClerkId,
      "game:updated",
      service.toGameSnapshot(game, game.player2ClerkId)
    );
  };

  const syncDashboard = async (userId) => {
    if (!userId) {
      return;
    }

    const [activeGames] = await Promise.all([repository.getActiveGamesForUser(userId)]);
    const pending = service.getPendingInvitesForUser(userId);

    emitToUser(userId, "dashboard:sync", {
      pendingInvites: pending,
      activeGames: activeGames.map((game) => service.toDashboardGame(game, userId)),
    });

    activeGames.forEach((game) => {
      emitToUser(userId, "game:updated", service.toGameSnapshot(game, userId));
    });
  };

  const broadcastActiveUsers = async () => {
    const onlineUserIds = Array.from(service.mapOnlineUsers().keys());
    if (onlineUserIds.length === 0) {
      io.emit("presence:active-users", []);
      return;
    }

    const activeGames = await repository.findActiveGamesForUsers(onlineUserIds);
    const playingUsers = new Set();
    activeGames.forEach((game) => {
      playingUsers.add(game.player1ClerkId);
      playingUsers.add(game.player2ClerkId);
    });

    const payload = onlineUserIds.map((userId) => ({
      userId,
      username: service.getUsernameForUser(userId),
      status: playingUsers.has(userId) ? "playing" : "online",
    }));

    io.emit("presence:active-users", payload);
  };

  const invalidateInvitesForUser = async (userId) => {
    const affectedUsers = new Set();
    const pendingInviteEntries = Array.from(service.listPendingInvites());

    for (const [inviteId, invite] of pendingInviteEntries) {
      if (invite.fromUserId === userId || invite.toUserId === userId) {
        service.removeInvite(inviteId);
        if (invite.fromUserId !== userId) {
          affectedUsers.add(invite.fromUserId);
          emitToUser(invite.fromUserId, "invite:result", {
            status: "cancelled",
            message: "Invite was cancelled because the other player left.",
            inviteId,
          });
        }
        if (invite.toUserId !== userId) {
          affectedUsers.add(invite.toUserId);
        }
      }
    }

    await Promise.all(Array.from(affectedUsers).map((targetUserId) => syncDashboard(targetUserId)));
  };

  const refreshParticipants = async (game) => {
    emitGameUpdated(game);
    await Promise.all([syncDashboard(game.player1ClerkId), syncDashboard(game.player2ClerkId)]);
    await broadcastActiveUsers();
  };

  const deleteGameAndNotify = async (game, payload = {}) => {
    if (!game?.id) {
      return;
    }

    cleanup.clearGameCleanupTimer(game.id);
    await repository.deleteGame(game.id);

    const reason = payload.reason || "removed";
    const message = payload.message || "Game was removed.";
    const eventPayload = {
      gameId: game.id,
      reason,
      message,
    };

    emitToUser(game.player1ClerkId, "game:removed", eventPayload);
    emitToUser(game.player2ClerkId, "game:removed", eventPayload);

    await Promise.all([syncDashboard(game.player1ClerkId), syncDashboard(game.player2ClerkId)]);
    await broadcastActiveUsers();
  };

  const registerAuthMiddleware = () => {
    io.use((socket, next) => {
      const { userId, username } = socket.handshake.auth || {};
      if (!userId) {
        return next(new Error("Authentication error: userId required in handshake auth"));
      }
      socket.data.userId = userId;
      socket.data.username = username || "unknown";
      return next();
    });
  };

  const registerConnectionHandlers = () => {
    io.on("connection", async (socket) => {
      const { userId, username } = socket.data;

      service.registerSocketUser({
        socketId: socket.id,
        userId,
        username,
      });
      socket.join(service.userRoom(userId));

      console.log(`Socket connected: ${socket.id} userId=${userId} username=${username}`);

      try {
        await syncDashboard(userId);
        await broadcastActiveUsers();
      } catch (error) {
        console.error("Error while syncing after connect:", error);
      }

      socket.on("dashboard:refresh", async () => {
        try {
          const validationMessage = service.validateDashboardRefreshPayload({ userId });
          if (validationMessage) {
            socket.emit("game:error", { message: validationMessage });
            return;
          }

          await syncDashboard(userId);
        } catch (_error) {
          socket.emit("game:error", { message: "Failed to refresh dashboard." });
        }
      });

      socket.on("game:delete", async (payload = {}) => {
        try {
          const validationMessage = service.validateGameDeletePayload(payload);
          if (validationMessage) {
            socket.emit("game:error", { message: validationMessage });
            return;
          }

          const { gameId } = payload;
          let game;
          try {
            game = await repository.findGameById(gameId);
          } catch (error) {
            socket.emit("game:error", {
              message: repository.getErrorMessage(error, "Failed to load game."),
            });
            return;
          }

          if (!game || !service.isPlayerInGame(game, userId)) {
            socket.emit("game:error", { message: "Game not found." });
            return;
          }

          if (game.status !== "ACTIVE") {
            socket.emit("game:error", { message: "Only active games can be deleted." });
            return;
          }

          const actorName = service.getUsernameForUser(userId);
          const actorMessage = "You stopped and deleted the active game.";

          await deleteGameAndNotify(game, {
            reason: "cancelled",
            message: `${actorName} stopped the active game.`,
          });

          socket.emit("invite:result", {
            status: "cancelled",
            gameId,
            message: actorMessage,
          });
        } catch (error) {
          console.error("game:delete failed:", error);
          socket.emit("game:error", {
            message: repository.getErrorMessage(error, "Failed to delete game."),
          });
        }
      });

      socket.on("invite:send", async (payload = {}) => {
        try {
          const { toUserId, difficulty } = payload;

          const validationMessage = service.validateInviteRequest({ userId, toUserId, difficulty });
          if (validationMessage) {
            socket.emit("invite:result", {
              status: "error",
              message: validationMessage,
            });
            return;
          }

          const existingPairGame = await repository.getActiveGameForPair(service.getPairKey(userId, toUserId));
          if (existingPairGame) {
            socket.emit("invite:result", {
              status: "existing-game",
              gameId: existingPairGame.id,
              message: "An active game already exists with this player.",
            });
            await Promise.all([syncDashboard(userId), syncDashboard(toUserId)]);
            return;
          }

          const [senderActiveGame, targetActiveGame] = await Promise.all([
            repository.getAnyActiveGameForUser(userId),
            repository.getAnyActiveGameForUser(toUserId),
          ]);

          if (senderActiveGame) {
            socket.emit("invite:result", {
              status: "error",
              message: "Finish your current active game before inviting another player.",
              gameId: senderActiveGame.id,
            });
            return;
          }

          if (targetActiveGame) {
            socket.emit("invite:result", {
              status: "error",
              message: "That player already has an active game.",
            });
            return;
          }

          if (service.hasPendingInviteBetween(userId, toUserId)) {
            socket.emit("invite:result", {
              status: "error",
              message: "There is already a pending invite between these players.",
            });
            return;
          }

          const invite = service.buildInvite({ fromUserId: userId, toUserId, difficulty });
          service.addInvite(invite);

          emitToUser(toUserId, "invite:received", invite);
          socket.emit("invite:result", {
            status: "sent",
            inviteId: invite.inviteId,
            message: "Invite sent.",
          });

          await Promise.all([syncDashboard(userId), syncDashboard(toUserId)]);
        } catch (error) {
          console.error("invite:send failed:", error);
          socket.emit("invite:result", {
            status: "error",
            message: repository.getErrorMessage(error, "Failed to send invite."),
          });
        }
      });

      socket.on("invite:respond", async (payload = {}) => {
        try {
          const validationMessage = service.validateInviteResponsePayload(payload);
          if (validationMessage) {
            socket.emit("invite:result", {
              status: "error",
              message: validationMessage,
            });
            return;
          }

          const { inviteId, action } = payload;
          const invite = service.getInvite(inviteId);
          if (!invite) {
            socket.emit("invite:result", {
              status: "error",
              message: "Invite no longer exists.",
              inviteId,
            });
            await syncDashboard(userId);
            return;
          }

          if (invite.toUserId !== userId) {
            socket.emit("invite:result", {
              status: "error",
              message: "You are not allowed to respond to this invite.",
              inviteId,
            });
            return;
          }

          service.removeInvite(inviteId);

          if (action === "decline") {
            emitToUser(invite.fromUserId, "invite:result", {
              status: "declined",
              inviteId,
              message: `${service.getUsernameForUser(userId)} declined your invite.`,
            });
            socket.emit("invite:result", {
              status: "declined",
              inviteId,
              message: "Invite declined.",
            });
            await Promise.all([syncDashboard(invite.fromUserId), syncDashboard(invite.toUserId)]);
            return;
          }

          let game = await repository.getActiveGameForPair(
            service.getPairKey(invite.fromUserId, invite.toUserId)
          );
          if (!game) {
            const [inviterActiveGame, inviteeActiveGame] = await Promise.all([
              repository.getAnyActiveGameForUser(invite.fromUserId),
              repository.getAnyActiveGameForUser(invite.toUserId),
            ]);

            if (inviterActiveGame && !service.isSamePair(inviterActiveGame, invite.fromUserId, invite.toUserId)) {
              emitToUser(invite.fromUserId, "invite:result", {
                status: "error",
                message: "You already started another active game.",
              });
              socket.emit("invite:result", {
                status: "error",
                message: "The inviter already started another active game.",
              });
              await Promise.all([syncDashboard(invite.fromUserId), syncDashboard(invite.toUserId)]);
              return;
            }

            if (inviteeActiveGame && !service.isSamePair(inviteeActiveGame, invite.fromUserId, invite.toUserId)) {
              emitToUser(invite.fromUserId, "invite:result", {
                status: "error",
                message: "The other player has another active game.",
              });
              socket.emit("invite:result", {
                status: "error",
                message: "You already have another active game.",
              });
              await Promise.all([syncDashboard(invite.fromUserId), syncDashboard(invite.toUserId)]);
              return;
            }

            game = await repository.createGame(service.createGameDataFromInvite(invite));
          }

          emitToUser(invite.fromUserId, "invite:result", {
            status: "accepted",
            inviteId,
            gameId: game.id,
            message: "Invite accepted. Multiplayer game is active.",
          });
          socket.emit("invite:result", {
            status: "accepted",
            inviteId,
            gameId: game.id,
            message: "Game created.",
          });

          await refreshParticipants(game);
        } catch (error) {
          console.error("invite:respond failed:", error);
          socket.emit("invite:result", {
            status: "error",
            message: repository.getErrorMessage(error, "Failed to respond to invite."),
          });
        }
      });

      socket.on("game:choose-category", async (payload = {}) => {
        try {
          const { gameId, category } = payload;
          const validationMessage = service.validateChooseCategoryPayload({ gameId, category });
          if (validationMessage) {
            socket.emit("game:error", { message: validationMessage });
            return;
          }

          let game;
          try {
            game = await repository.findGameById(gameId);
          } catch (error) {
            socket.emit("game:error", {
              message: repository.getErrorMessage(error, "Failed to load game."),
            });
            return;
          }
          if (!game || !service.isPlayerInGame(game, userId)) {
            socket.emit("game:error", { message: "Game not found." });
            return;
          }

          if (game.status !== "ACTIVE") {
            socket.emit("game:error", { message: "Game is no longer active." });
            return;
          }

          if (game.phase !== "PICK_CATEGORY" || game.currentTurnClerkId !== userId) {
            socket.emit("game:error", { message: "It is not your turn to pick a category." });
            return;
          }

          const questions = await generateQuestions(category, game.difficulty);
          if (!Array.isArray(questions) || questions.length < constants.QUESTIONS_PER_TURN) {
            socket.emit("game:error", {
              message: "Could not generate enough questions for this category.",
            });
            return;
          }

          const turnQuestions = questions.slice(0, constants.QUESTIONS_PER_TURN);
          const updatedGame = await repository.updateGame(game.id, {
            phase: "ANSWERING",
            currentCategory: category,
            currentQuestions: turnQuestions,
            currentQuestionIndex: 0,
            answeringPlayerClerkId: userId,
          });

          await refreshParticipants(updatedGame);
        } catch (error) {
          console.error("game:choose-category failed:", error);
          socket.emit("game:error", {
            message: repository.getErrorMessage(error, "Failed to choose category."),
          });
        }
      });

      socket.on("game:submit-answer", async (payload = {}) => {
        try {
          const { gameId, questionIndex, selectedAnswer } = payload;
          const { error: validationError, parsedIndex } = service.validateSubmitAnswerPayload({
            gameId,
            questionIndex,
          });
          const answerValue = typeof selectedAnswer === "string" ? selectedAnswer : null;

          if (validationError) {
            socket.emit("game:error", { message: validationError });
            return;
          }

          let game;
          try {
            game = await repository.findGameById(gameId);
          } catch (error) {
            socket.emit("game:error", {
              message: repository.getErrorMessage(error, "Failed to load game."),
            });
            return;
          }
          if (!game || !service.isPlayerInGame(game, userId)) {
            socket.emit("game:error", { message: "Game not found." });
            return;
          }

          if (game.status !== "ACTIVE") {
            socket.emit("game:error", { message: "Game is no longer active." });
            return;
          }

          if (game.phase !== "ANSWERING" || game.answeringPlayerClerkId !== userId) {
            socket.emit("game:error", { message: "It is not your turn to answer." });
            return;
          }

          if (game.currentQuestionIndex !== parsedIndex) {
            socket.emit("game:error", { message: "Stale answer submission detected." });
            return;
          }

          const questions = Array.isArray(game.currentQuestions) ? game.currentQuestions : [];
          const question = questions[parsedIndex];
          if (!question) {
            socket.emit("game:error", { message: "Question not found for this turn." });
            return;
          }

          const isCorrect = answerValue !== null && answerValue === question.answer;
          const updateData = service.computeAnswerUpdateData({
            game,
            userId,
            parsedIndex,
            isCorrect,
          });

          const updatedGame = await repository.updateGame(game.id, updateData);

          if (updatedGame.status === "COMPLETED") {
            await service.awardCompletedGame(updatedGame);
            await refreshParticipants(updatedGame);
            cleanup.scheduleCompletedGameCleanup(updatedGame);
            return;
          }

          await refreshParticipants(updatedGame);
        } catch (error) {
          console.error("game:submit-answer failed:", error);
          socket.emit("game:error", {
            message: repository.getErrorMessage(error, "Failed to submit answer."),
          });
        }
      });

      socket.on("disconnect", async (reason) => {
        const { disconnectedUserId, removedUser } = service.unregisterSocketUser({
          socketId: socket.id,
        });

        if (!disconnectedUserId) {
          return;
        }

        if (removedUser) {
          try {
            await invalidateInvitesForUser(disconnectedUserId);
          } catch (error) {
            console.error("Failed to invalidate invites on disconnect:", error);
          }
        }

        console.log(`Socket disconnected: ${socket.id} reason=${reason}`);

        try {
          await broadcastActiveUsers();
        } catch (error) {
          console.error("Failed to broadcast active users after disconnect:", error);
        }
      });
    });
  };

  return {
    syncDashboard,
    broadcastActiveUsers,
    invalidateInvitesForUser,
    refreshParticipants,
    deleteGameAndNotify,
    registerAuthMiddleware,
    registerConnectionHandlers,
  };
};
