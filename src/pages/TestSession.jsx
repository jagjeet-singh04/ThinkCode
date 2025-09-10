import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TestMode from '../components/TestMode';
import questionsData from '../data/questions.json';
import useLocalStorage from '../hooks/useLocalStorage';

const TestSession = () => {
  const [questions] = useState(questionsData);
  const [testQuestions, setTestQuestions] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [testHistory, setTestHistory] = useLocalStorage('testHistory', []);
  const navigate = useNavigate();

  useEffect(() => {
    // Select 5 random questions for the test
    const selectedQuestions = [];
    const questionPool = [...questions];
    
    for (let i = 0; i < Math.min(5, questionPool.length); i++) {
      const randomIndex = Math.floor(Math.random() * questionPool.length);
      selectedQuestions.push(questionPool[randomIndex]);
      questionPool.splice(randomIndex, 1);
    }
    
    setTestQuestions(selectedQuestions);
    
    // Calculate total time based on difficulties
    const totalTime = selectedQuestions.reduce((total, q) => {
      if (q.difficulty === 'Easy') return total + 30 * 60;
      if (q.difficulty === 'Medium') return total + 45 * 60;
      return total + 60 * 60;
    }, 0);
    
    setTimeRemaining(totalTime);
    
    // Set up timer
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          handleTestComplete(0, selectedQuestions.length);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const handleTestComplete = (score, total) => {
    const newTest = {
      date: new Date().toISOString().split('T')[0],
      questions: testQuestions.map(q => q.id),
      score: score,
      total: total
    };
    
    setTestHistory([...testHistory, newTest]);
  navigate(-1);
  };

  if (testQuestions.length === 0) {
    return <div className="p-6">Loading test questions...</div>;
  }

  return (
    <div className="h-screen overflow-hidden">
      <TestMode 
        questions={testQuestions}
        onTestComplete={handleTestComplete}
      />
    </div>
  );
};

export default TestSession;