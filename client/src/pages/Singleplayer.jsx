import React, { useState, useEffect, useRef } from 'react';
import '../styles/SinglePlayer.css';
import DifficultySelection from '../components/DifficultySelection';
import CategorySelection from '../components/CategorySelection';
import Quiz from '../components/Quiz';
import Score from '../components/Score';
import Navbar from '../components/Navbar';
import { GAME_CATEGORIES, GAME_DIFFICULTIES } from "../constants/gameConfig";

function SinglePlayer() {
  const [step, setStep] = useState('difficulty');
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [roundNumber, setRoundNumber] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shuffledCategories, setShuffledCategories] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = useRef(null);
  const audioRef = useRef(null); // 🔊 New ref for audio

  const difficulties = GAME_DIFFICULTIES;
  const allCategories = GAME_CATEGORIES;

  useEffect(() => {
    const shuffled = [...allCategories]
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);
    setShuffledCategories(shuffled);
  }, []);

  useEffect(() => {
    if (step === 'quiz') {
      setTimeLeft(20);

      // 🔊 Play music
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.playbackRate = 1;
        audioRef.current.play().catch(err => console.error("Audio play error:", err));
      }

      timerRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          const nextTime = prevTime - 1;

          // 🔁 Speed up music
          if (audioRef.current) {
            if (nextTime <= 5 && nextTime > 0) {
              audioRef.current.playbackRate = 1.5;
            } else if (nextTime > 5) {
              audioRef.current.playbackRate = 1;
            }
          }

          if (nextTime <= 0) {
            clearInterval(timerRef.current);
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }
            handleAnswer(null, false);
            return 0;
          }

          return nextTime;
        });
      }, 1000);

      return () => {
        clearInterval(timerRef.current);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      };
    }
  }, [step, currentQuestionIndex, questions]);

  const fetchQuestions = async (categoryId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8080/retrievequestions?category=${categoryId}&difficulty=${selectedDifficulty.id}`);
      const data = await response.json();

      if (data && Array.isArray(data) && data.length > 0) {
        setQuestions(data);
        setCurrentQuestionIndex(0);
        setStep('quiz');
      } else {
        throw new Error('Failed to fetch questions');
      }
    } catch (err) {
      setError('Failed to fetch questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setStep('category');
  };

  const handleCategorySelect = (category) => {
    fetchQuestions(category.id);
    setShuffledCategories(prev => prev.filter(c => c.id !== category.id));
  };

  const handleAnswer = (selectedAnswer, isCorrect) => {
    // Clear the timer
  
  
    const currentQuestion = questions[currentQuestionIndex];
  
    setAnswers([...answers, {
      question: currentQuestion.question,
      selectedAnswer,
      correctAnswer: currentQuestion.answer,
      isCorrect
    }]);
  
    if (isCorrect) {
      setTotalScore(totalScore + 1);
    }
  
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (roundNumber < 4) {
        setRoundNumber(roundNumber + 1);
        setStep('category');
      } else {
        submitScore();
        setStep('score');
      }
    }
  };

  const submitScore = async () => {
    try {
      await fetch('https://your-api-endpoint.com/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          score: totalScore,
          totalQuestions: 12,
          difficulty: selectedDifficulty.id,
          answers
        }),
      });
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  };

  const restartQuiz = () => {
    setStep('difficulty');
    setSelectedDifficulty(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setRoundNumber(1);
    setAnswers([]);
    setTotalScore(0);
    setTimeLeft(30);
    const shuffled = [...allCategories]
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);
    setShuffledCategories(shuffled);
  };

  return (
    <>
      <Navbar />
      <div className="app">
        <header>
          <h1>BrainQuiz AI</h1>
          <div className="progress-container">
            <div className="progress-text">Runde {roundNumber}/4</div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(roundNumber - 1 + (step === 'quiz' ? (currentQuestionIndex + 1) / questions.length : 0)) / 4 * 100}%` }}
              ></div>
            </div>
          </div>
        </header>

        <main>
          {loading && <div className="loading">Fragen werden geladen...</div>}
          {error && <div className="error">{error}</div>}

          {step === 'difficulty' && (
            <DifficultySelection 
              difficulties={difficulties} 
              onSelectDifficulty={handleDifficultySelect} 
            />
          )}

          {step === 'category' && !loading && (
            <CategorySelection 
              categories={shuffledCategories} 
              onSelectCategory={handleCategorySelect} 
              difficulty={selectedDifficulty}
            />
          )}

          {(step === 'quiz' || loading) && questions.length > 0 && (
            <>
              <div className="timer-container">
                <div className="timer">
                  <div className="timer-text">{timeLeft} Sekunden</div>
                  <div className="timer-bar">
                    <div
                      className="timer-fill"
                      style={{ 
                        width: `${(timeLeft / 20) * 100}%`,
                        backgroundColor: timeLeft <= 5 ? '#ff4d4d' : timeLeft <= 10 ? '#ffad4d' : '#4caf50'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <Quiz 
                question={questions[currentQuestionIndex]} 
                onAnswer={handleAnswer}
                onSelected={() => {
                  if (timerRef.current) {
                    clearInterval(timerRef.current);
                  }
                
                  // Stop the audio
                  if (audioRef.current) {
                    console.log('Stopping audio...');
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                  }
                }}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={questions.length}
              />
            </>
          )}

          {step === 'score' && (
            <Score 
              score={totalScore} 
              totalQuestions={12} 
              difficulty={selectedDifficulty}
              onRestart={restartQuiz} 
            />
          )}
        </main>
      </div>
      {/* 🔊 Audio tag for timer music */}
      <audio ref={audioRef} src="/music.wav" loop />
    </>
  );
}

export default SinglePlayer;
