import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/useAuth';

const QuestionStatus = ({ questionId }) => {
  const { user } = useAuth();
  
  if (!user || !user.solvedQuestions) return null;
  
  const solvedQuestion = user.solvedQuestions.find(
    q => q.questionId === questionId
  );
  
  if (!solvedQuestion) return null;
  
  const getStatusIcon = () => {
    if (solvedQuestion.status === 'solved' || solvedQuestion.score === 100) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    } else if (
      solvedQuestion.status === 'partially-solved' ||
      (solvedQuestion.score > 0 && solvedQuestion.score < 100)
    ) {
      return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    } else {
      return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusText = () => {
    if (solvedQuestion.status === 'solved' || solvedQuestion.score === 100) {
      return 'Solved';
    } else if (
      solvedQuestion.status === 'partially-solved' ||
      (solvedQuestion.score > 0 && solvedQuestion.score < 100)
    ) {
      return `Partially Solved (${solvedQuestion.score}%)`;
    } else {
      return 'Unsolved';
    }
  };
  
  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-md">
      {getStatusIcon()}
      <span className="text-sm font-medium">{getStatusText()}</span>
    </div>
  );
};

export default QuestionStatus;