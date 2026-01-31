function Score({ score, totalQuestions, onRestart }) {
    const percentage = Math.round((score / totalQuestions) * 100);
    
    let message = "Try again!";
    if (percentage >= 80) {
      message = "Outstanding!";
    } else if (percentage >= 60) {
      message = "Good job!";
    } else if (percentage >= 40) {
      message = "Not bad!";
    }
  
    return (
      <div className="score-container">
        <h2>Quiz Complete!</h2>
        <div className="score-circle">
          <span className="score-text">{score}/{totalQuestions}</span>
          <span className="score-percentage">{percentage}%</span>
        </div>
        <p className="score-message">{message}</p>
        <button className="restart-button" onClick={onRestart}>
          Play Again
        </button>
      </div>
    );
  }
  
  export default Score;