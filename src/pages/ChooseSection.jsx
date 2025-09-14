import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import questionsData from '../data/questions.json';
import QuestionStatus from '../components/QuestionStatus';
import { Badge } from '../components/ui/Badge';
import { RefreshCw, Filter, Search, BarChart3, ChevronDown, ChevronUp, BookOpen, Clock, Award, Code, Zap, Users, Mail, Twitter, Github, Linkedin, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChooseSection = () => {
  const { user, login } = useAuth();
  const location = useLocation();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    completed: 0
  });

  const navigate = useNavigate();

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
    const searchMatch = searchQuery ? 
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.topic.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    
    return topicMatch && difficultyMatch && searchMatch;
  });

  // Calculate stats
  useEffect(() => {
    const completed = user?.completedQuestions?.length || 0;
    const easy = questionsData.filter(q => q.difficulty === 'Easy').length;
    const medium = questionsData.filter(q => q.difficulty === 'Medium').length;
    const hard = questionsData.filter(q => q.difficulty === 'Hard').length;
    
    setStats({
      total: questionsData.length,
      easy,
      medium,
      hard,
      completed
    });
  }, [user, questionsData]);

  const handleClearFilters = () => {
    setSelectedTopic('');
    setSelectedDifficulty('');
    setSearchQuery('');
  };

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
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-[#c9d1d9] overflow-hidden relative">
      {/* Animated background elements */}
  <div className="absolute -top-40 -right-40 w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-[#238636]/20 rounded-full blur-[120px] animate-pulse" />
  <div className="absolute -bottom-40 -left-40 w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-[#58a6ff]/20 rounded-full blur-[120px] animate-pulse" />
  <div className="absolute top-1/4 left-1/4 w-40 h-40 sm:w-52 sm:h-52 bg-[#79c0ff]/15 rounded-full blur-[90px] animate-pulse delay-1000" />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#30363d_1px,transparent_1px),linear-gradient(to_bottom,#30363d_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

  <main className="flex-1 container mx-auto px-2 sm:px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-[#58a6ff]">Question Library</h1>
              <p className="text-[#8b949e]">Browse our curated collection of coding challenges</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchUserProfile}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition mt-4 md:mt-0"
            >
              <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
              Refresh Status
            </motion.button>
          </div>

          {/* Stats Overview */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-[#58a6ff]">{stats.total}</div>
              <div className="text-sm text-[#8b949e]">Total</div>
            </div>
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-[#238636]">{stats.easy}</div>
              <div className="text-sm text-[#8b949e]">Easy</div>
            </div>
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-[#d29922]">{stats.medium}</div>
              <div className="text-sm text-[#8b949e]">Medium</div>
            </div>
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-[#f85149]">{stats.hard}</div>
              <div className="text-sm text-[#8b949e]">Hard</div>
            </div>
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-[#79c0ff]">{stats.completed}</div>
              <div className="text-sm text-[#8b949e]">Completed</div>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div 
            className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 mb-8 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <h2 className="text-xl font-semibold mb-4 md:mb-0">Filter Questions</h2>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-[#21262d] rounded-xl hover:bg-[#30363d] transition text-[#c9d1d9] border border-[#30363d]"
              >
                <Filter size={16} />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
                {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8b949e]" size={18} />
              <input
                type="text"
                placeholder="Search questions or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#0d1117] border border-[#30363d] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#58a6ff]/50 text-[#c9d1d9] placeholder-[#8b949e]"
              />
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h3 className="font-medium mb-3 flex items-center">
                        <BookOpen size={16} className="mr-2" />
                        Topics
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {allTopics.map(topic => (
                          <button
                            key={topic}
                            className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${selectedTopic === topic ? 'bg-[#238636] text-white border-[#238636]' : 'bg-[#21262d] text-[#c9d1d9] border-[#30363d] hover:bg-[#30363d]'}`}
                            onClick={() => setSelectedTopic(topic === selectedTopic ? '' : topic)}
                          >
                            {topic}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3 flex items-center">
                        <BarChart3 size={16} className="mr-2" />
                        Difficulty
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {['Easy', 'Medium', 'Hard'].map(diff => (
                          <button
                            key={diff}
                            className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${selectedDifficulty === diff ? 
                              diff === 'Easy' ? 'bg-[#238636] text-white border-[#238636]' : 
                              diff === 'Medium' ? 'bg-[#d29922] text-white border-[#d29922]' : 
                              'bg-[#f85149] text-white border-[#f85149]'
                              : 'bg-[#21262d] text-[#c9d1d9] border-[#30363d] hover:bg-[#30363d]'}`}
                            onClick={() => setSelectedDifficulty(diff === selectedDifficulty ? '' : diff)}
                          >
                            {diff}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button
                      onClick={handleClearFilters}
                      className="px-4 py-2 rounded-xl border border-[#30363d] text-sm font-medium bg-[#21262d] hover:bg-[#30363d] transition text-[#c9d1d9]"
                    >
                      Clear Filters
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Questions Table */}
          <motion.div 
            className="bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#21262d] text-[#8b949e]">
                    <th className="px-6 py-4 text-left font-medium">S.No</th>
                    <th className="px-6 py-4 text-left font-medium">Question Name</th>
                    <th className="px-6 py-4 text-left font-medium">Difficulty</th>
                    <th className="px-6 py-4 text-left font-medium">Topics</th>
                    <th className="px-6 py-4 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredQuestions.map((q, idx) => (
                      <motion.tr
                        key={q.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-[#21262d] hover:bg-[#21262d] cursor-pointer transition group"
                        onClick={() => navigate('/solve', { state: { questionId: q.id } })}
                      >
                        <td className="px-6 py-4">{idx + 1}</td>
                        <td className="px-6 py-4 font-medium">
                          <div className="flex items-center">
                            <span className="text-[#c9d1d9] group-hover:text-[#58a6ff] transition">{q.title}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={q.difficulty === 'Easy' ? 'easy' : q.difficulty === 'Medium' ? 'medium' : 'hard'}>
                            {q.difficulty}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {q.topic.split(',').map(t => (
                              <Badge key={t} variant="outline" className="bg-[#21262d] border-[#30363d] text-[#8b949e]">
                                {t.trim()}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <QuestionStatus questionId={q.id} />
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                  
                  {filteredQuestions.length === 0 && (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td colSpan={5} className="text-center py-12 text-white/40">
                        <div className="flex flex-col items-center">
                          <Search size={48} className="mb-4 opacity-50" />
                          <p className="text-lg">No questions found for selected filters.</p>
                          <button 
                            onClick={handleClearFilters}
                            className="mt-4 px-4 py-2 bg-[#21262d] rounded-xl hover:bg-[#30363d] transition text-[#c9d1d9] border border-[#30363d]"
                          >
                            Clear Filters
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Clock className="w-5 h-5 text-blue-400 mr-2" />
                <h3 className="font-semibold">Time Management</h3>
              </div>
              <p className="text-white/70 text-sm">Practice with time constraints to improve your speed and efficiency during interviews.</p>
            </div>
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Award className="w-5 h-5 text-yellow-400 mr-2" />
                <h3 className="font-semibold">Track Progress</h3>
              </div>
              <p className="text-white/70 text-sm">Monitor your improvement with detailed statistics and personalized recommendations.</p>
            </div>
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Code className="w-5 h-5 text-purple-400 mr-2" />
                <h3 className="font-semibold">Multi-Language</h3>
              </div>
              <p className="text-white/70 text-sm">Solve problems in your preferred programming language with our multi-language support.</p>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
  <footer className="relative z-10 bg-[#161b22]/80 backdrop-blur-xl border-t border-[#30363d] pt-12 pb-8 mt-12">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <Code className="w-8 h-8 text-[#58a6ff] mr-2" />
                <span className="text-xl font-bold text-[#c9d1d9]">ThinkCode</span>
              </div>
              <p className="text-[#8b949e] text-sm mb-6 max-w-md">
                The premier platform for technical interview preparation with AI-powered feedback and personalized learning paths.
              </p>
              <div className="flex space-x-4">
                {[Twitter, Github, Linkedin].map((Icon, index) => (
                  <button key={index} className="p-2 bg-[#21262d] rounded-lg hover:bg-[#30363d] transition">
                    <Icon className="w-5 h-5 text-[#58a6ff]" />
                  </button>
                ))}
              </div>
            </div>

            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-4 text-lg text-[#58a6ff]">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-[#8b949e] hover:text-[#58a6ff] text-sm transition">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#8b949e] text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} ThinkCode. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-[#8b949e] hover:text-[#58a6ff] text-sm transition">Privacy Policy</a>
              <a href="#" className="text-[#8b949e] hover:text-[#58a6ff] text-sm transition">Terms of Service</a>
              <a href="#" className="text-[#8b949e] hover:text-[#58a6ff] text-sm transition">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChooseSection;