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
import Documentation from './pages/Documentation';
import Tutorials from './pages/Tutorials';
import Blog from './pages/Blog';
import Webinars from './pages/Webinars';
import AboutUs from './pages/AboutUs';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Press from './pages/Press';
import Partners from './pages/Partners';
import HelpCenter from './pages/HelpCenter';
import Status from './pages/Status';
import Faqs from './pages/Faqs';
import EmailSupport from './pages/EmailSupport';
import LiveChat from './pages/LiveChat';

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
            <Route path="/support" element={<HelpCenter />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/api" element={<API />} />
            <Route path="/features" element={<Features />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/webinars" element={<Webinars />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/press" element={<Press />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/status" element={<Status />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/email-support" element={<EmailSupport />} />
            <Route path="/live-chat" element={<LiveChat />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
