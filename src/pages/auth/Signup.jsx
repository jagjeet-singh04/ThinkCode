import React, { useState } from 'react';
import { UserPlus, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  function getPasswordStrength(pw) {
    if (!pw) return '';
    if (pw.length < 6) return 'Weak';
    if (/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(pw)) return 'Strong';
    if (pw.length >= 8) return 'Medium';
    return 'Weak';
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (!fullName.trim()) {
      setError('Full name is required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreed) {
      setError('You must agree to the Terms and Conditions.');
      return;
    }
    setLoading(true);
    try {
  const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullName })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Signup failed');
      setSuccess(true);
      setTimeout(() => navigate('/auth/login'), 1500);
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
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-1 text-purple-700">Create Account</h2>
          <p className="text-sm text-gray-500">Start your coding journey with ThinkCode</p>
        </div>
        {error && <div className="mb-4 text-red-500 text-sm text-center bg-red-50 border border-red-200 rounded p-2 animate-shake">{error}</div>}
        {success && <div className="mb-4 text-green-600 text-sm text-center bg-green-50 border border-green-200 rounded p-2 animate-pulse">Signup successful! Redirecting...</div>}
        <div className="relative mb-4">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Full Name"
            className="w-full pl-10 pr-3 p-3 border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            required
            autoComplete="name"
          />
        </div>
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
        <div className="relative mb-2">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 w-5 h-5" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full pl-10 pr-10 p-3 border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="new-password"
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
        {/* Password strength */}
        {password && (
          <div className={`mb-2 text-xs font-medium ${getPasswordStrength(password)==='Strong' ? 'text-green-600' : getPasswordStrength(password)==='Medium' ? 'text-yellow-600' : 'text-red-500'}`}>Password strength: {getPasswordStrength(password)}</div>
        )}
        <div className="relative mb-4">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 w-5 h-5" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            className="w-full pl-10 pr-10 p-3 border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-600"
            tabIndex={-1}
            onClick={() => setShowConfirmPassword(v => !v)}
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="terms"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            className="mr-2 accent-purple-500"
            required
          />
          <label htmlFor="terms" className="text-xs text-gray-600 select-none">I agree to the <a href="#" className="text-purple-600 underline">Terms and Conditions</a></label>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-lg shadow hover:opacity-90 transition text-lg tracking-wide disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        <div className="mt-6 text-center text-sm">
          Already have an account?{' '}
          <span className="text-purple-600 cursor-pointer underline font-medium" onClick={() => navigate('/auth/login')}>Login</span>
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

export default Signup;
