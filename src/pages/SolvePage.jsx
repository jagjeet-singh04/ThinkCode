import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import QuestionDisplay from '../components/QuestionDisplay';
import CodeEditor, { DEFAULT_TEMPLATES } from '../components/CodeEditor';
import FeedbackPanel from '../components/FeedbackPanel';
import { ChevronLeft, BookOpen, Code, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import questionsData from '../data/questions.json';
import useLocalStorage from '../hooks/useLocalStorage';

const SolvePage = () => {
  const [questions] = useState(questionsData);
  const [selectedTopic, setSelectedTopic] = useState('Array');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Easy');
  const [currentMode, setCurrentMode] = useState('topic-difficulty');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [language, setLanguage] = useState("cpp");
  const [codeByLang, setCodeByLang] = useState(DEFAULT_TEMPLATES);
  const [solvedQuestions, setSolvedQuestions] = useLocalStorage('solvedQuestions', []);
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileView, setIsMobileView] = useState(false);
  const [activePanel, setActivePanel] = useState('question');

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

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
      const randomTopic = topics[Math.floor(Math.random() * topics.length)];
      filtered = filtered.filter(q => q.topic === randomTopic);
    }
    
    if (filtered.length > 0) {
      const randomIndex = Math.floor(Math.random() * filtered.length);
      setCurrentQuestion(filtered[randomIndex]);
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

  const handleCodeChange = (val) => {
    setCodeByLang(prev => ({ ...prev, [language]: val }));
  };

  const handleSubmissionResult = (isCorrect) => {
    if (isCorrect && currentQuestion && !solvedQuestions.includes(currentQuestion.id)) {
      setSolvedQuestions([...solvedQuestions, currentQuestion.id]);
    }
  };

  // Safe language setter with validation
  const handleSetLanguage = (newLanguage) => {
    if (typeof newLanguage === 'string' && DEFAULT_TEMPLATES.hasOwnProperty(newLanguage)) {
      setLanguage(newLanguage);
    } else {
      console.error('Invalid language:', newLanguage);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {!isMobileView && (
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
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        {isMobileView && (
          <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 truncate flex-1 text-center">
              {currentQuestion ? currentQuestion.title : 'Practice'}
            </h1>
            <div className="w-8" />
          </div>
        )}

        {isMobileView && currentQuestion && (
          <div className="bg-white border-b border-gray-200 px-4 py-2">
            <div className="flex space-x-1">
              <button
                onClick={() => setActivePanel('question')}
                className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activePanel === 'question'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <BookOpen className="h-4 w-4 mr-1" />
                Problem
              </button>
              <button
                onClick={() => setActivePanel('code')}
                className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activePanel === 'code'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Code className="h-4 w-4 mr-1" />
                Code
              </button>
              <button
                onClick={() => setActivePanel('feedback')}
                className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activePanel === 'feedback'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Play className="h-4 w-4 mr-1" />
                Run
              </button>
            </div>
          </div>
        )}

        {isMobileView ? (
          <div className="flex-1 flex flex-col">
            <AnimatePresence mode="wait">
              {activePanel === 'question' && (
                <motion.div
                  key="question"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 overflow-hidden"
                >
                  <QuestionDisplay question={currentQuestion} hideTitle={true} />
                </motion.div>
              )}
              {activePanel === 'code' && (
                <motion.div
                  key="code"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1"
                >
                  <CodeEditor
                    code={codeByLang[language]}
                    onCodeChange={handleCodeChange}
                    language={language}
                    setLanguage={handleSetLanguage}
                  />
                </motion.div>
              )}
              {activePanel === 'feedback' && (
                <motion.div
                  key="feedback"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1"
                >
                  <FeedbackPanel
                    question={currentQuestion}
                    userCode={codeByLang[language]}
                    onSubmissionResult={handleSubmissionResult}
                    language={language}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex-1 flex overflow-hidden">
            <div className="w-1/2 border-r bg-white">
              <QuestionDisplay question={currentQuestion} />
            </div>
            <div className="w-1/2 flex flex-col">
              <CodeEditor
                code={codeByLang[language]}
                onCodeChange={handleCodeChange}
                language={language}
                setLanguage={handleSetLanguage}
              />
            </div>
          </div>
        )}

        {!isMobileView && (
          <FeedbackPanel
            question={currentQuestion}
            userCode={codeByLang[language]}
            onSubmissionResult={handleSubmissionResult}
            language={language}
          />
        )}
      </div>
    </div>
  );
};

export default SolvePage;
