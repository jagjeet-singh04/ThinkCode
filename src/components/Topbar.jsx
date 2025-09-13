

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { User, Menu, X } from 'lucide-react';


const Topbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  // Mobile menu items
  const menuItems = user ? (
    <>
      <button
        className="flex items-center w-full px-4 py-2 border border-purple-500 text-purple-600 rounded hover:bg-purple-50 transition mb-2 md:mb-0 md:mr-2 md:w-auto"
        onClick={() => { setMenuOpen(false); navigate('/profile'); }}
      >
        <User className="w-5 h-5 mr-2" />
        {user.fullName ? user.fullName.split(' ')[0] : 'Profile'}
      </button>
      <button
        className="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded hover:opacity-90 transition md:w-auto"
        onClick={() => { setMenuOpen(false); logout(); }}
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <button
        className="w-full px-4 py-2 border border-purple-500 text-purple-600 rounded hover:bg-purple-50 transition mb-2 md:mb-0 md:mr-2 md:w-auto"
        onClick={() => { setMenuOpen(false); navigate('/auth/login'); }}
      >
        Login
      </button>
      <button
        className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded hover:opacity-90 transition md:w-auto"
        onClick={() => { setMenuOpen(false); navigate('/auth/signup'); }}
      >
        Sign Up
      </button>
    </>
  );

  return (
    <nav className="bg-white/90 shadow border-b border-gray-100 backdrop-blur-md w-full z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-extrabold tracking-tight text-purple-700 drop-shadow-sm select-none cursor-pointer" onClick={() => navigate('/')}>ThinkCode</h1>
          </div>
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-2">
            {menuItems}
          </div>
          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button
              className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6 text-purple-600" /> : <Menu className="w-6 h-6 text-purple-600" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 border-t border-gray-100 shadow-lg px-4 py-4 flex flex-col space-y-2 animate-fade-in-down">
          {menuItems}
        </div>
      )}
    </nav>
  );
};

export default Topbar;