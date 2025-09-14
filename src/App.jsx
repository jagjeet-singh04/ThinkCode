import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import TestSession from './pages/TestSession';
import ChooseSection from './pages/ChooseSection';
import ChoosePath from './pages/ChoosePath';
import './styles/index.css';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import { AuthProvider } from './context/AuthContext';
import Profile from './pages/Profile';
import Learn from './pages/Learn';
import Community from './pages/Community';
import Settings from './pages/Settings';
import Support from './pages/Support';
import Testimonials from './pages/Testimonials';
import Pricing from './pages/Pricing';
import CaseStudies from './pages/CaseStudies';
import API from './pages/API';
import Features from './pages/Features';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/choose-path" element={<ChoosePath />} />
            <Route path="/choose-section" element={<ChooseSection />} />
            <Route path="/solve" element={<Home />} />
            <Route path="/test" element={<TestSession />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/community" element={<Community />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/support" element={<Support />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/api" element={<API />} />
            <Route path="/features" element={<Features />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
