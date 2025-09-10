import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Code, Zap, Target, Trophy, ChevronRight } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showModeSelect, setShowModeSelect] = useState(false);

  const handleStart = () => setShowModeSelect(true);
  
  const handleModeSelect = (mode) => {
    if (mode === 'test') {
      navigate('/test');
    } else {
      navigate('/solve', { state: { mode } });
    }
  };

  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Smart Code Editor",
      description: "Multi-language support with syntax highlighting"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI Feedback",
      description: "Instant evaluation and improvement suggestions"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Targeted Practice",
      description: "Focus on specific topics and difficulty levels"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Test Mode",
      description: "Timed challenges to test your skills"
    }
  ];

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Background Animation Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center min-h-screen">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              className="w-24 h-24 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center animate-float"
            >
              <Code className="w-12 h-12 text-white" />
            </motion.div>
            
            <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
              Think<span className="text-yellow-300">Code</span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Master coding interviews with AI-powered feedback, curated problems, 
              and intelligent practice sessions designed to elevate your programming skills.
            </p>
          </motion.div>

          {/* Features Grid */}
          {!showModeSelect && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 w-full max-w-6xl"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="glass-effect border-white/20 text-white card-hover">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-xl flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-white/80 text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Action Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-md"
          >
            {!showModeSelect ? (
              <Button
                onClick={handleStart}
                size="lg"
                className="w-full bg-white text-purple-600 hover:bg-white/90 text-lg font-semibold h-14 rounded-xl shadow-xl"
              >
                Start Your Journey
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            ) : (
              <Card className="glass-effect border-white/20">
                <CardHeader>
                  <CardTitle className="text-white text-center text-xl">
                    Choose Your Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => handleModeSelect('topic-difficulty')}
                      variant="outline"
                      className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20 h-12 text-left justify-start"
                    >
                      <Target className="mr-3 w-5 h-5" />
                      <div>
                        <div className="font-semibold">Practice Mode</div>
                        <div className="text-xs text-white/70">Choose topics & difficulty</div>
                      </div>
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => handleModeSelect('test')}
                      variant="outline"
                      className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20 h-12 text-left justify-start"
                    >
                      <Trophy className="mr-3 w-5 h-5" />
                      <div>
                        <div className="font-semibold">Test Mode</div>
                        <div className="text-xs text-white/70">Timed coding challenges</div>
                      </div>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            )}
          </motion.div>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute bottom-6 text-white/60 text-sm"
          >
            © {new Date().getFullYear()} ThinkCode. Crafted for coding excellence.
          </motion.footer>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
