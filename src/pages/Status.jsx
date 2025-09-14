import React from "react";

const Status = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-[#c9d1d9] px-4 py-16">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-[#58a6ff]">Platform Status</h1>
        <div className="w-20 h-1 bg-[#58a6ff] mx-auto mb-6"></div>
        <p className="text-lg text-[#8b949e]">
          Real-time information about ThinkCode's system status
        </p>
      </div>

      <div className="bg-[#161b22] rounded-2xl p-8 border border-[#30363d] mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-[#c9d1d9]">Current Status</h2>
          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
            All Systems Operational
          </span>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#0d1117] rounded-lg border border-[#30363d]">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-[#c9d1d9]">API Services</span>
            </div>
            <span className="text-[#8b949e] text-sm">Operational</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-[#0d1117] rounded-lg border border-[#30363d]">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-[#c9d1d9]">Code Execution</span>
            </div>
            <span className="text-[#8b949e] text-sm">Operational</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-[#0d1117] rounded-lg border border-[#30363d]">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-[#c9d1d9]">Database</span>
            </div>
            <span className="text-[#8b949e] text-sm">Operational</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-[#0d1117] rounded-lg border border-[#30363d]">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-[#c9d1d9]">Authentication</span>
            </div>
            <span className="text-[#8b949e] text-sm">Operational</span>
          </div>
        </div>
      </div>

      <div className="bg-[#161b22] rounded-2xl p-8 border border-[#30363d]">
        <h2 className="text-2xl font-semibold mb-6 text-[#c9d1d9]">Incident History</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-[#0d1117] rounded-lg border border-[#30363d]">
            <div className="flex items-center mb-2">
              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-medium mr-2">Resolved</span>
              <span className="text-[#8b949e] text-sm">March 12, 2023</span>
            </div>
            <h3 className="text-lg font-medium text-[#c9d1d9]">API Latency Issues</h3>
            <p className="text-[#8b949e] mt-1">Some users experienced increased latency with our API endpoints.</p>
          </div>
          
          <div className="p-4 bg-[#0d1117] rounded-lg border border-[#30363d]">
            <div className="flex items-center mb-2">
              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-medium mr-2">Resolved</span>
              <span className="text-[#8b949e] text-sm">February 28, 2023</span>
            </div>
            <h3 className="text-lg font-medium text-[#c9d1d9]">Scheduled Maintenance</h3>
            <p className="text-[#8b949e] mt-1">Regular maintenance to improve system performance.</p>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <a href="#" className="inline-flex items-center text-[#58a6ff] hover:underline">
            View full incident history
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Status;