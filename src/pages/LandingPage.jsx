import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Code, Zap, Target, Trophy, ChevronRight, Sparkles, X } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const [showModeSelect, setShowModeSelect] = useState(false);

  const handleStart = () => {
    navigate('/choose-path');
  };
  const handleBack = () => setShowModeSelect(false);

  // (Optional: If you want to keep mode selection in LandingPage, you can keep this handler. Otherwise, navigation now goes to ChooseSection first.)
  const handleModeSelect = (mode) => {
    if (mode === "test") {
      navigate("/test");
    } else {
      navigate("/solve", { state: { mode } });
    }
  };

  const features = [
    {
      icon: <Code className="w-7 h-7 text-purple-400" />,
      title: "Smart Code Editor",
      description: "Multi-language support with syntax highlighting",
    },
    {
      icon: <Zap className="w-7 h-7 text-yellow-400" />,
      title: "AI Feedback",
      description: "Instant evaluation & intelligent improvement tips",
    },
    {
      icon: <Target className="w-7 h-7 text-green-400" />,
      title: "Targeted Practice",
      description: "Sharpen skills by topic & difficulty",
    },
    {
      icon: <Trophy className="w-7 h-7 text-pink-400" />,
      title: "Test Mode",
      description: "Timed challenges to simulate interviews",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] text-white">
      {/* Decorative background elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] animate-pulse" />
      
      {/* Animated floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16 flex flex-col items-center min-h-screen">
        {/* Logo + Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <motion.div 
            className="w-24 h-24 mx-auto mb-6 bg-gradient-to-tr from-purple-400/30 to-pink-400/30 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20 animate-float"
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Code className="w-12 h-12 text-purple-300" />
          </motion.div>

          <h1 className="text-6xl font-extrabold tracking-tight mb-4">
            Think<span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Code</span>
          </h1>

          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Master coding interviews with AI-powered feedback, curated problems,
            and intelligent practice sessions designed to elevate your skills.
          </p>
        </motion.div>

        {/* Content Area with Animated Transition */}
        <div className="w-full max-w-6xl min-h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!showModeSelect && (
              <motion.div
                key="features"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -6 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-purple-400/40 transition-all duration-300 h-full">
                      <CardContent className="p-6 text-center">
                        <motion.div 
                          className="w-14 h-14 mx-auto mb-4 bg-white/10 rounded-xl flex items-center justify-center"
                          whileHover={{ rotate: 10, scale: 1.1 }}
                        >
                          {feature.icon}
                        </motion.div>
                        <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                        <p className="text-sm text-white/70">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Start Button - Only show when not in mode selection */}
        <AnimatePresence>
          {!showModeSelect && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="w-full max-w-md mt-12"
            >
              <Button
                onClick={handleStart}
                size="lg"
                className="w-full h-14 text-lg font-semibold rounded-xl shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition group relative overflow-hidden"
              >
                <span className="relative z-10">Start Your Journey</span>
                <ChevronRight className="ml-2 w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute bottom-6 text-white/50 text-sm"
        >
          © {new Date().getFullYear()} ThinkCode · Crafted with 💜 for coders
        </motion.footer>
      </div>
    </div>
  );
};

export default LandingPage;