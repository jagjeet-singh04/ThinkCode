import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { List, Target, Trophy } from "lucide-react";

const ChoosePath = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] text-white p-6">
      <h1 className="text-3xl font-bold mb-10 text-center">How would you like to begin?</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <Card className="flex flex-col items-center p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-purple-400/40 transition-all cursor-pointer" onClick={() => navigate('/choose-section')}>
          <List className="w-10 h-10 mb-4 text-blue-400" />
          <span className="font-semibold text-lg mb-2">Choose Question</span>
          <span className="text-sm text-white/70 text-center">Browse and filter all questions</span>
        </Card>
        <Card className="flex flex-col items-center p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-green-400/40 transition-all cursor-pointer" onClick={() => navigate('/solve', { state: { mode: 'topic-difficulty' } })}>
          <Target className="w-10 h-10 mb-4 text-green-400" />
          <span className="font-semibold text-lg mb-2">Practice Mode</span>
          <span className="text-sm text-white/70 text-center">Sharpen skills by topic & difficulty</span>
        </Card>
        <Card className="flex flex-col items-center p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-pink-400/40 transition-all cursor-pointer" onClick={() => navigate('/test')}>
          <Trophy className="w-10 h-10 mb-4 text-pink-400" />
          <span className="font-semibold text-lg mb-2">Test Mode</span>
          <span className="text-sm text-white/70 text-center">Timed coding challenges</span>
        </Card>
      </div>
    </div>
  );
};

export default ChoosePath;
