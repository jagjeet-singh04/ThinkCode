import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { List, Target, Trophy, ChevronRight, Code, Zap, Users, BookOpen, Clock, Shield, Mail, Twitter, Github, Linkedin, Heart } from "lucide-react";
import { motion } from "framer-motion";

const ChoosePath = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const paths = [
    {
      id: 1,
      icon: <List className="w-10 h-10 mb-4 text-blue-400" />,
      title: "Choose Question",
      description: "Browse and filter all questions",
      route: '/choose-section',
      color: "blue",
      features: ["Full question library", "Advanced filtering", "Bookmark favorites"]
    },
    {
      id: 2,
      icon: <Target className="w-10 h-10 mb-4 text-green-400" />,
      title: "Practice Mode",
      description: "Sharpen skills by topic & difficulty",
      route: '/solve',
      state: { mode: 'topic-difficulty' },
      color: "green",
      features: ["Topic-based practice", "Difficulty levels", "Progress tracking"]
    },
    {
      id: 3,
      icon: <Trophy className="w-10 h-10 mb-4 text-pink-400" />,
      title: "Test Mode",
      description: "Timed coding challenges",
      route: '/test',
      color: "pink",
      features: ["Timed challenges", "Simulated interviews", "Performance analytics"]
    }
  ];

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Testimonials", href: "/testimonials" },
        { name: "Pricing", href: "/pricing" },
        { name: "Case Studies", href: "/case-studies" },
        { name: "API", href: "/api" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/documentation" },
        { name: "Tutorials", href: "/tutorials" },
        { name: "Blog", href: "/blog" },
        { name: "Community", href: "/community" },
        { name: "Webinars", href: "/webinars" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about-us" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
        { name: "Press", href: "/press" },
        { name: "Partners", href: "/partners" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/support" },
        { name: "Status", href: "/status" },
        { name: "FAQs", href: "/faqs" },
        { name: "Email Support", href: "/email-support" },
        { name: "Live Chat", href: "/live-chat" },
      ],
    },
  ];

  const handleCardClick = (path) => {
    if (path.state) {
      navigate(path.route, { state: path.state });
    } else {
      navigate(path.route);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0a0a1f] via-[#1a1a3f] to-[#0a0a1f] text-white overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute -top-40 -right-40 w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-pink-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute top-1/4 left-1/4 w-40 h-40 sm:w-52 sm:h-52 bg-blue-500/15 rounded-full blur-[90px] animate-pulse delay-1000" />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* Animated floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 md:py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            How would you like to <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">begin</span>?
          </motion.h1>
          <motion.p 
            className="text-white/70 max-w-2xl mx-auto text-sm sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Select your preferred learning path to start improving your coding skills
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mb-16 mt-8">
          {paths.map((path, index) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative"
            >
              <Card 
                className={`flex flex-col p-6 bg-white/5 backdrop-blur-xl border rounded-2xl h-full cursor-pointer transition-all duration-300 ${
                  hoveredCard === path.id 
                    ? `border-${path.color}-400/40 shadow-lg shadow-${path.color}-500/20` 
                    : 'border-white/10'
                }`}
                onClick={() => handleCardClick(path)}
                onMouseEnter={() => setHoveredCard(path.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                    {path.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{path.title}</h3>
                  <p className="text-sm text-white/70 mb-4">{path.description}</p>
                </div>
                
                <div className="mt-auto">
                  <div className="mb-4">
                    <ul className="text-xs text-white/60 space-y-1">
                      {path.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <div className={`w-1.5 h-1.5 rounded-full bg-${path.color}-400 mr-2`}></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button
                    className={`w-full bg-gradient-to-r from-${path.color}-500 to-${path.color}-700 hover:opacity-90 transition-opacity`}
                  >
                    Select
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
                
                {hoveredCard === path.id && (
                  <motion.div 
                    className={`absolute inset-0 -z-10 bg-gradient-to-br from-${path.color}-500/10 to-transparent rounded-2xl`}
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional information section */}
        <motion.div 
          className="w-full max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-center">Not sure where to start?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="w-12 h-12 mx-auto bg-blue-500/20 rounded-xl flex items-center justify-center mb-3">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-medium mb-2">For Beginners</h3>
              <p className="text-sm text-white/70">Start with our curated learning path for fundamental concepts</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 mx-auto bg-green-500/20 rounded-xl flex items-center justify-center mb-3">
                <Target className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-medium mb-2">Interview Prep</h3>
              <p className="text-sm text-white/70">Practice with questions frequently asked in technical interviews</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 mx-auto bg-pink-500/20 rounded-xl flex items-center justify-center mb-3">
                <Trophy className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="font-medium mb-2">Advanced Challenges</h3>
              <p className="text-sm text-white/70">Tackle complex problems to push your skills to the next level</p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/20 backdrop-blur-xl border-t border-white/10 pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <Code className="w-8 h-8 text-purple-400 mr-2" />
                <span className="text-xl font-bold">ThinkCode</span>
              </div>
              <p className="text-white/70 text-sm mb-6 max-w-md">
                The premier platform for technical interview preparation with AI-powered feedback and personalized learning paths.
              </p>
              <div className="flex space-x-4">
                {[Twitter, Github, Linkedin].map((Icon, index) => (
                  <button key={index} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition">
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>

            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-4 text-lg">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.href}
                        className="text-white/70 hover:text-white text-sm transition"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} ThinkCode. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-white/60 hover:text-white text-sm transition">Privacy Policy</a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition">Terms of Service</a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChoosePath;