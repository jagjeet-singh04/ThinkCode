import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
  const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
  login(data.user);
  navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 animate-fadein">
      <form onSubmit={handleSubmit} className="bg-white/90 p-8 rounded-2xl shadow-xl w-full max-w-md border border-purple-100 relative animate-fadein-up">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-gradient-to-tr from-purple-400 to-pink-400 p-3 rounded-full mb-2 shadow-lg">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-1 text-purple-700">Welcome Back</h2>
          <p className="text-sm text-gray-500">Login to your ThinkCode account</p>
        </div>
        {error && <div className="mb-4 text-red-500 text-sm text-center bg-red-50 border border-red-200 rounded p-2 animate-shake">{error}</div>}
        <div className="relative mb-4">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 w-5 h-5" />
          <input
            type="email"
            placeholder="Email"
            className="w-full pl-10 pr-3 p-3 border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div className="relative mb-6">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 w-5 h-5" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full pl-10 pr-10 p-3 border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-600"
            tabIndex={-1}
            onClick={() => setShowPassword(v => !v)}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-lg shadow hover:opacity-90 transition text-lg tracking-wide disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="mt-6 text-center text-sm">
          Don't have an account?{' '}
          <span className="text-purple-600 cursor-pointer underline font-medium" onClick={() => navigate('/auth/signup')}>Sign up</span>
        </div>
      </form>
      {/* Animations */}
      <style>{`
        .animate-fadein { animation: fadein 0.7s; }
        .animate-fadein-up { animation: fadein-up 0.7s; }
        .animate-shake { animation: shake 0.3s; }
        @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadein-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: none; } }
        @keyframes shake { 10%, 90% { transform: translateX(-2px); } 20%, 80% { transform: translateX(4px); } 30%, 50%, 70% { transform: translateX(-8px); } 40%, 60% { transform: translateX(8px); } }
      `}</style>
    </div>
  );
};

export default Login;
