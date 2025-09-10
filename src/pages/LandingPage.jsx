import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Code, Zap, Target, Trophy, ChevronRight } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const [showModeSelect, setShowModeSelect] = useState(false);

  const handleStart = () => setShowModeSelect(true);

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
      {/* Decorative background glows */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] animate-pulse" />

      <div className="relative z-10 container mx-auto px-6 py-16 flex flex-col items-center min-h-screen">
        {/* Logo + Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <motion.div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-tr from-purple-400/30 to-pink-400/30 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20 animate-float">
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

        {/* Features Grid */}
        {!showModeSelect && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14 w-full max-w-6xl"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-purple-400/40 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 mx-auto mb-4 bg-white/10 rounded-xl flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-white/70">{feature.description}</p>
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
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-md"
        >
          {!showModeSelect ? (
            <Button
              onClick={handleStart}
              size="lg"
              className="w-full h-14 text-lg font-semibold rounded-xl shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition"
            >
              Start Your Journey
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          ) : (
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-center text-xl font-semibold text-white">
                  Choose Your Challenge
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => handleModeSelect("topic-difficulty")}
                    variant="outline"
                    className="w-full h-12 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 text-left justify-start text-white"
                  >
                    <Target className="mr-3 w-5 h-5 text-green-400" />
                    <div>
                      <div className="font-semibold">Practice Mode</div>
                      <div className="text-xs text-white/60">
                        Choose topics & difficulty
                      </div>
                    </div>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => handleModeSelect("test")}
                    variant="outline"
                    className="w-full h-12 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 text-left justify-start text-white"
                  >
                    <Trophy className="mr-3 w-5 h-5 text-pink-400" />
                    <div>
                      <div className="font-semibold">Test Mode</div>
                      <div className="text-xs text-white/60">
                        Timed coding challenges
                      </div>
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
