import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';
import CodeEditor from './CodeEditor';
import FeedbackPanel from './FeedbackPanel';
import { Clock, ChevronLeft, ChevronRight, Send, Flag, Lightbulb } from 'lucide-react';
import { evaluateCodeWithGemini } from '../Services/geminiApi';

// Inline HintSection
const HintSection = ({ hint }) => {
    const [show, setShow] = useState(false);
    return (
        <div className="mt-4">
            {!show ? (
                <button
                    className="px-4 py-1 rounded bg-sky-100 hover:bg-sky-200 text-sky-800 font-semibold text-sm border border-sky-200 transition"
                    onClick={() => setShow(true)}
                >
                    <Lightbulb className="inline w-4 h-4 mr-1" /> Show Hint
                </button>
            ) : (
                <div className="mt-2 bg-gradient-to-br from-sky-100 to-blue-200 dark:from-blue-900/80 dark:to-blue-950/60 border border-sky-400 dark:border-blue-700 rounded-xl p-4 text-blue-900 dark:text-blue-100 shadow-lg animate-fade-in">
                    <span className="block text-xs font-extrabold uppercase tracking-wider text-sky-800 dark:text-blue-200 mb-1">Hint</span>
                    <span className="text-base font-medium leading-relaxed text-blue-900 dark:text-blue-100">{hint}</span>
                </div>
            )}
        </div>
    );
};

