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

const Home = () => {
  const [questions] = useState(questionsData);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  
  const [currentMode, setCurrentMode] = useState(location.state?.mode || null);
  const [showPracticeOptions, setShowPracticeOptions] = useState(currentMode === null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [solvedQuestions, setSolvedQuestions] = useLocalStorage('solvedQuestions', []);

  const topics = [...new Set(questions.map(q => q.topic))];

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
    
    // Filter by topic if selected
    if (selectedTopic) {
      filtered = filtered.filter(q => q.topic === selectedTopic);
    }
    
    // Filter by difficulty if in topic-difficulty mode and difficulty is selected
    if (currentMode === 'topic-difficulty' && selectedDifficulty) {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty);
    }
    
    if (filtered.length > 0) {
      const randomIndex = Math.floor(Math.random() * filtered.length);
      setCurrentQuestion(filtered[randomIndex]);
      setUserCode(''); // Reset code when new question is generated
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
      {/* Sidebar only for mode switching */}
      <Sidebar 
        onModeSelect={handleModeSelect}
        currentMode={currentMode}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main selection UI for topic/difficulty/random */}
        {(currentMode === 'topic-difficulty' || currentMode === 'random-topic') && (
          <div className="p-6 border-b border-border bg-white/80">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              {/* Topic selection */}
              <div className="flex-1">
                <div className="mb-2 font-semibold text-gray-700">Select Topic:</div>
                <div className="flex flex-wrap gap-2">
                  {topics.map((topic) => (
                    <Badge
                      key={topic}
                      variant={selectedTopic === topic ? "default" : "secondary"}
                      className={`px-3 py-1 rounded-md cursor-pointer transition-all ${
                        selectedTopic === topic 
                          ? 'bg-blue-500 text-white hover:bg-blue-600' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => handleTopicSelect(topic)}
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Difficulty selection for topic-difficulty mode */}
              {currentMode === 'topic-difficulty' && (
                <div>
                  <div className="mb-2 font-semibold text-gray-700">Select Difficulty:</div>
                  <div className="flex gap-2">
                    {['Easy', 'Medium', 'Hard'].map((difficulty) => (
                      <Badge
                        key={difficulty}
                        variant={getDifficultyVariant(difficulty)}
                        className={`px-3 py-1 rounded-md cursor-pointer ${
                          selectedDifficulty === difficulty ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                        }`}
                        onClick={() => handleDifficultySelect(difficulty)}
                      >
                        {difficulty}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Generate Question Button */}
              <Button 
                onClick={handleGenerateQuestion}
                disabled={
                  (currentMode === 'topic-difficulty' && (!selectedTopic || !selectedDifficulty)) ||
                  (currentMode === 'random-topic' && !selectedTopic)
                }
              >
                Generate Question
              </Button>
            </div>
          </div>
        )}

        {/* Main content area */}
        {currentQuestion ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex overflow-hidden"
          >
            {/* Question Panel */}
            <div className="w-1/2 border-r border-border">
              <QuestionDisplay question={currentQuestion} />
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
          <div className="flex-1 flex items-center justify-center text-lg text-muted-foreground">
            {currentMode === 'topic-difficulty' && (!selectedTopic || !selectedDifficulty)
              ? 'Please select a topic and difficulty to get started.'
              : currentMode === 'random-topic' && !selectedTopic
              ? 'Please select a topic to get started.'
              : 'No question available. Try changing your selection.'}
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