import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import QuestionDisplay from '../components/QuestionDisplay';
import CodeEditor from '../components/CodeEditor';
import FeedbackPanel from '../components/FeedbackPanel';
import questionsData from '../data/questions.json';
import useLocalStorage from '../hooks/useLocalStorage';
import PracticeOptions from './PracticeOptions';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

const Home = () => {
  const [questions] = useState(questionsData);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  
  const [currentMode, setCurrentMode] = useState(location.state?.mode || null);
  const [showPracticeOptions, setShowPracticeOptions] = useState(currentMode === null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [previousQuestionId, setPreviousQuestionId] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [solvedQuestions, setSolvedQuestions] = useLocalStorage('solvedQuestions', []);

  // Support multi-topic questions: split by comma and trim
  const allTopics = questions.flatMap(q => q.topic.split(',').map(t => t.trim()));
  const topics = [...new Set(allTopics)].sort();

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
    setShowPracticeOptions(false);
    setSelectedTopic('');
    setSelectedDifficulty('');
    setCurrentQuestion(null);
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
      setUserCode('');
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

  const getDifficultyVariant = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'easy';
      case 'Medium': return 'medium';
      case 'Hard': return 'hard';
      default: return 'default';
    }
  };

  if (showPracticeOptions) {
    return <PracticeOptions onSelectMode={handleModeSelect} />;
  }

  return (
    <div className="flex h-screen bg-background">
  {/* Sidebar only visible before a question is generated */}
      {/* Sidebar only visible before a question is generated */}
      {!currentQuestion && (
        <Sidebar 
          onModeSelect={handleModeSelect}
          currentMode={currentMode}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main content area */}
  {currentQuestion ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex overflow-hidden"
          >
            {/* Question Panel with Back Button in header */}
            <div className="w-1/2 border-r border-border">
              <div className="flex items-center gap-2 px-6 pt-6 pb-2">
                <button
                  className="px-3 py-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md border-0 hover:from-blue-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150"
                  onClick={() => {
                    setCurrentQuestion(null);
                    setUserCode('');
                  }}
                >
                  ← Back
                </button>
                <span className="text-xl font-bold text-foreground truncate">{currentQuestion.title}</span>
              </div>
              <QuestionDisplay question={currentQuestion} hideTitle />
            </div>
            
            {/* Code Editor Panel */}
            <div className="w-1/2">
              <CodeEditor 
                code={userCode} 
                onCodeChange={handleCodeChange}
                language="javascript"
              />
            </div>
          </motion.div>
        ) : (
          <div className="flex-1 flex items-start justify-center p-10 overflow-auto">
            {(currentMode === 'topic-difficulty' || currentMode === 'random-topic') && (
              <div className="w-full max-w-4xl mx-auto">
                <div className="bg-white/80 backdrop-blur shadow-sm rounded-xl border border-border p-8">
                  <h2 className="text-2xl font-semibold mb-6 text-gray-800 tracking-tight">
                    {currentMode === 'topic-difficulty' ? 'Choose Topic & Difficulty' : 'Choose a Topic'}
                  </h2>
                  <div className="space-y-8">
                    {/* Topic Selection */}
                    <div>
                      <div className="mb-3 font-medium text-gray-700">Select Topic</div>
                      <div className="flex flex-wrap gap-3">
                        {topics.map((topic) => (
                          <Badge
                            key={topic}
                            variant={selectedTopic === topic ? 'default' : 'secondary'}
                            className={`px-4 py-2 rounded-md cursor-pointer text-sm transition-all ${
                              selectedTopic === topic
                                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            onClick={() => handleTopicSelect(topic)}
                          >
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Difficulty Selection (only for topic-difficulty mode) */}
                    {currentMode === 'topic-difficulty' && (
                      <div>
                        <div className="mb-3 font-medium text-gray-700">Select Difficulty</div>
                        <div className="flex gap-3">
                          {['Easy', 'Medium', 'Hard'].map((difficulty) => (
                            <Badge
                              key={difficulty}
                              variant={getDifficultyVariant(difficulty)}
                              className={`px-4 py-2 rounded-md cursor-pointer text-sm transition ${
                                selectedDifficulty === difficulty ? 'ring-2 ring-offset-1 ring-blue-500' : 'opacity-80 hover:opacity-100'
                              }`}
                              onClick={() => handleDifficultySelect(difficulty)}
                            >
                              {difficulty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-4">
                      <Button
                        onClick={handleGenerateQuestion}
                        disabled={
                          (currentMode === 'topic-difficulty' && (!selectedTopic || !selectedDifficulty)) ||
                          (currentMode === 'random-topic' && !selectedTopic)
                        }
                        className="disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Generate Question
                      </Button>
                      {selectedTopic && currentMode === 'topic-difficulty' && !selectedDifficulty && (
                        <span className="text-sm text-gray-500 self-center">Pick a difficulty to enable generation.</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Feedback Panel */}
        {currentQuestion && (
          <div className="h-64 border-t border-border">
            <FeedbackPanel 
              question={currentQuestion}
              userCode={userCode}
              onSubmissionResult={handleSubmissionResult}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;