const TestMode = ({ questions, onTestComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [userLangs, setUserLangs] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes
    const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
    const [feedbacks, setFeedbacks] = useState({}); // { [questionId]: { code, feedback, score, accepted, structured } }
    const [submitting, setSubmitting] = useState(false);
    const [showResults, setShowResults] = useState(false);

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

    // Debug useEffect for results modal
    useEffect(() => {
        if (showResults) {
            console.log('=== RENDERING RESULTS MODAL ===');
            console.log('Feedbacks state:', feedbacks);
            console.log('Questions:', questions.map(q => ({ id: q.id, title: q.title })));
            
            const calculatedScore = calculateTotalScore();
            console.log('Calculated total score:', calculatedScore);
            
            questions.forEach((q, i) => {
                const feedback = feedbacks[q.id];
                console.log(`Question ${i + 1} (${q.id}):`, {
                    hasFeedback: !!feedback,
                    feedback: feedback,
                    score: feedback?.score,
                    accepted: feedback?.accepted
                });
            });
        }
    }, [showResults, feedbacks, questions]);

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

    const handleCodeChange = (code) => {
        setUserAnswers(prev => ({ ...prev, [currentQuestion.id]: code }));
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

    // Enhanced JSON parsing function with better error handling
    const parseStructuredResponse = (text) => {
        if (!text) return { structured: null, feedback: text, score: 0, accepted: false };
        
        let structured = null;
        let feedbackText = text;
        let score = 0;
        let accepted = false;

        // Try multiple JSON extraction methods
        const jsonPatterns = [
            /```(?:json)?\s*([\s\S]*?)```/i,  // Code blocks
            /\{[\s\S]*?"accepted"[\s\S]*?\}/i,  // Direct JSON objects
            /{[\s\S]*?}(?=\s*$|\s*[A-Z])/i     // JSON at start/middle
        ];

        for (const pattern of jsonPatterns) {
            const match = text.match(pattern);
            if (!match) continue;

            let jsonText = match[1] || match[0];
            jsonText = jsonText.trim();
            
            console.log('=== ATTEMPTING JSON PARSE ===');
            console.log('Raw JSON text:', jsonText);

            // Clean up common JSON issues
            try {
                // Remove trailing commas
                jsonText = jsonText.replace(/,(\s*[}\]])/g, '$1');
                // Fix unquoted keys
                jsonText = jsonText.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)(\s*:)/g, '$1"$2"$3');
                // Fix single quotes to double quotes
                jsonText = jsonText.replace(/'/g, '"');
                // Remove any trailing text after the last }
                const lastBrace = jsonText.lastIndexOf('}');
                if (lastBrace !== -1) {
                    jsonText = jsonText.substring(0, lastBrace + 1);
                }

                console.log('=== CLEANED JSON ===');
                console.log('Cleaned JSON text:', jsonText);
                
                structured = JSON.parse(jsonText);
                console.log('=== SUCCESSFULLY PARSED JSON ===');
                console.log('Structured data:', structured);
                
                // Extract values from structured data
                if (structured && typeof structured.score === 'number') {
                    score = structured.score;
                }
                if (structured && structured.accepted === true) {
                    accepted = true;
                }
                
                // Remove the JSON block from feedback text
                feedbackText = text.replace(pattern, '').trim() || text;
                break; // Successfully parsed, exit loop
                
            } catch (parseError) {
                console.warn('JSON parsing failed for pattern:', parseError.message);
                console.log('Failed JSON text:', jsonText);
                continue; // Try next pattern
            }
        }

        // If all JSON parsing failed, try text-based extraction
        if (!structured) {
            console.log('=== FALLING BACK TO TEXT EXTRACTION ===');
            
            // More robust text-based extraction
            const scorePatterns = [
                /(?:score|points?)[:\s]*(\d+)/i,
                /"score"\s*:\s*(\d+)/i,
                /(\d+)\s*(?:points?|pts)/i
            ];
            
            const acceptedPatterns = [
                /(?:accepted|status)[:\s]*(true|false)/i,
                /"accepted"\s*:\s*(true|false)/i,
                /(?:ACCEPTED|REJECTED|✅|❌)/i
            ];

            for (const pattern of scorePatterns) {
                const match = text.match(pattern);
                if (match) {
                    score = parseInt(match[1], 10);
                    console.log('Extracted score from text:', score);
                    break;
                }
            }

            for (const pattern of acceptedPatterns) {
                const match = text.match(pattern);
                if (match) {
                    if (match[1]) {
                        accepted = match[1].toLowerCase() === 'true';
                    } else {
                        // Check for ACCEPTED/✅ vs REJECTED/❌
                        accepted = /(?:ACCEPTED|✅)/i.test(match[0]);
                    }
                    console.log('Extracted accepted from text:', accepted);
                    break;
                }
            }

            feedbackText = text;
        }

        return { structured, feedback: feedbackText, score, accepted };
    };

    // CONSOLIDATED SUBMIT FUNCTION - This handles both solution submission and scoring
    const handleSubmitSolution = async () => {
        const code = userAnswers[currentQuestion.id] || '';
        if (!code.trim()) return;
        setSubmitting(true);

        console.log('=== SUBMITTING SOLUTION ===');
        console.log('Question ID:', currentQuestion.id);
        console.log('Code:', code);

        try {
            const result = await evaluateCodeWithGemini(currentQuestion, code);
            console.log('=== GEMINI RAW RESPONSE ===');
            console.log(result);

            // Parse the response using enhanced parsing
            const { structured, feedback: feedbackText, score, accepted } = parseStructuredResponse(result);

            console.log('=== FINAL EXTRACTED VALUES ===');
            console.log('Score:', score);
            console.log('Accepted:', accepted);
            console.log('Structured:', structured);
            console.log('Feedback text:', feedbackText);

            // Update feedbacks state
            const newFeedback = {
                code,
                feedback: feedbackText,
                score,
                accepted,
                structured,
            };

            console.log('=== UPDATING FEEDBACK STATE ===');
            console.log('Question ID:', currentQuestion.id);
            console.log('New feedback object:', newFeedback);

            setFeedbacks(prev => {
                const updated = {
                    ...prev,
                    [currentQuestion.id]: newFeedback
                };
                console.log('=== UPDATED FEEDBACKS STATE ===');
                console.log('Previous state:', prev);
                console.log('Updated state:', updated);
                return updated;
            });

        } catch (error) {
            console.error('=== SUBMISSION ERROR ===');
            console.error('Error details:', error);
            
            setFeedbacks(prev => ({
                ...prev,
                [currentQuestion.id]: {
                    code,
                    feedback: `❌ Error: ${error.message || 'Unknown error occurred'}`,
                    score: 0,
                    accepted: false,
                    structured: null,
                }
            }));
        } finally {
            setSubmitting(false);
        }
    };

    const handleSubmitTest = () => {
        console.log('=== SUBMITTING TEST ===');
        console.log('Current feedbacks state:', feedbacks);
        setShowResults(true);
    };

    const getDifficultyVariant = (difficulty) => {
        switch (difficulty) {
            case 'Easy': return 'easy';
            case 'Medium': return 'medium';
            case 'Hard': return 'hard';
            default: return 'default';
        }
    };

    // Improved total score calculation with debugging
    const calculateTotalScore = () => {
        console.log('=== CALCULATING TOTAL SCORE ===');
        console.log('Feedbacks object:', feedbacks);
        
        let total = 0;
        Object.entries(feedbacks).forEach(([questionId, feedback]) => {
            const score = feedback && typeof feedback.score === 'number' ? feedback.score : 0;
            console.log(`Question ${questionId}: score = ${score}`);
            total += score;
        });
        
        console.log('Final total score:', total);
        return total;
    };

    const totalScore = calculateTotalScore();

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
                                    className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${currentQuestionIndex === index
                                        ? 'bg-primary text-primary-foreground shadow-md'
                                        : userAnswers[q.id]
                                            ? feedbacks[q.id]?.accepted
                                                ? 'bg-green-100 text-green-800 border border-green-300'
                                                : feedbacks[q.id]
                                                    ? 'bg-red-100 text-red-800 border border-red-300'
                                                    : 'bg-blue-100 text-blue-800 border border-blue-300'
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

                        {/* Question Description + Hint */}
                        <Card>
                            <CardContent className="pt-6">
                                <p className="text-foreground leading-relaxed">
                                    {currentQuestion.description}
                                </p>
                                {/* Hint Button and Reveal */}
                                {currentQuestion.hint && (
                                    <HintSection hint={currentQuestion.hint} />
                                )}
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

                {/* Code Editor + FeedbackPanel */}
                <div className="w-1/2 flex flex-col h-full">
                    <div className="flex-1">
                        <CodeEditor
                            code={userAnswers[currentQuestion.id] || ''}
                            onCodeChange={handleCodeChange}
                            language="javascript"
                        />
                    </div>
                    
                    {/* UPDATED: Single Submit Button + Feedback Display */}
                    <div className="border-t">
                        {/* Submit Button Section */}
                        <div className="flex justify-between items-center p-4 border-b">
                            <div className="flex items-center space-x-2">
                                {feedbacks[currentQuestion.id] && (
                                    <Badge variant={feedbacks[currentQuestion.id].accepted ? 'success' : 'destructive'}>
                                        {feedbacks[currentQuestion.id].accepted ? 'Accepted' : 'Rejected'}
                                        {feedbacks[currentQuestion.id].score != null ? `: ${feedbacks[currentQuestion.id].score} pts` : ''}
                                    </Badge>
                                )}
                            </div>
                            <Button
                                onClick={handleSubmitSolution}
                                disabled={submitting || !(userAnswers[currentQuestion.id] && userAnswers[currentQuestion.id].trim())}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            >
                                {submitting ? (
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
                        </div>

                        {/* Feedback Display Section */}
                        {feedbacks[currentQuestion.id] && (
                            <div className="h-48 overflow-y-auto custom-scrollbar p-4 bg-muted/20">
                                {feedbacks[currentQuestion.id].structured && (
                                    <div className="mb-4 space-y-3">
                                        <div className="flex flex-wrap gap-3 text-xs">
                                            {feedbacks[currentQuestion.id].structured.time_complexity && (
                                                <Badge variant="outline">Time: {feedbacks[currentQuestion.id].structured.time_complexity}</Badge>
                                            )}
                                            {feedbacks[currentQuestion.id].structured.space_complexity && (
                                                <Badge variant="outline">Space: {feedbacks[currentQuestion.id].structured.space_complexity}</Badge>
                                            )}
                                        </div>
                                        {Array.isArray(feedbacks[currentQuestion.id].structured.errors) && feedbacks[currentQuestion.id].structured.errors.length > 0 && (
                                            <div className="bg-red-50 border border-red-200 rounded-md p-3 text-xs text-red-700 max-h-28 overflow-auto">
                                                <strong className="block mb-1">Issues Detected:</strong>
                                                <ul className="list-disc pl-4 space-y-0.5">
                                                    {feedbacks[currentQuestion.id].structured.errors.map((e, i) => (
                                                        <li key={i}>{e.line != null ? `L${e.line}: ` : ''}{e.message} ({e.severity})</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div className="prose prose-sm max-w-none">
                                    <pre className="whitespace-pre-wrap text-sm leading-relaxed bg-background p-4 rounded-lg border">
                                        {feedbacks[currentQuestion.id].feedback}
                                    </pre>
                                </div>
                            </div>
                        )}
                    </div>
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-gradient-to-br from-blue-900/80 via-purple-900/80 to-indigo-900/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gradient-to-br from-white via-blue-50 to-purple-100 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 rounded-2xl p-6 sm:p-8 max-w-md w-full mx-auto border-2 border-primary/20 shadow-2xl"
                    >
                        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center text-primary">Submit Test?</h3>
                        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-200 mb-6 text-center">
                            Are you sure you want to submit your test?<br />
                            <span className="text-blue-700 dark:text-blue-300 font-semibold">{Object.keys(userAnswers).length}</span> out of <span className="text-blue-700 dark:text-blue-300 font-semibold">{questions.length}</span> questions attempted.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 mt-4">
                            <Button
                                onClick={() => setShowConfirmSubmit(false)}
                                variant="outline"
                                className="flex-1 border-gray-300 dark:border-gray-600"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSubmitTest}
                                variant="destructive"
                                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold border-0 shadow-md hover:from-purple-700 hover:to-blue-700"
                            >
                                Submit
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Results Modal */}
            {showResults && (
                <div className="fixed inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 w-full max-w-4xl max-h-[95vh] overflow-hidden"
                    >
                        {/* Header with gradient background */}
                        <div className="bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 p-6 text-white">
                            <div className="text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
                                    className="text-4xl mb-2"
                                >
                                    🎉
                                </motion.div>
                                <h2 className="text-3xl font-bold mb-2">Test Results</h2>
                                <p className="text-blue-100 text-sm">Great job completing the test!</p>
                            </div>
                        </div>

                        <div className="p-6 overflow-y-auto max-h-[calc(95vh-120px)]">
                            {/* Total Score Card */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mb-8 relative"
                            >
                                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl p-6 border border-indigo-200/50 dark:border-indigo-700/50">
                                    <div className="text-center">
                                        <div className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                                            {totalScore}
                                        </div>
                                        <div className="text-lg font-medium text-gray-600 dark:text-gray-300">Total Score</div>
                                        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                            out of {questions.length * 100} possible points
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                            
                            {/* Question Breakdown */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mb-8"
                            >
                                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Question Breakdown</h3>
                                <div className="space-y-3">
                                    {questions.map((q, i) => {
                                        const feedback = feedbacks[q.id];
                                        const score = feedback?.score ?? 0;
                                        const accepted = feedback?.accepted ?? false;
                                        const hasAttempt = !!userAnswers[q.id];
                                        
                                        return (
                                            <motion.div 
                                                key={q.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 * i }}
                                                className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition-all hover:shadow-md ${
                                                    accepted 
                                                        ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700/50' 
                                                        : hasAttempt 
                                                            ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700/50'
                                                            : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-600/50'
                                                }`}
                                            >
                                                <div className="flex-1 mb-3 sm:mb-0">
                                                    <div className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                                                        {i + 1}. {q.title}
                                                    </div>
                                                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                        {q.difficulty} • {q.topic}
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
                                                    <div className="text-right">
                                                        <div className={`font-bold text-xl sm:text-2xl ${
                                                            score > 80 ? 'text-emerald-600 dark:text-emerald-400' :
                                                            score > 50 ? 'text-amber-600 dark:text-amber-400' :
                                                            'text-red-600 dark:text-red-400'
                                                        }`}>
                                                            {score}
                                                        </div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">points</div>
                                                    </div>
                                                    <div className="ml-4">
                                                        {!hasAttempt ? (
                                                            <Badge className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 text-xs px-3 py-1">
                                                                Not Attempted
                                                            </Badge>
                                                        ) : accepted ? (
                                                            <Badge className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-600 text-xs px-3 py-1">
                                                                ✓ Accepted
                                                            </Badge>
                                                        ) : (
                                                            <Badge className="bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 border-red-300 dark:border-red-600 text-xs px-3 py-1">
                                                                ✗ Rejected
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.div>

                            {/* Summary Stats */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mb-8"
                            >
                                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Summary Statistics</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-xl p-4 border border-emerald-200/50 dark:border-emerald-700/50 text-center">
                                        <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                                            {Object.values(feedbacks).filter(f => f?.accepted).length}
                                        </div>
                                        <div className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Accepted Solutions</div>
                                        <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                                            {Math.round((Object.values(feedbacks).filter(f => f?.accepted).length / questions.length) * 100)}% success rate
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 rounded-xl p-4 border border-red-200/50 dark:border-red-700/50 text-center">
                                        <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-1">
                                            {Object.values(feedbacks).filter(f => f && !f.accepted).length}
                                        </div>
                                        <div className="text-sm font-medium text-red-700 dark:text-red-300">Rejected Solutions</div>
                                        <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                                            Need improvement
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-800/50 dark:to-slate-800/50 rounded-xl p-4 border border-gray-200/50 dark:border-gray-600/50 text-center">
                                        <div className="text-3xl font-bold text-gray-600 dark:text-gray-400 mb-1">
                                            {questions.length - Object.keys(userAnswers).length}
                                        </div>
                                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Not Attempted</div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                            {questions.length - Object.keys(userAnswers).length === 0 ? 'All completed!' : 'Room for more'}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                            
                            {/* Action Button */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="flex justify-center pt-4"
                            >
                                <Button 
                                    onClick={() => { 
                                        setShowResults(false); 
                                        onTestComplete(totalScore, questions.length); 
                                    }}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                                >
                                    Continue to Dashboard
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default TestMode;