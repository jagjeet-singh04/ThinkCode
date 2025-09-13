import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import questionsData from '../data/questions.json';
import QuestionStatus from '../components/QuestionStatus';
import { Badge } from '../components/ui/Badge';
import { RefreshCw } from 'lucide-react';

const ChooseSection = () => {
  const { user, login } = useAuth();
  const location = useLocation();
  const [refreshing, setRefreshing] = useState(false);

  const fetchUserProfile = useCallback(async () => {
    if (user?.email) {
      setRefreshing(true);
      try {
        const res = await fetch(`/api/auth/profile?email=${encodeURIComponent(user.email)}`);
        const data = await res.json();
        if (data.user) login(data.user);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      } finally {
        setRefreshing(false);
      }
    }
  }, [user?.email, login]);

  // Fetch latest profile on mount and when location changes
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile, location.key]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const navigate = useNavigate();
  // Extract all unique topics
  const allTopics = Array.from(
    new Set(
      questionsData.flatMap(q => q.topic.split(',').map(t => t.trim()))
    )
  ).sort();

  // Filter questions
  const filteredQuestions = questionsData.filter(q => {
    const topicMatch = selectedTopic ? q.topic.split(',').map(t => t.trim()).includes(selectedTopic) : true;
    const difficultyMatch = selectedDifficulty ? q.difficulty === selectedDifficulty : true;
    return topicMatch && difficultyMatch;
  });

  const handleClearFilters = () => {
    setSelectedTopic('');
    setSelectedDifficulty('');
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Choose Your Question</h1>
          <button
            onClick={fetchUserProfile}
            disabled={refreshing}
            className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 disabled:opacity-50"
          >
            <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
            Refresh Status
          </button>
        </div>
        {/* Topics Filter */}
        <div className="mb-4 flex flex-wrap gap-2 justify-center">
          <span className="font-semibold text-sm mr-2">Topics:</span>
          {allTopics.map(topic => (
            <button
              key={topic}
              className={`px-3 py-1 rounded-full border text-xs font-medium transition-all ${selectedTopic === topic ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'}`}
              onClick={() => setSelectedTopic(topic === selectedTopic ? '' : topic)}
            >
              {topic}
            </button>
          ))}
        </div>
        {/* Difficulty Filter */}
        <div className="mb-4 flex flex-wrap gap-2 justify-center items-center">
          <span className="font-semibold text-sm mr-2">Difficulty:</span>
          {['Easy', 'Medium', 'Hard'].map(diff => (
            <button
              key={diff}
              className={`px-3 py-1 rounded-full border text-xs font-medium transition-all ${selectedDifficulty === diff ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-purple-50'}`}
              onClick={() => setSelectedDifficulty(diff === selectedDifficulty ? '' : diff)}
            >
              {diff}
            </button>
          ))}
          <button
            className="ml-4 px-3 py-1 rounded-full border border-gray-400 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        </div>
        {/* Questions Table */}
        <div className="overflow-x-auto rounded-lg shadow border bg-white">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2 text-left">S.No</th>
                <th className="px-4 py-2 text-left">Question Name</th>
                <th className="px-4 py-2 text-left">Difficulty</th>
                <th className="px-4 py-2 text-left">Topics</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuestions.map((q, idx) => (
                <tr
                  key={q.id}
                  className="border-t hover:bg-blue-100 cursor-pointer transition"
                  onClick={() => navigate('/solve', { state: { questionId: q.id } })}
                  title="Go to coding screen"
                >
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2 font-semibold text-blue-700">{q.title}</td>
                  <td className="px-4 py-2">
                    <Badge variant={q.difficulty === 'Easy' ? 'easy' : q.difficulty === 'Medium' ? 'medium' : 'hard'}>
                      {q.difficulty}
                    </Badge>
                  </td>
                  <td className="px-4 py-2">
                    {q.topic.split(',').map(t => (
                      <Badge key={t} variant="outline" className="mr-1 mb-1">{t.trim()}</Badge>
                    ))}
                  </td>
                  <td className="px-4 py-2">
                    <QuestionStatus questionId={q.id} />
                  </td>
                </tr>
              ))}
              {filteredQuestions.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-400">No questions found for selected filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChooseSection;
