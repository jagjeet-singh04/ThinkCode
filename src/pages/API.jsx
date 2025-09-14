import React from "react";

const API = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-[#c9d1d9] px-4 py-16">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#58a6ff] to-[#238636] bg-clip-text text-transparent">API Documentation</h1>
        <p className="max-w-xl mx-auto text-2xl text-[#8b949e] mb-8 font-semibold">Extend ThinkCode's Functionality</p>
        <p className="max-w-xl mx-auto text-lg text-[#8b949e] mb-8">Build integrations, custom tools, and enhance your coding experience with our API</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-[#58a6ff] rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h2 className="text-xl font-bold">API Endpoints (Coming Soon)</h2>
          </div>
          <p className="text-[#8b949e] mb-4">Access questions, user data, and coding challenges programmatically through our RESTful API.</p>
          <div className="bg-[#0d1117] rounded-lg p-4 mb-4">
            <code className="text-sm text-[#8b949e]">
              GET /api/v1/questions<br />
              GET /api/v1/questions/&#123;id&#125;<br />
              POST /api/v1/solutions<br />
              # More endpoints coming soon
            </code>
          </div>
          <button className="text-[#58a6ff] hover:text-[#79b8ff] text-sm font-medium opacity-70 cursor-not-allowed">
            View Full API Reference →
          </button>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-[#238636] rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold">SDKs & Libraries (Coming Soon)</h2>
          </div>
          <p className="text-[#8b949e] mb-4">Official client libraries for popular programming languages to simplify integration with our API.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {['JavaScript', 'Python', 'Java', 'Go', 'Ruby'].map((lang) => (
              <span key={lang} className="px-3 py-1 bg-[#0d1117] text-[#8b949e] rounded-md text-sm">
                {lang} (Coming Soon)
              </span>
            ))}
          </div>
          <button className="text-[#58a6ff] hover:text-[#79b8ff] text-sm font-medium opacity-70 cursor-not-allowed">
            Explore SDKs →
          </button>
        </div>
      </div>

      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold mb-6">API Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0d1117] rounded-lg p-4">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span className="font-medium">Development</span>
            </div>
            <p className="text-sm text-[#8b949e]">API is currently in development</p>
          </div>
          <div className="bg-[#0d1117] rounded-lg p-4">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="font-medium">Launch Schedule</span>
            </div>
            <p className="text-sm text-[#8b949e]">Planned for Q4 2023</p>
          </div>
          <div className="bg-[#0d1117] rounded-lg p-4">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="font-medium">Access</span>
            </div>
            <p className="text-sm text-[#8b949e]">Will be available to Pro users</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
        <p className="text-[#8b949e] mb-6">Get notified when our API is released and access early documentation.</p>
        <div className="max-w-md mx-auto flex">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-1 px-4 py-3 bg-[#0d1117] border border-[#30363d] rounded-l-lg text-white focus:outline-none focus:border-[#58a6ff]"
            disabled
          />
          <button className="px-6 py-3 bg-gradient-to-r from-[#238636] to-[#238636]/90 text-white font-medium rounded-r-lg hover:from-[#2ea043] hover:to-[#2ea043]/90 transition-all opacity-70 cursor-not-allowed">
            Notify Me
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default API;