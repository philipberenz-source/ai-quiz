import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import DifficultySelection from "../components/DifficultySelection";
import CategorySelection from "../components/CategorySelection";
import Quiz from "../components/Quiz";
import Score from "../components/Score";
import Navbar from "../components/Navbar";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { GAME_CATEGORIES, GAME_DIFFICULTIES, SERVER_URL } from "../constants/gameConfig";

const TOTAL_ROUNDS = 4;
const QUESTIONS_PER_ROUND = 3;
const TOTAL_QUESTIONS = TOTAL_ROUNDS * QUESTIONS_PER_ROUND;
const QUESTION_SECONDS = 30;
const DEFAULT_DIFFICULTY_ID = GAME_DIFFICULTIES[0]?.id || "";

function SinglePlayer() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [step, setStep] = useState("difficulty");
  const [selectedDifficultyId, setSelectedDifficultyId] = useState(DEFAULT_DIFFICULTY_ID);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [roundNumber, setRoundNumber] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shuffledCategories, setShuffledCategories] = useState([]);
  const [pendingCategoryId, setPendingCategoryId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(QUESTION_SECONDS);
  const timerRef = useRef(null);
  const audioRef = useRef(null);

  const difficulties = GAME_DIFFICULTIES;
  const allCategories = GAME_CATEGORIES;
  const selectedDifficulty = difficulties.find((difficulty) => difficulty.id === selectedDifficultyId) || null;

  useEffect(() => {
    const shuffled = [...allCategories].sort(() => 0.5 - Math.random()).slice(0, 6);
    setShuffledCategories(shuffled);
  }, [allCategories]);

  const submitScore = useCallback(
    async (scoreValue) => {
      try {
        if (!user?.id) {
          return;
        }

        const token = await getToken();
        if (!token) {
          throw new Error("Missing auth token");
        }

        await fetch(`${SERVER_URL}/leaderboard/singleplayer`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            clerkId: user.id,
            username: user.username || user.fullName || "player",
            correctAnswers: scoreValue,
          }),
        });
      } catch (submitError) {
        console.error("Error submitting singleplayer score:", submitError);
      }
    },
    [getToken, user?.fullName, user?.id, user?.username]
  );

  const handleAnswer = useCallback(
    (selectedAnswer, isCorrect) => {
      const currentQuestion = questions[currentQuestionIndex];
      if (!currentQuestion) {
        return;
      }

      const nextAnswers = [
        ...answers,
        {
          question: currentQuestion.question,
          selectedAnswer,
          correctAnswer: currentQuestion.answer,
          isCorrect,
        },
      ];
      const nextScore = totalScore + (isCorrect ? 1 : 0);

      setAnswers(nextAnswers);
      setTotalScore(nextScore);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        return;
      }

      if (roundNumber < TOTAL_ROUNDS) {
        setRoundNumber(roundNumber + 1);
        setStep("category");
        return;
      }

      submitScore(nextScore);
      setStep("score");
    },
    [answers, currentQuestionIndex, questions, roundNumber, submitScore, totalScore]
  );

  useEffect(() => {
    if (step !== "quiz") {
      return undefined;
    }

    const audioElement = audioRef.current;
    setTimeLeft(QUESTION_SECONDS);

    if (audioElement) {
      audioElement.currentTime = 0;
      audioElement.playbackRate = 1;
      audioElement.play().catch((playError) => console.error("Audio play error:", playError));
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((previousTime) => {
        const nextTime = previousTime - 1;

        if (audioElement) {
          if (nextTime <= 5 && nextTime > 0) {
            audioElement.playbackRate = 1.5;
          } else if (nextTime > 5) {
            audioElement.playbackRate = 1;
          }
        }

        if (nextTime <= 0) {
          clearInterval(timerRef.current);
          if (audioElement) {
            audioElement.pause();
            audioElement.currentTime = 0;
          }
          handleAnswer(null, false);
          return 0;
        }

        return nextTime;
      });
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
    };
  }, [step, currentQuestionIndex, questions, handleAnswer]);

  const fetchQuestions = async (categoryName, categoryId) => {
    setLoading(true);
    setError(null);
    setStep("loading");
    setQuestions([]);
    setCurrentQuestionIndex(0);
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Missing auth token");
      }

      const response = await fetch(
        `${SERVER_URL}/retrievequestions?category=${encodeURIComponent(categoryName)}&difficulty=${selectedDifficultyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (data && Array.isArray(data) && data.length > 0) {
        setQuestions(data);
        setShuffledCategories((previous) => previous.filter((item) => item.id !== categoryId));
        setStep("quiz");
      } else {
        throw new Error("Failed to fetch questions");
      }
    } catch (fetchError) {
      setError("Failed to fetch questions. Please sign in again and retry.");
      setStep("category");
    } finally {
      setLoading(false);
      setPendingCategoryId(null);
    }
  };

  const handleDifficultyChange = (difficultyId) => {
    setSelectedDifficultyId(difficultyId);
  };

  const handleDifficultyContinue = () => {
    setStep("category");
  };

  const handleCategorySelect = (category) => {
    if (!category || pendingCategoryId) {
      return;
    }

    setPendingCategoryId(category.id);
    fetchQuestions(category.name, category.id);
  };

  const restartQuiz = () => {
    setStep("difficulty");
    setSelectedDifficultyId(DEFAULT_DIFFICULTY_ID);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setRoundNumber(1);
    setAnswers([]);
    setTotalScore(0);
    setPendingCategoryId(null);
    setTimeLeft(QUESTION_SECONDS);
    const shuffled = [...allCategories].sort(() => 0.5 - Math.random()).slice(0, 6);
    setShuffledCategories(shuffled);
  };

  const progressNumerator =
    roundNumber - 1 + (step === "quiz" && questions.length > 0 ? (currentQuestionIndex + 1) / questions.length : 0);
  const progressValue = (progressNumerator / TOTAL_ROUNDS) * 100;
  const timerValue = (timeLeft / QUESTION_SECONDS) * 100;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container pb-8 pt-28">
        <header className="mx-auto mb-7 max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">BrainQuiz AI</h1>
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-center gap-2">
              <Badge variant="secondary">
                Round {roundNumber}/{TOTAL_ROUNDS}
              </Badge>
              {selectedDifficulty?.name && step !== "quiz" && <Badge variant="outline">{selectedDifficulty.name}</Badge>}
            </div>
            <Progress value={progressValue} />
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-4xl flex-col gap-5">
          {loading && (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">Loading questions...</CardContent>
            </Card>
          )}
          {error && (
            <Card className="border-destructive/60">
              <CardContent className="pt-6 text-center text-destructive">{error}</CardContent>
            </Card>
          )}

          {step === "difficulty" && (
            <DifficultySelection
              difficulties={difficulties}
              selectedDifficultyId={selectedDifficultyId}
              onChangeDifficultyId={handleDifficultyChange}
              onContinue={handleDifficultyContinue}
            />
          )}

          {step === "category" && !loading && (
            <CategorySelection
              categories={shuffledCategories}
              onSelectCategory={handleCategorySelect}
              difficulty={selectedDifficulty}
              selectedCategoryId={pendingCategoryId}
              disableSelection={Boolean(pendingCategoryId)}
            />
          )}

          {step === "quiz" && !loading && questions.length > 0 && (
            <>
              <Card className="border-border/70">
                <CardContent className="pt-6">
                  <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
                    <span>Time left</span>
                    <span className="font-semibold text-foreground">{timeLeft}s</span>
                  </div>
                  <Progress value={timerValue} className="h-2.5" />
                </CardContent>
              </Card>
              <Quiz
                question={questions[currentQuestionIndex]}
                onAnswer={handleAnswer}
                onSelected={() => {
                  if (timerRef.current) {
                    clearInterval(timerRef.current);
                  }
                  if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                  }
                }}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={questions.length}
              />
            </>
          )}

          {step === "score" && (
            <Score
              score={totalScore}
              totalQuestions={TOTAL_QUESTIONS}
              onRestart={restartQuiz}
              onViewLeaderboard={() => navigate("/leaderboard")}
            />
          )}
        </div>
      </main>
      <audio ref={audioRef} src="/music.wav" loop />
    </div>
  );
}

export default SinglePlayer;
