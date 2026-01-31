import React, { useState } from 'react';
import confetti from 'https://cdn.skypack.dev/canvas-confetti'

function Quiz({ question, onAnswer,onSelected, questionNumber, totalQuestions }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  
  // Your API already provides the options array, so no need to combine and shuffle
  const options = question ? question.options : [];

  const handleAnswerClick = (answer) => {
    if (isAnswered) return;
    onSelected();
    setSelectedAnswer(answer);
    setIsAnswered(true);
  };
  
  const handleContinue = () => {
    if (selectedAnswer === question.answer) {
      confetti()
    }
    onAnswer(selectedAnswer, question.answer === selectedAnswer);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  return (
    <div className="quiz-container">
      <div className="question-counter">Frage {questionNumber} von {totalQuestions}</div>
      <h2 className="question">{question ? question.question : 'Wird geladen...'}</h2>
      
      <div className="answers">
        {options.map((option, index) => (
          <button
            key={index}
            className={`answer-button ${
              isAnswered ? (
                option === question.answer ? 'correct' : 
                option === selectedAnswer ? 'incorrect' : ''
              ) : ''
            }`}
            onClick={() => handleAnswerClick(option)}
            disabled={isAnswered}
          >
            {option}
          </button>
        ))}
      </div>
      
      {isAnswered && (
        <div className="answer-info-container">
          <div className="correct-answer-container">
            <h3>Richtige Antwort:</h3>
            <p className="correct-answer-text">{question.answer}</p>
            
            {selectedAnswer !== question.answer && (
              <p className="your-answer">
                Deine Antwort: <span className="incorrect-text">{selectedAnswer}</span>
              </p>
            )}
            
            {question.explanation && (
              <div className="answer-explanation">
                <h4>Erklärung:</h4>
                <p>{question.explanation}</p>
              </div>
            )}
          </div>
          
          <button 
            className="continue-button"
            onClick={handleContinue}
          >
            Weiter
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;