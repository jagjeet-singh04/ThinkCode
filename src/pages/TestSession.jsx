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
  const [numQuestions, setNumQuestions] = useState(null);
  const [showPrompt, setShowPrompt] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (numQuestions == null) return;
    // Select numQuestions random questions for the test
    const selectedQuestions = [];
    const questionPool = [...questions];
    for (let i = 0; i < Math.min(numQuestions, questionPool.length); i++) {
      const randomIndex = Math.floor(Math.random() * questionPool.length);
      selectedQuestions.push(questionPool[randomIndex]);
      questionPool.splice(randomIndex, 1);
    }
    setTestQuestions(selectedQuestions);
    // 30 min per question
    const totalTime = selectedQuestions.length * 30 * 60;
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
  }, [numQuestions]);

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

  if (showPrompt) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-xs w-full">
          <h2 className="text-xl font-bold mb-4 text-center">How many questions for your test?</h2>
          <div className="flex flex-col gap-3">
            {[1,2,3,4,5].map(n => (
              <button
                key={n}
                className="py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                onClick={() => { setNumQuestions(n); setShowPrompt(false); }}
              >
                {n} Question{n > 1 ? 's' : ''}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
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