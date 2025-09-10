import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';
import CodeEditor from './CodeEditor';
import { Clock, ChevronLeft, ChevronRight, Send, Flag } from 'lucide-react';

const TestMode = ({ questions, onTestComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [userLangs, setUserLangs] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeRemaining <= 300) return 'text-red-600'; // Last 5 minutes
    if (timeRemaining <= 600) return 'text-yellow-600'; // Last 10 minutes
    return 'text-foreground';
  };

  const handleAnswerChange = (answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitTest = () => {
    const score = Object.keys(userAnswers).length;
    onTestComplete(score, questions.length);
  };

  const getDifficultyVariant = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'easy';
      case 'Medium': return 'medium';
      case 'Hard': return 'hard';
      default: return 'default';
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Test Header */}
      <Card className="rounded-none border-b">
        <CardHeader className="py-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-3">
              <Flag className="w-5 h-5 text-primary" />
              <span>Test Mode</span>
              <Badge variant="outline">
                Question {currentQuestionIndex + 1} of {questions.length}
              </Badge>
            </CardTitle>
            
            <div className={`flex items-center space-x-2 font-mono text-lg font-bold ${getTimeColor()}`}>
              <Clock className="w-5 h-5" />
              <span>{formatTime(timeRemaining)}</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Question Navigation */}
      <Card className="rounded-none border-b">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2 overflow-x-auto">
              {questions.map((q, index) => (
                <motion.button
                  key={q.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
                    currentQuestionIndex === index
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : userAnswers[q.id]
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-muted text-muted-foreground border border-border hover:bg-muted/80'
                  }`}
                >
                  {index + 1}
                </motion.button>
              ))}
            </div>
            
            <div className="text-sm text-muted-foreground">
              {Object.keys(userAnswers).length} of {questions.length} attempted
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Question Display */}
        <div className="w-1/2 border-r border-border overflow-hidden">
          <div className="h-full overflow-y-auto custom-scrollbar p-6 space-y-6">
            {/* Question Header */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">
                  {currentQuestionIndex + 1}. {currentQuestion.title}
                </h2>
                <Badge variant={getDifficultyVariant(currentQuestion.difficulty)}>
                  {currentQuestion.difficulty}
                </Badge>
              </div>
              <Badge variant="outline">{currentQuestion.topic}</Badge>
            </div>

            {/* Question Description */}
            <Card>
              <CardContent className="pt-6">
                <p className="text-foreground leading-relaxed">
                  {currentQuestion.description}
                </p>
              </CardContent>
            </Card>

            {/* Examples */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Examples</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentQuestion.examples.map((example, index) => (
                  <div key={index} className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <h4 className="font-semibold text-sm">Example {index + 1}:</h4>
                    <div className="space-y-2">
                      <div className="bg-background rounded p-2 border">
                        <span className="text-xs text-muted-foreground">Input:</span>
                        <pre className="text-sm font-mono">{example.input}</pre>
                      </div>
                      <div className="bg-background rounded p-2 border">
                        <span className="text-xs text-muted-foreground">Output:</span>
                        <pre className="text-sm font-mono">{example.output}</pre>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Code Editor */}
        <div className="w-1/2">
          <CodeEditor
            code={userAnswers[currentQuestion.id] || ''}
            onCodeChange={handleAnswerChange}
            language="javascript"
          />
        </div>
      </div>

      {/* Navigation Footer */}
      <Card className="rounded-none border-t">
        <CardContent className="py-4">
          <div className="flex justify-between items-center">
            <Button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            <div className="flex space-x-3">
              <Button
                onClick={() => setShowConfirmSubmit(true)}
                variant="destructive"
                className="flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Test</span>
              </Button>

              {currentQuestionIndex < questions.length - 1 && (
                <Button
                  onClick={handleNext}
                  className="flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Confirmation Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background rounded-lg p-6 max-w-md w-full mx-4 border shadow-lg"
          >
            <h3 className="text-lg font-semibold mb-4">Submit Test?</h3>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to submit your test? You have attempted{' '}
              {Object.keys(userAnswers).length} out of {questions.length} questions.
            </p>
            <div className="flex space-x-3">
              <Button
                onClick={() => setShowConfirmSubmit(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitTest}
                variant="destructive"
                className="flex-1"
              >
                Submit
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TestMode;
