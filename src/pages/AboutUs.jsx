import React from "react";

const AboutUs = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-[#c9d1d9] px-4 py-16">
    <div className="max-w-4xl w-full p-8 rounded-2xl bg-[#161b22] shadow-xl border border-[#30363d]">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-[#58a6ff]">About ThinkCode</h1>
        <div className="w-20 h-1 bg-[#58a6ff] mx-auto mb-6"></div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#58a6ff]">Our Mission</h2>
          <p className="text-lg text-[#8b949e] mb-6 leading-relaxed">
            ThinkCode is dedicated to revolutionizing technical interview preparation through 
            AI-powered feedback and personalized learning paths. We help developers of all 
            levels master coding interviews and advance their careers.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 text-[#58a6ff]">Our Story</h2>
          <p className="text-lg text-[#8b949e] mb-6 leading-relaxed">
            Founded in 2023 by a team of tech industry veterans and hiring managers, 
            ThinkCode was born from the frustration of seeing qualified candidates struggle 
            with interview formats rather than demonstrating their actual coding abilities.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#58a6ff]">What We Offer</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-[#58a6ff] mr-2">•</span>
              <span className="text-[#8b949e]">AI-powered coding interview simulations</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#58a6ff] mr-2">•</span>
              <span className="text-[#8b949e]">Personalized feedback on code quality and performance</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#58a6ff] mr-2">•</span>
              <span className="text-[#8b949e]">Comprehensive question bank with detailed solutions</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#58a6ff] mr-2">•</span>
              <span className="text-[#8b949e]">Performance analytics and progress tracking</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#58a6ff] mr-2">•</span>
              <span className="text-[#8b949e]">Community support and expert mentorship</span>
            </li>
          </ul>
          
          <div className="mt-8 p-4 bg-[#0d1117] rounded-lg border border-[#30363d]">
            <p className="text-[#8b949e] italic">
              "ThinkCode helped me land my dream job at Google. The AI feedback was incredibly 
              accurate and the practice environment felt just like the real interview."
            </p>
            <p className="text-[#58a6ff] mt-2">- Sarah Chen, Software Engineer at Google</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AboutUs;