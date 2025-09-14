import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Code, Cpu, Database, Network, BarChart3, Clock, Users, Award, ChevronRight, Zap, Calendar, Mail, Twitter, Github, Linkedin, Heart, ArrowRight } from "lucide-react";

const Learn = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [activeCategory, setActiveCategory] = useState("data-structures");

  // Set launch date (2 weeks from now)
  useEffect(() => {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 14);

    const updateCountdown = () => {
      const now = new Date();
      const difference = launchDate - now;

      if (difference <= 0) {
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        return;
      }

      setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMinutes(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((difference % (1000 * 60)) / 1000));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const learningPaths = [
    {
      id: "data-structures",
      title: "Data Structures & Algorithms",
      icon: <Database className="w-6 h-6 text-blue-400" />,
      description: "Master arrays, linked lists, trees, graphs, sorting, searching, and complexity analysis.",
      topics: ["Arrays & Strings", "Linked Lists", "Trees & Graphs", "Sorting Algorithms", "Dynamic Programming", "Complexity Analysis"],
      color: "blue"
    },
    {
      id: "system-design",
      title: "System Design",
      icon: <Network className="w-6 h-6 text-purple-400" />,
      description: "Learn principles of scalable system design, architecture patterns, and real-world case studies.",
      topics: ["Scalability", "Databases", "Caching", "Load Balancing", "Microservices", "API Design"],
      color: "purple"
    },
    {
      id: "interview-prep",
      title: "Interview Preparation",
      icon: <Cpu className="w-6 h-6 text-green-400" />,
      description: "Get expert advice on technical interviews, behavioral questions, and communication skills.",
      topics: ["Problem Solving", "Whiteboard Sessions", "Behavioral Questions", "Negotiation", "Company Patterns", "Mock Interviews"],
      color: "green"
    }
  ];

  const resources = [
    {
      title: "Interactive Code Playground",
      description: "Practice with live code editor and immediate feedback",
      icon: <Code className="w-5 h-5" />
    },
    {
      title: "Video Tutorials",
      description: "Watch expert-led tutorials on complex topics",
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      title: "Community Forums",
      description: "Connect with other learners and mentors",
      icon: <Users className="w-5 h-5" />
    },
    {
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics",
      icon: <Award className="w-5 h-5" />
    }
  ];

  const footerSections = [
    {
      title: "Product",
      links: ["Features", "Testimonials", "Pricing", "Case Studies", "API"],
    },
    {
      title: "Resources",
      links: ["Documentation", "Tutorials", "Blog", "Community", "Webinars"],
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Contact", "Press", "Partners"],
    },
    {
      title: "Support",
      links: ["Help Center", "Status", "FAQs", "Email Support", "Live Chat"],
    },
  ];

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

      <main className="flex-1 container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-6"
            >
              <Zap className="w-4 h-4 mr-2" />
              Coming Soon
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Learn & <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Master</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg text-white/70 mb-8">
              We're building a comprehensive learning platform with curated tutorials, guides, and resources to help you master coding interviews and computer science fundamentals.
            </p>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-12"
          >
            <h2 className="text-xl font-semibold text-center mb-6">Launching In</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
              {[
                { value: days, label: "Days" },
                { value: hours, label: "Hours" },
                { value: minutes, label: "Minutes" },
                { value: seconds, label: "Seconds" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center p-4 bg-white/5 rounded-xl"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {item.value}
                  </div>
                  <div className="text-sm text-white/60 mt-1">{item.label}</div>
                </motion.div>
              ))}
            </div>
            
            <p className="text-center text-white/60 text-sm mt-6">
              We're working hard to bring you the best learning experience. Stay tuned!
            </p>
          </motion.div>

          {/* Learning Paths */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Learning Paths</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {learningPaths.map((path) => (
                <motion.div
                  key={path.id}
                  className={`bg-white/5 backdrop-blur-xl border rounded-2xl p-6 cursor-pointer transition ${
                    activeCategory === path.id 
                      ? `border-${path.color}-400/40 shadow-lg shadow-${path.color}-500/20` 
                      : 'border-white/10 hover:border-white/20'
                  }`}
                  onClick={() => setActiveCategory(path.id)}
                  whileHover={{ y: -5 }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-${path.color}-500/10 flex items-center justify-center mb-4`}>
                    {path.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{path.title}</h3>
                  <p className="text-white/70 text-sm mb-4">{path.description}</p>
                  <ul className="text-xs text-white/60 space-y-1">
                    {path.topics.slice(0, 3).map((topic, i) => (
                      <li key={i} className="flex items-center">
                        <div className={`w-1.5 h-1.5 rounded-full bg-${path.color}-400 mr-2`}></div>
                        {topic}
                      </li>
                    ))}
                    {path.topics.length > 3 && (
                      <li className="text-white/40">+{path.topics.length - 3} more topics</li>
                    )}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Expanded Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-purple-400" />
                What to Expect
              </h3>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 mr-3"></div>
                  <span>Step-by-step tutorials with code examples</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 mr-3"></div>
                  <span>Interactive coding challenges and exercises</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 mr-3"></div>
                  <span>Real-world projects and case studies</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 mr-3"></div>
                  <span>Expert tips and best practices</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-400" />
                Join the Waitlist
              </h3>
              <p className="text-white/70 mb-4">
                Be the first to know when we launch and get exclusive early access.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:opacity-90 transition">
                  Notify Me
                </button>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Learning Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resources.map((resource, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 mx-auto bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 text-purple-400">
                    {resource.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{resource.title}</h3>
                  <p className="text-white/70 text-sm">{resource.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
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
                      <a href="#" className="text-white/70 hover:text-white text-sm transition">{link}</a>
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

export default Learn;