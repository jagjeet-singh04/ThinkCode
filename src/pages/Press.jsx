import React from "react";

const Press = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-[#c9d1d9] px-4 py-16">
    <div className="max-w-4xl w-full p-8 rounded-2xl bg-[#161b22] shadow-xl border border-[#30363d]">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-[#58a6ff]">Press & Media</h1>
        <div className="w-20 h-1 bg-[#58a6ff] mx-auto mb-6"></div>
        <p className="text-lg text-[#8b949e]">
          Latest news, press releases, and media resources about ThinkCode
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#58a6ff]">Press Kit</h2>
          <p className="text-lg text-[#8b949e] mb-6">
            Download our press kit for logos, product images, and company information.
          </p>
          <button className="px-6 py-3 bg-[#58a6ff] text-white rounded-lg hover:bg-[#388bfd] transition-colors">
            Download Press Kit
          </button>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#58a6ff]">Contact</h2>
          <p className="text-lg text-[#8b949e] mb-4">
            For press inquiries, please contact our communications team:
          </p>
          <a href="mailto:press@thinkcode.com" className="text-[#58a6ff] underline text-lg">
            press@thinkcode.com
          </a>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6 text-[#58a6ff]">Latest News</h2>
        
        <div className="space-y-6">
          <div className="p-6 bg-[#0d1117] rounded-lg border border-[#30363d]">
            <h3 className="text-xl font-semibold mb-2 text-[#c9d1d9]">
              ThinkCode Raises $5M Series A to Expand AI-Powered Interview Platform
            </h3>
            <p className="text-[#8b949e] mb-3">March 15, 2023</p>
            <p className="text-[#8b949e]">
              ThinkCode today announced it has raised $5 million in Series A funding led by 
              Tech Ventures to expand its AI-powered technical interview preparation platform...
            </p>
            <a href="#" className="text-[#58a6ff] underline mt-2 inline-block">Read more</a>
          </div>
          
          <div className="p-6 bg-[#0d1117] rounded-lg border border-[#30363d]">
            <h3 className="text-xl font-semibold mb-2 text-[#c9d1d9]">
              ThinkCode Launches New Collaborative Coding Environment
            </h3>
            <p className="text-[#8b949e] mb-3">January 8, 2023</p>
            <p className="text-[#8b949e]">
              The new feature allows users to practice with friends and mentors in real-time, 
              simulating the pair programming experience common in technical interviews...
            </p>
            <a href="#" className="text-[#58a6ff] underline mt-2 inline-block">Read more</a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Press;