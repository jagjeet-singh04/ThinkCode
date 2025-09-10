import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';
import { evaluateCodeWithGemini } from '../Services/geminiApi';
import { Send, CheckCircle, XCircle, Clock, Zap } from 'lucide-react';

const FeedbackPanel = ({ question, userCode, onSubmissionResult }) => {
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [structured, setStructured] = useState(null); // parsed JSON result

  const parseStructured = (text) => {
    if (!text) return null;
    // Capture first fenced code block with optional json after opening backticks
    const fenceRegex = /```(?:json)?\s*([\s\S]*?)```/i;
    const match = text.match(fenceRegex);
    if (!match) return null;
    const jsonCandidate = match[1].trim();
    try {
      const obj = JSON.parse(jsonCandidate);
      return {
        data: obj,
        remainder: text.slice(match.index + match[0].length).trim() || ''
      };
    } catch (e) {
      console.warn('Failed to parse Gemini JSON block:', e);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!question || !userCode.trim()) {
      setFeedback('⚠️ Please write some code before submitting.');
      return;
    }
    
    setIsLoading(true);
    setSubmissionStatus(null);
    
    try {
      const result = await evaluateCodeWithGemini(question, userCode);
      // Attempt to parse structured JSON first
      const parsed = parseStructured(result);
      if (parsed && parsed.data) {
        setStructured(parsed.data);
        // We'll show the human readable feedback (remainder) or keep full if empty
        setFeedback(parsed.remainder || result);
        const accepted = !!parsed.data.accepted;
        setSubmissionStatus(accepted ? 'success' : 'error');
        onSubmissionResult(accepted);
      } else {
        // Fallback to legacy heuristic
        setStructured(null);
        setFeedback(result);
        const isCorrect = result.includes('✅') || result.toLowerCase().includes('accepted');
        setSubmissionStatus(isCorrect ? 'success' : 'error');
        onSubmissionResult(isCorrect);
      }
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
              <div className="flex items-center gap-2 ml-2">
                <Badge variant={getStatusColor()}>
                  {submissionStatus === 'success' ? 'Accepted' : 'Needs Work'}
                </Badge>
                {structured?.score != null && (
                  <Badge variant="secondary">Score: {structured.score}</Badge>
                )}
              </div>
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
              {structured && (
                <div className="mb-4 space-y-3">
                  <div className="flex flex-wrap gap-3 text-xs">
                    {structured.time_complexity && (
                      <Badge variant="outline">Time: {structured.time_complexity}</Badge>
                    )}
                    {structured.space_complexity && (
                      <Badge variant="outline">Space: {structured.space_complexity}</Badge>
                    )}
                  </div>
                  {Array.isArray(structured.errors) && structured.errors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-3 text-xs text-red-700 max-h-28 overflow-auto">
                      <strong className="block mb-1">Issues Detected:</strong>
                      <ul className="list-disc pl-4 space-y-0.5">
                        {structured.errors.map((e, i) => (
                          <li key={i}>{e.line != null ? `L${e.line}: ` : ''}{e.message} ({e.severity})</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {Array.isArray(structured.test_results) && structured.test_results.length > 0 && (
                    <div className="bg-gray-50 border border-border rounded-md p-3 text-xs max-h-32 overflow-auto">
                      <strong className="block mb-1">Test Results:</strong>
                      <table className="w-full text-[11px]">
                        <thead>
                          <tr className="text-left text-gray-500">
                            <th className="pr-2">#</th>
                            <th className="pr-2">Input</th>
                            <th className="pr-2">Expected</th>
                            <th className="pr-2">Actual</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {structured.test_results.slice(0,5).map((t, i) => (
                            <tr key={i} className="odd:bg-white even:bg-gray-100/40">
                              <td className="pr-2 align-top">{i+1}</td>
                              <td className="pr-2 max-w-[120px] truncate" title={t.input}>{t.input}</td>
                              <td className="pr-2 max-w-[120px] truncate" title={t.expected}>{t.expected}</td>
                              <td className="pr-2 max-w-[120px] truncate" title={t.actual}>{t.actual}</td>
                              <td>{t.passed ? '✅' : '❌'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
              <div className={`prose prose-sm max-w-none ${submissionStatus === 'success' ? 'prose-green' : submissionStatus === 'error' ? 'prose-red' : 'prose-neutral'}`}>
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
