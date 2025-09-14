import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { User, Menu, X, ChevronDown, LogOut, Settings, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Topbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  // Removed notifications state
  // Removed dark mode state

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
  setProfileMenuOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setProfileMenuOpen(false);
    setMenuOpen(false);
  };

  // Removed dark mode toggle

  // Navigation items
  const navItems = [
    { name: 'Practice', path: '/choose-path' },
    { name: 'Problems', path: '/choose-section' },
    { name: 'Learn', path: '/learn' },
    { name: 'Community', path: '/community' },
  ];

  // Profile menu items
  const profileMenuItems = [
    { icon: User, label: 'Profile', action: () => navigate('/profile') },
    { icon: Settings, label: 'Settings', action: () => navigate('/settings') },
    { icon: HelpCircle, label: 'Help & Support', action: () => navigate('/support') },
    { icon: LogOut, label: 'Logout', action: handleLogout, isDestructive: true },
  ];

  // Notifications removed

  return (
    <nav className="bg-gradient-to-r from-[#0a0a1f]/90 to-[#1a1a3f]/90 shadow-lg border-b border-white/10 backdrop-blur-xl w-full z-50 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-40 h-40 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-2xl absolute -top-20 -left-20 animate-pulse" />
        <div className="w-32 h-32 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl absolute -bottom-16 -right-16 animate-pulse delay-1000" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <motion.h1
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 drop-shadow select-none cursor-pointer"
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Think<span className="text-white">Code</span>
            </motion.h1>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex ml-10 space-x-6">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  className="text-white/80 hover:text-white text-sm font-medium transition-colors relative group"
                  onClick={() => navigate(item.path)}
                  whileHover={{ y: -1 }}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all group-hover:w-full"></span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications removed */}

            {/* User profile / Auth buttons */}
            {user ? (
              <div className="relative">
                <motion.button
                  className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 rounded-xl pl-2 pr-3 py-1.5 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfileMenuOpen(!profileMenuOpen);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium">
                    {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-sm text-white hidden sm:block">
                    {user.fullName ? user.fullName.split(' ')[0] : 'User'}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-white/60 transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                {/* Profile dropdown */}
                <AnimatePresence>
                  {profileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 bg-[#0f0f2d] border border-white/10 rounded-xl shadow-xl backdrop-blur-xl z-50 overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="p-4 border-b border-white/10 flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium">
                          {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{user.fullName || 'User'}</p>
                          <p className="text-xs text-white/60">{user.email}</p>
                        </div>
                      </div>
                      <div className="py-2">
                        {profileMenuItems.map((item, index) => (
                          <button
                            key={index}
                            className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition ${item.isDestructive ? 'text-red-400 hover:bg-red-400/10' : 'text-white/80 hover:bg-white/5 hover:text-white'}`}
                            onClick={item.action}
                          >
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <motion.button
                  className="px-4 py-2 border border-purple-500/30 text-purple-400 rounded-xl hover:bg-purple-500/10 transition"
                  onClick={() => navigate('/auth/login')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.button>
                <motion.button
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:opacity-90 transition"
                  onClick={() => navigate('/auth/signup')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Up
                </motion.button>
              </div>
            )}

            {/* Mobile hamburger */}
            <div className="md:hidden flex items-center">
              <motion.button
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {menuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a1f]/95 border-t border-white/10 shadow-xl px-4 py-4 flex flex-col space-y-4 z-40 backdrop-blur-xl"
          >
            {/* Mobile navigation items */}
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                className="text-white/80 hover:text-white text-left py-2 transition"
                onClick={() => {
                  navigate(item.path);
                  setMenuOpen(false);
                }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.button>
            ))}
            
            <div className="border-t border-white/10 my-2"></div>
            
            {/* Mobile auth buttons */}
            {user ? (
              <>
                <button
                  className="flex items-center w-full py-2 text-white/80 hover:text-white transition"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate('/profile');
                  }}
                >
                  <User className="w-5 h-5 mr-2" />
                  Profile
                </button>
                <button
                  className="flex items-center w-full py-2 text-red-400 hover:text-red-300 transition"
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="w-full py-3 border border-purple-500/30 text-purple-400 rounded-xl hover:bg-purple-500/10 transition mb-2"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate('/auth/login');
                  }}
                >
                  Login
                </button>
                <button
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:opacity-90 transition"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate('/auth/signup');
                  }}
                >
                  Sign Up
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Topbar;