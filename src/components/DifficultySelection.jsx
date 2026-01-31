import React from 'react';

function DifficultySelection({ difficulties, onSelectDifficulty }) {
  return (
    <div className="difficulty-selection">
      <h2>Choose difficulty</h2>
      <div className="difficulty-grid">
        {difficulties.map(difficulty => (
          <button 
            key={difficulty.id} 
            className="difficulty-button"
            onClick={() => onSelectDifficulty(difficulty)}
          >
            {difficulty.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DifficultySelection;