import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import TestSession from './pages/TestSession';
import './styles/index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/solve" element={<Home />} />
          <Route path="/test" element={<TestSession />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
