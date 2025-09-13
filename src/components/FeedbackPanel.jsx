import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';
import { Send, CheckCircle, XCircle, Clock, Zap } from 'lucide-react';
import { evaluateCodeWithGemini } from '../Services/geminiApi';
import { useAuth } from '../context/useAuth';

const FeedbackPanel = ({ question, userCode, onSubmissionResult, initialAccepted, initialStructured, initialFeedback }) => {
  const [feedback, setFeedback] = useState(initialFeedback || '');
  const [isLoading, setIsLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(initialAccepted !== null ? (initialAccepted ? 'success' : 'error') : null);
  const [structured, setStructured] = useState(initialStructured || null);
  const { user } = useAuth();
  // Initialize with props if available
  useEffect(() => {
    if (initialStructured) {
      setStructured(initialStructured);
      setSubmissionStatus(initialAccepted ? 'success' : 'error');
    }
    if (initialFeedback) {
      setFeedback(initialFeedback);
    }
  }, [initialStructured, initialAccepted, initialFeedback]);

  const parseStructured = (text) => {
    if (!text) return null;
    
    // Try to find JSON in the response (more robust approach)
    const jsonRegex = /{[\s\S]*?}(?=\s*$|\s*```|$)/;
    const match = text.match(jsonRegex);
    
    if (!match) {
      console.log('No JSON found in response');
      return null;
    }
    
    let jsonCandidate = match[0].trim();
    
    // Try to fix common JSON issues
    try {
      // Remove trailing commas before closing braces
      jsonCandidate = jsonCandidate.replace(/,\s*}/g, '}');
      jsonCandidate = jsonCandidate.replace(/,\s*]/g, ']');
      
      // Fix unquoted keys (if any)
      jsonCandidate = jsonCandidate.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)(\s*:)/g, '$1"$2"$3');
      
      console.log('Cleaned JSON candidate:', jsonCandidate);
      
      const obj = JSON.parse(jsonCandidate);
      return {
        data: obj,
        remainder: text.slice(match.index + match[0].length).trim() || text
      };
    } catch (e) {
      console.warn('Failed to parse Gemini JSON block after cleaning:', e);
      console.log('Original JSON text:', jsonCandidate);
      
      // Try to extract basic information even if JSON is malformed
      try {
        const acceptedMatch = text.match(/"accepted"\s*:\s*(true|false)/i);
        const scoreMatch = text.match(/"score"\s*:\s*(\d+)/i);
        const verdictMatch = text.match(/"verdict"\s*:\s*"([^"]*)"/i);
        
        if (acceptedMatch || scoreMatch || verdictMatch) {
          const fallbackObj = {
            accepted: acceptedMatch ? acceptedMatch[1].toLowerCase() === 'true' : false,
            score: scoreMatch ? parseInt(scoreMatch[1]) : 0,
            verdict: verdictMatch ? verdictMatch[1] : 'UNKNOWN'
          };
          
          return {
            data: fallbackObj,
            remainder: text
          };
        }
      } catch (fallbackError) {
        console.warn('Fallback parsing also failed:', fallbackError);
      }
      
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
      console.log('Raw Gemini response:', result);
      
      const parsed = parseStructured(result);
      
      if (parsed && parsed.data) {
        setStructured(parsed.data);
        setFeedback(parsed.remainder);
        
        // FIXED: Use the correct field and handle parsing errors
        const accepted = parsed.data.accepted === true;
        console.log('Parsed accepted status:', accepted, 'Data:', parsed.data);
        
        setSubmissionStatus(accepted ? 'success' : 'error');
        onSubmissionResult(accepted);

        if (user && question) {
          const score = parsed.data.score || 0;
          
          try {
            const response = await fetch('/api/auth/updateProgress', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: user.email,
                questionId: question.id,
                score: score
              }),
            });
            
            if (!response.ok) {
              console.error('Failed to update progress');
            }
          } catch (error) {
            console.error('Error updating progress:', error);
          }
        }


      } else {
        // If JSON parsing fails completely, fallback to text analysis
        setStructured(null);
        setFeedback(result);
        
        // More robust fallback detection
        const isAccepted = result.includes('ACCEPTED') || 
                          result.includes('Accepted') || 
                          result.includes('✅') ||
                          (result.includes('accepted') && !result.includes('not accepted'));
        
        const isRejected = result.includes('REJECTED') || 
                          result.includes('Rejected') || 
                          result.includes('❌') ||
                          result.includes('not accepted');
        
        let finalStatus = 'error'; // Default to error
        
        if (isAccepted) finalStatus = 'success';
        else if (isRejected) finalStatus = 'error';
        
        setSubmissionStatus(finalStatus);
        onSubmissionResult(finalStatus === 'success');
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
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            Result:
            {structured ? (
              <Badge variant={structured.accepted ? 'success' : 'destructive'}>
                {structured.accepted ? 'Accepted' : 'Rejected'}{structured.score != null ? `: Score ${structured.score}` : ''}
              </Badge>
            ) : (
              submissionStatus && (
                <Badge variant={getStatusColor()}>
                  {submissionStatus === 'success' ? 'Accepted' : 'Needs Work'}
                </Badge>
              )
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
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3"
                />
                <p className="text-sm text-muted-foreground">
                  AI is analyzing your solution...
                </p>
              </div>
            </div>
          ) : (
            <motion.div
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
                          {structured.test_results.slice(0, 5).map((t, i) => (
                            <tr key={i} className="odd:bg-white even:bg-gray-100/40">
                              <td className="pr-2 align-top">{i + 1}</td>
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
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackPanel;