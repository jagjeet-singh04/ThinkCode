import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import QuestionDisplay from '../components/QuestionDisplay';
import CodeEditor from '../components/CodeEditor';
import FeedbackPanel from '../components/FeedbackPanel';
import questionsData from '../data/questions.json';
import useLocalStorage from '../hooks/useLocalStorage';

const SolvePage = () => {
  const [questions] = useState(questionsData);
  const [selectedTopic, setSelectedTopic] = useState('Array');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Easy');
  const [currentMode, setCurrentMode] = useState('topic-difficulty');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [solvedQuestions, setSolvedQuestions] = useLocalStorage('solvedQuestions', []);
  const location = useLocation();
  const navigate = useNavigate();

  const topics = [...new Set(questions.map(q => q.topic))];

  useEffect(() => {
    if (location.state?.mode) {
      setCurrentMode(location.state.mode);
    }
    filterQuestions();
  }, [selectedTopic, selectedDifficulty, currentMode]);

  const filterQuestions = () => {
    let filtered = questions;
    
    if (currentMode === 'topic-difficulty') {
      if (selectedTopic !== 'All') {
        filtered = filtered.filter(q => q.topic === selectedTopic);
      }
      
      if (selectedDifficulty !== 'All') {
        filtered = filtered.filter(q => q.difficulty === selectedDifficulty);
      }
    } else if (currentMode === 'random-topic') {
      // Select a random topic
      const randomTopic = topics[Math.floor(Math.random() * topics.length)];
      filtered = filtered.filter(q => q.topic === randomTopic);
    }
    
    if (filtered.length > 0) {
      const randomIndex = Math.floor(Math.random() * filtered.length);
      setCurrentQuestion(filtered[randomIndex]);
      setUserCode('');
    } else {
      setCurrentQuestion(null);
    }
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleModeSelect = (mode) => {
    setCurrentMode(mode);
    if (mode === 'test') {
      navigate('/test');
    } else {
      filterQuestions();
    }
  };

  const handleCodeChange = (code) => {
    setUserCode(code);
  };

  const handleSubmissionResult = (isCorrect) => {
    if (isCorrect && currentQuestion && !solvedQuestions.includes(currentQuestion.id)) {
      setSolvedQuestions([...solvedQuestions, currentQuestion.id]);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        topics={topics}
        selectedTopic={selectedTopic}
        selectedDifficulty={selectedDifficulty}
        onTopicSelect={handleTopicSelect}
        onDifficultyChange={handleDifficultyChange}
        onModeSelect={handleModeSelect}
        currentMode={currentMode}
        showDifficulty={currentMode === 'topic-difficulty'}
      />
      
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex overflow-hidden">
          <div className="w-1/2 border-r bg-white">
            <QuestionDisplay question={currentQuestion} />
          </div>
          <div className="w-1/2 flex flex-col">
            <CodeEditor code={userCode} onCodeChange={handleCodeChange} />
          </div>
        </div>
        
        <FeedbackPanel 
          question={currentQuestion}
          userCode={userCode}
          onSubmissionResult={handleSubmissionResult}
        />
      </div>
    </div>
  );
};

export default SolvePage;