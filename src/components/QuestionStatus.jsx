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
    switch (solvedQuestion.status) {
      case 'solved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'partially-solved':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'unsolved':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };
  
  const getStatusText = () => {
    switch (solvedQuestion.status) {
      case 'solved':
        return 'Solved';
      case 'partially-solved':
        return `Partially Solved (${solvedQuestion.score}%)`;
      case 'unsolved':
        return 'Unsolved';
      default:
        return '';
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