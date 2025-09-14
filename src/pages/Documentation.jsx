import React from "react";

export default function Documentation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-[#c9d1d9] px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#58a6ff] to-[#238636] bg-clip-text text-transparent">Documentation</h1>
          <p className="max-w-xl mx-auto text-2xl text-[#8b949e] mb-8 font-semibold">Comprehensive Guides & API References</p>
          <p className="max-w-xl mx-auto text-lg text-[#8b949e] mb-8">Everything you need to know about using ThinkCode effectively</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 hover:border-[#58a6ff] transition-all">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#58a6ff] rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold">Getting Started</h2>
            </div>
            <p className="text-[#8b949e] mb-4">Learn how to set up your account, navigate the platform, and start your first coding challenge.</p>
            <ul className="space-y-2 text-[#8b949e]">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-[#58a6ff] rounded-full mr-2"></span>
                <span>Creating your account (Coming Soon)</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-[#58a6ff] rounded-full mr-2"></span>
                <span>Platform overview (Coming Soon)</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-[#58a6ff] rounded-full mr-2"></span>
                <span>Your first challenge (Coming Soon)</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 hover:border-[#58a6ff] transition-all">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#238636] rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h2 className="text-xl font-bold">API Reference</h2>
            </div>
            <p className="text-[#8b949e] mb-4">Complete documentation for ThinkCode's API endpoints, parameters, and responses.</p>
            <ul className="space-y-2 text-[#8b949e]">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-[#238636] rounded-full mr-2"></span>
                <span>Authentication (Coming Soon)</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-[#238636] rounded-full mr-2"></span>
                <span>Questions endpoint (Coming Soon)</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-[#238636] rounded-full mr-2"></span>
                <span>User management (Coming Soon)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6">Topics (Coming Soon)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['JavaScript', 'Python', 'Algorithms', 'Data Structures', 'React', 'Node.js', 'SQL', 'System Design'].map((topic) => (
              <div key={topic} className="bg-[#0d1117] rounded-lg p-3 text-center">
                <div className="text-[#8b949e]">{topic}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Documentation Coming Soon</h2>
          <p className="text-[#8b949e] mb-6">We're working hard to create comprehensive documentation for ThinkCode.</p>
          <button className="px-6 py-3 bg-gradient-to-r from-[#238636] to-[#238636]/90 text-white font-medium rounded-lg hover:from-[#2ea043] hover:to-[#2ea043]/90 transition-all opacity-70 cursor-not-allowed">
            Notify Me When Ready
          </button>
        </div>
      </div>
    </div>
  );
}