import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import CategorySelection from "../components/CategorySelection";
import Quiz from "../components/Quiz";
import { useSocket } from "../components/SocketProvider";
import { GAME_CATEGORIES, MULTIPLAYER_QUESTION_SECONDS } from "../constants/gameConfig";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";

const pickCategoriesForTurn = () => [...GAME_CATEGORIES].sort(() => 0.5 - Math.random()).slice(0, 6);

function MultiplayerGame() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { gamesById, chooseCategory, submitAnswer, refreshDashboard, lastSystemMessage } = useSocket();
  const [timeLeft, setTimeLeft] = useState(MULTIPLAYER_QUESTION_SECONDS);
  const [turnCategories, setTurnCategories] = useState(() => pickCategoriesForTurn());
  const [pendingCategoryId, setPendingCategoryId] = useState(null);
  const timerRef = useRef(null);
  const submissionLockRef = useRef(false);
  const game = gamesById[gameId];

  const canPickCategory =
    game?.status === "ACTIVE" && game?.phase === "PICK_CATEGORY" && game?.isYourTurnToPick;
  const canAnswer =
    game?.status === "ACTIVE" && game?.phase === "ANSWERING" && game?.isYourTurnToAnswer;

  const scoreLabel = useMemo(() => {
    if (!game) return "";
    return `${game.selfScore} - ${game.opponentScore}`;
  }, [game]);

  const completionMessage = useMemo(() => {
    if (!game || game.status !== "COMPLETED") {
      return "";
    }

    if (game.selfScore === game.opponentScore) {
      return "Draw game. No multiplayer leaderboard points awarded.";
    }

    if (game.selfScore > game.opponentScore) {
      return `You won and earned ${game.selfScore} leaderboard points.`;
    }

    return `${game.opponentUsername} won and earned ${game.opponentScore} leaderboard points.`;
  }, [game]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const submitCurrentAnswer = useCallback(
    (selectedAnswer) => {
      if (!game || submissionLockRef.current) return;
      submissionLockRef.current = true;
      submitAnswer(game.id, game.questionIndex, selectedAnswer);
    },
    [game, submitAnswer]
  );

  useEffect(() => {
    refreshDashboard();
  }, [refreshDashboard, gameId]);

  useEffect(() => {
    submissionLockRef.current = false;
  }, [game?.id, game?.questionIndex, game?.phase, game?.status, game?.answeringPlayerClerkId]);

  useEffect(() => {
    clearTimer();

    if (!canAnswer || !game?.question) {
      setTimeLeft(MULTIPLAYER_QUESTION_SECONDS);
      return undefined;
    }

    setTimeLeft(MULTIPLAYER_QUESTION_SECONDS);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const nextValue = prev - 1;
        if (nextValue <= 0) {
          clearTimer();
          submitCurrentAnswer(null);
          return 0;
        }
        return nextValue;
      });
    }, 1000);

    return () => {
      clearTimer();
    };
  }, [canAnswer, game?.question, game?.questionIndex, clearTimer, submitCurrentAnswer]);

  useEffect(
    () => () => {
      clearTimer();
    },
    [clearTimer]
  );

  useEffect(() => {
    if (!canPickCategory) {
      setPendingCategoryId(null);
    }
  }, [canPickCategory]);

  useEffect(() => {
    if (canPickCategory) {
      setTurnCategories(pickCategoriesForTurn());
      setPendingCategoryId(null);
    }
  }, [canPickCategory, game?.id, game?.completedTurns]);

  const handleCategorySelect = (category) => {
    if (!game || !category || pendingCategoryId) {
      return;
    }

    setPendingCategoryId(category.id);
    setTurnCategories([category]);
    chooseCategory(game.id, category.name);
  };

  const renderBody = () => {
    if (!game) {
      return (
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle>Game not available</CardTitle>
            <CardDescription>{lastSystemMessage?.message || "This game has finished or was deleted."}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      );
    }

    if (canPickCategory) {
      return (
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle>Your turn to pick</CardTitle>
            <CardDescription>
              Pick a category. Both players will answer the same questions for this turn.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CategorySelection
              categories={turnCategories}
              onSelectCategory={handleCategorySelect}
              selectedCategoryId={pendingCategoryId}
              disableSelection={Boolean(pendingCategoryId)}
            />
          </CardContent>
        </Card>
      );
    }

    if (canAnswer && game.question) {
      const timerValue = (timeLeft / MULTIPLAYER_QUESTION_SECONDS) * 100;
      return (
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle>Your turn to answer</CardTitle>
            <CardDescription>
              <Badge variant="secondary">Category: {game.currentCategory}</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
                <span>Time left</span>
                <span className="font-semibold text-foreground">{timeLeft}s</span>
              </div>
              <Progress value={timerValue} className="h-2.5" />
            </div>
            <Quiz
              key={`${game.id}-${game.questionIndex}`}
              question={game.question}
              onAnswer={(selectedAnswer) => {
                clearTimer();
                submitCurrentAnswer(selectedAnswer);
              }}
              onSelected={clearTimer}
              questionNumber={game.questionNumber}
              totalQuestions={game.totalQuestionsInTurn}
            />
          </CardContent>
        </Card>
      );
    }

    if (game.status === "COMPLETED") {
      return (
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle>Game Complete</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">{completionMessage}</p>
            <Button variant="secondary" onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      );
    }

    const waitingMessage =
      game.phase === "ANSWERING" && game.currentCategory
        ? `${game.opponentUsername} is currently answering ${game.currentCategory}.`
        : `${game.opponentUsername} is choosing a category.`;

    return (
      <Card className="border-border/70">
        <CardHeader>
          <CardTitle>Waiting for opponent</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{waitingMessage}</p>
          <p className="mt-2 text-sm">
            Turn {Math.min(game.completedTurns + 1, game.totalTurns)} / {game.totalTurns}
          </p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container pb-8 pt-28">
        <section className="mx-auto mb-6 max-w-4xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Multiplayer Match</h1>
          {game && (
            <Card className="mx-auto mt-4 max-w-2xl border-border/70 bg-card/70">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between text-sm font-semibold sm:text-base">
                  <span>You</span>
                  <span>{scoreLabel}</span>
                  <span>{game.opponentUsername}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {canAnswer
                    ? `Completed turns: ${game.completedTurns}/${game.totalTurns}`
                    : `Difficulty: ${game.difficulty} | Completed turns: ${game.completedTurns}/${game.totalTurns}`}
                </p>
              </CardContent>
            </Card>
          )}
        </section>

        <section className="mx-auto w-full max-w-4xl">{renderBody()}</section>
      </main>
    </div>
  );
}

export default MultiplayerGame;
