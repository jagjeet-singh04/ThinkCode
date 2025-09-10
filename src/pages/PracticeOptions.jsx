import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Shuffle, Clock } from 'lucide-react';

const PracticeOptions = ({ onSelectMode }) => {
  const navigate = useNavigate();
  const modes = [
    {
      id: 'topic-difficulty',
      icon: <Target className="w-8 h-8" />,
      title: 'Topic + Difficulty',
      description: 'Choose specific topics and difficulty levels to focus your practice',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'random-topic',
      icon: <Shuffle className="w-8 h-8" />,
      title: 'Random Practice',
      description: 'Get random questions from selected topics to diversify your skills',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'test',
      icon: <Clock className="w-8 h-8" />,
      title: 'Test Mode',
      description: 'Timed challenges with multiple questions to simulate real interviews',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-10 max-w-2xl w-full flex flex-col items-center shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Choose Your Practice Mode</h1>
        <div className="grid md:grid-cols-3 gap-6 w-full mb-8">
          {modes.map((mode) => (
            <div
              key={mode.id}
              onClick={() => onSelectMode(mode.id)}
              className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 text-center bg-gradient-to-r ${mode.color} text-white hover:scale-105`}
            >
              <div className="flex flex-col items-center">
                {mode.icon}
                <h3 className="text-xl font-semibold mt-2 mb-1">{mode.title}</h3>
                <p className="text-sm opacity-80">{mode.description}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="mt-4 text-white underline opacity-70 hover:opacity-100"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PracticeOptions;
