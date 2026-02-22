import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import { useSocket } from "../components/SocketProvider";
import { GAME_DIFFICULTIES } from "../constants/gameConfig";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useUser();
  const {
    activeUsers,
    pendingInvites,
    activeGames,
    lastSystemMessage,
    sendInvite,
    respondInvite,
    deleteGame,
  } = useSocket();
  const [searchQuery, setSearchQuery] = useState("");
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [inviteTarget, setInviteTarget] = useState(null);
  const [inviteDifficulty, setInviteDifficulty] = useState(GAME_DIFFICULTIES[0].id);
  const [inviteSubmitting, setInviteSubmitting] = useState(false);

  const hasOwnActiveGame = activeGames.length > 0;

  const filteredPlayers = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return (activeUsers || [])
      .filter((player) => player.userId !== user?.id)
      .filter((player) => (player.username || "").toLowerCase().includes(normalizedQuery));
  }, [activeUsers, searchQuery, user?.id]);

  useEffect(() => {
    if (!inviteSubmitting || !lastSystemMessage?.status) {
      return;
    }

    if (!["sent", "error", "existing-game"].includes(lastSystemMessage.status)) {
      return;
    }

    setInviteSubmitting(false);

    if (lastSystemMessage.status === "sent" || lastSystemMessage.status === "existing-game") {
      setInviteDialogOpen(false);
      setInviteTarget(null);
    }
  }, [inviteSubmitting, lastSystemMessage]);

  const resolveSystemMessage = (messagePayload) => {
    if (!messagePayload) {
      return "";
    }

    return messagePayload.message || "";
  };

  const renderGameState = (game) => {
    if (game.isYourTurnToPick) {
      return "Your turn: choose a category";
    }
    if (game.isYourTurnToAnswer) {
      return "Your turn: answer questions";
    }
    return "Other player is currently playing";
  };

  const openInviteDialog = (player) => {
    setInviteTarget(player);
    setInviteDifficulty(GAME_DIFFICULTIES[0].id);
    setInviteDialogOpen(true);
  };

  const handleInviteSubmit = () => {
    if (!inviteTarget || inviteSubmitting) {
      return;
    }

    setInviteSubmitting(true);
    sendInvite(inviteTarget.userId, inviteDifficulty);
  };

  const handleDeleteGame = (gameId) => {
    const shouldDelete = window.confirm("Delete this active game?");
    if (!shouldDelete) {
      return;
    }
    deleteGame(gameId);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container pb-8 pt-28">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Player Dashboard</h1>
        </header>

        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={() => navigate("/singleplayer")}>Play Singleplayer</Button>
            <Button variant="secondary" onClick={() => navigate("/leaderboard")}>
              Open Leaderboard
            </Button>
          </div>

          {lastSystemMessage?.message && (
            <Card
              className={
                lastSystemMessage.status === "error" ||
                lastSystemMessage.status === "declined" ||
                lastSystemMessage.status === "cancelled"
                  ? "border-destructive/50"
                  : "border-emerald-500/40"
              }
            >
              <CardContent className="pt-6 text-sm font-medium">
                {resolveSystemMessage(lastSystemMessage)}
              </CardContent>
            </Card>
          )}

          {pendingInvites.length > 0 && (
            <Card className="border-border/70">
              <CardHeader>
                <CardTitle>Game Invites</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {pendingInvites.map((invite) => {
                  const difficultyLabel =
                    GAME_DIFFICULTIES.find((difficulty) => difficulty.id === invite.difficulty)?.name ||
                    invite.difficulty;
                  return (
                    <div
                      key={invite.inviteId}
                      className="flex flex-col justify-between gap-3 rounded-lg border border-border/70 bg-secondary/30 p-3 sm:flex-row sm:items-center"
                    >
                      <span className="text-sm">
                        {invite.fromUsername} invited you ({difficultyLabel})
                      </span>
                      <div className="flex gap-2">
                        <Button onClick={() => respondInvite(invite.inviteId, "accept")}>Accept</Button>
                        <Button variant="destructive" onClick={() => respondInvite(invite.inviteId, "decline")}>
                          Decline
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}

          {activeGames.length > 0 && (
            <Card className="border-border/70">
              <CardHeader>
                <CardTitle>Active Games</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {activeGames.map((game) => (
                  <div
                    key={game.id}
                    className="flex flex-col justify-between gap-3 rounded-lg border border-border/70 bg-secondary/25 p-3 sm:flex-row sm:items-center"
                  >
                    <div className="space-y-1">
                      <p className="font-semibold">vs {game.opponentUsername}</p>
                      <p className="text-sm text-muted-foreground">{renderGameState(game)}</p>
                      <p className="text-sm text-blue-300">
                        Score {game.selfScore} - {game.opponentScore}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="secondary" onClick={() => navigate(`/multiplayer/game/${game.id}`)}>
                        Open
                      </Button>
                      <Button variant="destructive" onClick={() => handleDeleteGame(game.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Online Players</CardTitle>
              <CardDescription>Invite a player to start a multiplayer match.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-col gap-2 sm:flex-row">
                <Input
                  type="text"
                  placeholder="Search players..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  aria-label="Search players"
                />
                <Button variant="secondary">Search</Button>
              </div>

              <div className="max-h-[430px] space-y-2 overflow-y-auto pr-1">
                {filteredPlayers.length > 0 ? (
                  filteredPlayers.map((player) => (
                    <div
                      key={player.userId}
                      className="flex flex-col justify-between gap-2 rounded-lg border border-border/70 bg-secondary/20 p-3 sm:flex-row sm:items-center"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            player.status === "playing" ? "bg-destructive" : "bg-emerald-400"
                          }`}
                        />
                        <span className="font-medium">{player.username}</span>
                        <Badge variant="outline">{player.status === "playing" ? "In Match" : "Online"}</Badge>
                      </div>
                      <Button
                        onClick={() => openInviteDialog(player)}
                        disabled={hasOwnActiveGame || player.status === "playing"}
                      >
                        {hasOwnActiveGame
                          ? "Finish Active Game"
                          : player.status === "playing"
                          ? "In Game"
                          : "Invite"}
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No players online.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Invite</DialogTitle>
            <DialogDescription>Select difficulty and confirm your invite.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-1">
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground">Player</span>
              <span className="font-semibold">{inviteTarget?.username || "-"}</span>
            </div>

            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground">Difficulty</span>
              <Select value={inviteDifficulty} onValueChange={setInviteDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {GAME_DIFFICULTIES.map((difficulty) => (
                    <SelectItem key={difficulty.id} value={difficulty.id}>
                      {difficulty.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                if (!inviteSubmitting) {
                  setInviteDialogOpen(false);
                }
              }}
              disabled={inviteSubmitting}
            >
              Cancel
            </Button>
            <Button onClick={handleInviteSubmit} disabled={!inviteTarget || inviteSubmitting}>
              {inviteSubmitting ? "Sending..." : "Send Invite"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Dashboard;
