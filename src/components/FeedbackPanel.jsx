import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';
import { evaluateCodeWithGemini } from '../services/geminiApi';
import { Send, CheckCircle, XCircle, Clock, Zap } from 'lucide-react';

const FeedbackPanel = ({ question, userCode, onSubmissionResult }) => {
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleSubmit = async () => {
    if (!question || !userCode.trim()) {
      setFeedback('⚠️ Please write some code before submitting.');
      return;
    }
    
    setIsLoading(true);
    setSubmissionStatus(null);
    
    try {
      const result = await evaluateCodeWithGemini(question, userCode);
      setFeedback(result);
      
      // Check if the response indicates a correct solution
      const isCorrect = result.includes('✅') || result.toLowerCase().includes('correct');
      setSubmissionStatus(isCorrect ? 'success' : 'error');
      onSubmissionResult(isCorrect);
    } catch (error) {
      setFeedback('❌ Error evaluating your code. Please check your internet connection and try again.');
      setSubmissionStatus('error');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = () => {
    if (isLoading) return <Clock className="w-4 h-4 animate-spin" />;
    if (submissionStatus === 'success') return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (submissionStatus === 'error') return <XCircle className="w-4 h-4 text-red-600" />;
    return <Zap className="w-4 h-4" />;
  };

  const getStatusColor = () => {
    if (submissionStatus === 'success') return 'success';
    if (submissionStatus === 'error') return 'destructive';
    return 'default';
  };

  return (
    <Card className="border-t rounded-none">
      <CardHeader className="px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            {getStatusIcon()}
            <span>AI Feedback</span>
            {submissionStatus && (
              <Badge variant={getStatusColor()} className="ml-2">
                {submissionStatus === 'success' ? 'Accepted' : 'Needs Work'}
              </Badge>
            )}
          </CardTitle>
          
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleSubmit}
              disabled={isLoading || !question || !userCode.trim()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isLoading ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Solution
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="h-48 overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <div className="h-full flex items-center justify-center bg-muted/20">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3"
                />
                <p className="text-sm text-muted-foreground">
                  AI is analyzing your solution...
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  This may take a few seconds
                </p>
              </div>
            </div>
          ) : feedback ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6"
            >
              <div className={`prose prose-sm max-w-none ${
                submissionStatus === 'success' 
                  ? 'prose-green' 
                  : submissionStatus === 'error' 
                    ? 'prose-red' 
                    : 'prose-neutral'
              }`}>
                <pre className="whitespace-pre-wrap text-sm leading-relaxed bg-muted/30 p-4 rounded-lg border">
                  {feedback}
                </pre>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center bg-muted/10">
              <div className="text-center space-y-2">
                <Zap className="w-8 h-8 text-muted-foreground mx-auto" />
                <p className="text-sm text-muted-foreground">
                  Write your solution and submit for AI feedback
                </p>
                <p className="text-xs text-muted-foreground">
                  Get instant suggestions and improvements
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackPanel;
