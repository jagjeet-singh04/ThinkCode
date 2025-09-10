import React from 'react';

const Topbar = ({ difficulty, onDifficultyChange, onStartTest }) => {
  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">LeetCode Clone</h1>
        <select 
          className="border rounded p-2"
          value={difficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={onStartTest}
      >
        Start Test
      </button>
    </div>
  );
};

export default Topbar;