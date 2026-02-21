import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategorySelection from "../components/CategorySelection";
import Quiz from "../components/Quiz";
import { useSocket } from "../components/SocketProvider";
import { GAME_CATEGORIES, MULTIPLAYER_QUESTION_SECONDS } from "../constants/gameConfig";
import "../styles/SinglePlayer.css";
import "../styles/MultiplayerGame.css";

const pickCategoriesForTurn = () =>
  [...GAME_CATEGORIES].sort(() => 0.5 - Math.random()).slice(0, 6);

function MultiplayerGame() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { gamesById, chooseCategory, submitAnswer, refreshDashboard } = useSocket();
  const [timeLeft, setTimeLeft] = useState(MULTIPLAYER_QUESTION_SECONDS);
  const [turnCategories, setTurnCategories] = useState(() => pickCategoriesForTurn());
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
  }, [game?.id, game?.questionIndex, game?.phase, game?.status]);

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
    if (canPickCategory) {
      setTurnCategories(pickCategoriesForTurn());
    }
  }, [canPickCategory, game?.id, game?.completedTurns]);

  const handleCategorySelect = (category) => {
    setTurnCategories((previous) => previous.filter((item) => item.id !== category.id));
    chooseCategory(game.id, category.id);
  };

  const renderBody = () => {
    if (!game) {
      return (
        <div className="multiplayer-empty">
          <h2>Loading active game...</h2>
          <button className="continue-button" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
        </div>
      );
    }

    if (canPickCategory) {
      return (
        <div className="multiplayer-panel">
          <h2>Your turn</h2>
          <p>Choose a category for {game.opponentUsername}.</p>
          <CategorySelection
            categories={turnCategories}
            onSelectCategory={handleCategorySelect}
          />
        </div>
      );
    }

    if (canAnswer && game.question) {
      return (
        <div className="multiplayer-panel">
          <h2>Your turn to answer</h2>
          <p>Category: {game.currentCategory}</p>
          <div className="timer-container">
            <div className="timer">
              <div className="timer-text">{timeLeft} Sekunden</div>
              <div className="timer-bar">
                <div
                  className="timer-fill"
                  style={{
                    width: `${(timeLeft / MULTIPLAYER_QUESTION_SECONDS) * 100}%`,
                    backgroundColor:
                      timeLeft <= 5 ? "#ff4d4d" : timeLeft <= 10 ? "#ffad4d" : "#4caf50",
                  }}
                ></div>
              </div>
            </div>
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
        </div>
      );
    }

    if (game.status === "COMPLETED") {
      return (
        <div className="multiplayer-panel waiting-panel">
          <h2>Game Complete</h2>
          <p>The final score is shown above.</p>
          <button className="continue-button" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
        </div>
      );
    }

    return (
      <div className="multiplayer-panel waiting-panel">
        <h2>Currently Playing</h2>
        <p>{game.opponentUsername} is currently playing.</p>
        <p>
          Turn {Math.min(game.completedTurns + 1, game.totalTurns)} / {game.totalTurns}
        </p>
      </div>
    );
  };

  return (
    <div className="page-wrap multiplayer-wrap">
      <Navbar />
      <div className="multiplayer-game-page">
        <div className="multiplayer-header">
          <h1>Multiplayer Match</h1>
          {game && (
            <div className="scoreboard">
              <div className="scoreboard-row">
                <span>You</span>
                <span>{scoreLabel}</span>
                <span>{game.opponentUsername}</span>
              </div>
              <div className="scoreboard-meta">
                Difficulty: {game.difficulty} | Turns: {game.completedTurns}/{game.totalTurns}
              </div>
            </div>
          )}
        </div>
        {renderBody()}
      </div>
      <Footer />
    </div>
  );
}

export default MultiplayerGame;
