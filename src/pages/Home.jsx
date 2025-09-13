import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Menu, X, Code, Play, Settings, BookOpen, Zap } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import QuestionDisplay from '../components/QuestionDisplay';
import CodeEditor, { DEFAULT_TEMPLATES } from '../components/CodeEditor';
import FeedbackPanel from '../components/FeedbackPanel';
import questionsData from '../data/questions.json';
import useLocalStorage from '../hooks/useLocalStorage';
// import PracticeOptions from './PracticeOptions';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

import { useAuth } from '../context/useAuth';

const Home = () => {
  const { user } = useAuth();
  const [questions] = useState(questionsData);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [activePanel, setActivePanel] = useState('question'); // 'question', 'code', 'feedback'
  const location = useLocation();
  const navigate = useNavigate();
  
  const [currentMode, setCurrentMode] = useState(location.state?.mode || null);
  // const [showPracticeOptions, setShowPracticeOptions] = useState(currentMode === null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  // Load question by ID if passed from navigation (e.g., from ChooseSection)
  useEffect(() => {
    if (location.state && location.state.questionId) {
      const q = questions.find(q => q.id === location.state.questionId);
      if (q) {
        setCurrentQuestion(q);
        setPreviousQuestionId(q.id);
        setActivePanel('question');
      }
    }
    // eslint-disable-next-line
  }, [location.state, questions]);
  const [previousQuestionId, setPreviousQuestionId] = useState(null);
  
  // Add language state and code management
  const [language, setLanguage] = useState('javascript');
  const [codeByLang, setCodeByLang] = useState(DEFAULT_TEMPLATES);
  const [userCode, setUserCode] = useState(DEFAULT_TEMPLATES.javascript);
  
  const [solvedQuestions, setSolvedQuestions] = useState([]);

  // Fetch solved questions from backend for logged-in user
  useEffect(() => {
    const fetchSolved = async () => {
      if (user?.email) {
        try {
          const res = await fetch(`/api/auth/solved?email=${encodeURIComponent(user.email)}`);
          const data = await res.json();
          if (Array.isArray(data.solvedQuestions)) {
            setSolvedQuestions(data.solvedQuestions);
          }
        } catch (e) {
          // fallback: do nothing
        }
      }
    };
    fetchSolved();
  }, [user]);

  // Support multi-topic questions: split by comma and trim
  const allTopics = questions.flatMap(q => q.topic.split(',').map(t => t.trim()));
  const topics = [...new Set(allTopics)].sort();

  // Check for mobile view
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  // Update userCode when language changes
  useEffect(() => {
    setUserCode(codeByLang[language] || DEFAULT_TEMPLATES[language]);
  }, [language, codeByLang]);

  // Auto-generate question when topic/difficulty changes
  useEffect(() => {
    if (!currentMode) return;
    if (
      (currentMode === 'topic-difficulty' && selectedTopic && selectedDifficulty) ||
      (currentMode === 'random-topic' && selectedTopic)
    ) {
      handleGenerateQuestion();
    } else {
      setCurrentQuestion(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTopic, selectedDifficulty, currentMode]);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleModeSelect = (mode) => {
    setCurrentMode(mode);
  // setShowPracticeOptions(false);
    setSelectedTopic('');
    setSelectedDifficulty('');
    setCurrentQuestion(null);
    setIsMobileSidebarOpen(false);
    // Reset code when changing modes
    setCodeByLang(DEFAULT_TEMPLATES);
    setUserCode(DEFAULT_TEMPLATES[language]);
    if (mode === 'test') {
      navigate('/test');
    }
  };

  const handleGenerateQuestion = () => {
    let filtered = questions;
    
    // Filter by topic if selected (support multi-topic)
    if (selectedTopic) {
      filtered = filtered.filter(q =>
        q.topic.split(',').map(t => t.trim().toLowerCase()).includes(selectedTopic.toLowerCase())
      );
    }
    
    // Filter by difficulty if in topic-difficulty mode and difficulty is selected
    if (currentMode === 'topic-difficulty' && selectedDifficulty) {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty);
    }
    
    if (filtered.length > 0) {
      // Avoid repeating the same question consecutively when possible
      let randomIndex;
      let attempts = 0;
      do {
        randomIndex = Math.floor(Math.random() * filtered.length);
        attempts++;
      } while (filtered.length > 1 && filtered[randomIndex].id === previousQuestionId && attempts < 10);

      const nextQ = filtered[randomIndex];
      setCurrentQuestion(nextQ);
      setPreviousQuestionId(nextQ.id);
      // Reset code when generating new question
      setCodeByLang(DEFAULT_TEMPLATES);
      setUserCode(DEFAULT_TEMPLATES[language]);
      setActivePanel('question'); // Always start with question panel on mobile
    }
  };

  const handleCodeChange = (code) => {
    setCodeByLang(prev => ({ ...prev, [language]: code }));
    setUserCode(code);
  };

  const handleLanguageChange = (newLanguage) => {
    if (DEFAULT_TEMPLATES.hasOwnProperty(newLanguage)) {
      setLanguage(newLanguage);
    }
  };

  const handleSubmissionResult = (isCorrect) => {
    if (isCorrect && currentQuestion && !solvedQuestions.includes(currentQuestion.id)) {
      setSolvedQuestions([...solvedQuestions, currentQuestion.id]);
    }
  };

  const getDifficultyVariant = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'easy';
      case 'Medium': return 'medium';
      case 'Hard': return 'hard';
      default: return 'default';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Only show back button if not coming from ChooseSection
  const cameFromChooseSection = Boolean(location.state && location.state.questionId);

  const handleBackToSelection = () => {
    if (cameFromChooseSection) return; // Do nothing if from ChooseSection
    setCurrentQuestion(null);
    setCodeByLang(DEFAULT_TEMPLATES);
    setUserCode(DEFAULT_TEMPLATES[language]);
    setActivePanel('question');
  };

  // Mobile panel navigation
  const MobilePanelNavigation = () => (
    <div className="md:hidden bg-white border-b border-gray-200 px-4 py-2">
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
  );



  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && isMobileView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-80 h-full bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <Sidebar 
                onModeSelect={handleModeSelect}
                currentMode={currentMode}
                isMobile={true}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      {!currentQuestion && !isMobileView && (
        <Sidebar 
          onModeSelect={handleModeSelect}
          currentMode={currentMode}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header for mobile */}
        {isMobileView && (
          <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            {currentQuestion ? (
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                {!cameFromChooseSection && (
                  <button
                    onClick={handleBackToSelection}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-600" />
                  </button>
                )}
                <div className="min-w-0 flex-1">
                  <h1 className="text-lg font-semibold text-gray-900 truncate">
                    {currentQuestion.title}
                  </h1>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge
                      className={`text-xs px-2 py-0.5 ${getDifficultyColor(currentQuestion.difficulty)}`}
                    >
                      {currentQuestion.difficulty}
                    </Badge>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsMobileSidebarOpen(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Menu className="h-5 w-5 text-gray-600" />
                </button>
                <h1 className="text-lg font-semibold text-gray-900">
                  Practice Hub
                </h1>
              </div>
            )}
          </div>
        )}

        {/* Main content area */}
        {currentQuestion ? (
          <>
            {/* Mobile Panel Navigation */}
            {isMobileView && <MobilePanelNavigation />}
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex overflow-hidden"
            >
              {isMobileView ? (
                // Mobile: Single panel view with navigation
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
                        <QuestionDisplay 
                          question={currentQuestion} 
                          hideTitle={isMobileView}
                          className="h-full"
                        />
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
                          code={userCode} 
                          onCodeChange={handleCodeChange}
                          language={language}
                          setLanguage={handleLanguageChange}
                          className="h-full"
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
                          userCode={userCode}
                          onSubmissionResult={handleSubmissionResult}
                          language={language}
                          className="h-full"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                // Desktop: Split panel view
                <>
                  {/* Question Panel */}
                  <div className="w-1/2 border-r border-gray-200 bg-white">
                    <div className="flex items-center gap-3 px-6 pt-6 pb-2">
                      {!cameFromChooseSection && (
                        <button
                          className="px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                          onClick={handleBackToSelection}
                        >
                          <ChevronLeft className="h-4 w-4 mr-1 inline" />
                          Back
                        </button>
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="text-xl font-bold text-gray-900 truncate block">
                          {currentQuestion.title}
                        </span>
                        <Badge
                          className={`text-xs px-2 py-0.5 mt-1 ${getDifficultyColor(currentQuestion.difficulty)}`}
                        >
                          {currentQuestion.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <QuestionDisplay question={currentQuestion} hideTitle />
                  </div>
                  
                  {/* Code Editor Panel */}
                  <div className="w-1/2 bg-gray-900">
                    <CodeEditor 
                      code={userCode} 
                      onCodeChange={handleCodeChange}
                      language={language}
                      setLanguage={handleLanguageChange}
                    />
                  </div>
                </>
              )}
            </motion.div>
            
            {/* Feedback Panel - Desktop only at bottom */}
            {!isMobileView && (
              <div className="h-64 border-t border-gray-200 bg-white">
                <FeedbackPanel 
                  question={currentQuestion}
                  userCode={userCode}
                  onSubmissionResult={handleSubmissionResult}
                  language={language}
                />
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex items-start justify-center p-4 md:p-10 overflow-auto">
            {(currentMode === 'topic-difficulty' || currentMode === 'random-topic') && (
              <div className="w-full max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white shadow-lg rounded-2xl border border-gray-200 p-6 md:p-8"
                >
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
                      {currentMode === 'topic-difficulty' ? 'Choose Topic & Difficulty' : 'Choose a Topic'}
                    </h2>
                    <p className="text-gray-600">
                      Select your preferences to generate a coding challenge
                    </p>
                  </div>
                  
                  <div className="space-y-8">
                    {/* Topic Selection */}
                    <div>
                      <div className="mb-4 font-semibold text-gray-800 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                        Select Topic
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {topics.map((topic) => {
                          // Find all questions for this topic
                          const topicQuestions = questions.filter(q => q.topic.split(',').map(t => t.trim().toLowerCase()).includes(topic.toLowerCase()));
                          // Count how many are solved
                          const solvedCount = topicQuestions.filter(q => solvedQuestions.includes(q.id)).length;
                          return (
                            <motion.div
                              key={topic}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Badge
                                variant={selectedTopic === topic ? 'default' : 'secondary'}
                                className={`w-full px-4 py-3 rounded-xl cursor-pointer text-sm font-medium transition-all duration-200 ${
                                  selectedTopic === topic
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg transform'
                                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md border border-gray-200'
                                } flex items-center justify-between`}
                                onClick={() => handleTopicSelect(topic)}
                              >
                                <span>{topic}</span>
                                {user && (
                                  <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${solvedCount === topicQuestions.length && topicQuestions.length > 0 ? 'bg-green-100 text-green-700' : solvedCount > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-200 text-gray-500'}`}>
                                    {solvedCount}/{topicQuestions.length}
                                  </span>
                                )}
                              </Badge>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Difficulty Selection (only for topic-difficulty mode) */}
                    {currentMode === 'topic-difficulty' && (
                      <div>
                        <div className="mb-4 font-semibold text-gray-800 flex items-center">
                          <Settings className="h-5 w-5 mr-2 text-purple-600" />
                          Select Difficulty
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { name: 'Easy', color: 'from-green-500 to-green-600' },
                            { name: 'Medium', color: 'from-yellow-500 to-orange-500' },
                            { name: 'Hard', color: 'from-red-500 to-red-600' }
                          ].map((difficulty) => (
                            <motion.div
                              key={difficulty.name}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Badge
                                className={`w-full px-6 py-4 rounded-xl cursor-pointer text-sm font-semibold transition-all duration-200 ${
                                  selectedDifficulty === difficulty.name 
                                    ? `bg-gradient-to-r ${difficulty.color} text-white shadow-lg ring-2 ring-offset-2 ring-gray-300` 
                                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md border border-gray-200'
                                }`}
                                onClick={() => handleDifficultySelect(difficulty.name)}
                              >
                                {difficulty.name}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <Button
                        onClick={handleGenerateQuestion}
                        disabled={
                          (currentMode === 'topic-difficulty' && (!selectedTopic || !selectedDifficulty)) ||
                          (currentMode === 'random-topic' && !selectedTopic)
                        }
                        className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-purple-600 transition-all duration-200"
                      >
                        <Zap className="h-5 w-5 mr-2" />
                        Find Question
                      </Button>
                      {selectedTopic && currentMode === 'topic-difficulty' && !selectedDifficulty && (
                        <div className="text-center sm:text-left">
                          <span className="text-sm text-gray-500 bg-yellow-50 px-3 py-2 rounded-lg border border-yellow-200">
                            💡 Pick a difficulty level to continue
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
