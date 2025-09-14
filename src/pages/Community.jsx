import React, { useState } from "react";

const Community = () => {
  const [activeTab, setActiveTab] = useState("features");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-[#c9d1d9] px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#58a6ff] to-[#238636] bg-clip-text text-transparent">
            Community Hub
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-[#8b949e] mb-8">
            Connect with fellow developers, share knowledge, and grow together. Our community features are coming soon!
          </p>
          
          <div className="inline-flex rounded-md bg-[#0d1117] border border-[#30363d] p-1 mb-8">
            <button
              onClick={() => setActiveTab("features")}
              className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === "features" ? "bg-[#238636] text-white" : "text-[#c9d1d9] hover:bg-[#161b22]"}`}
            >
              Coming Features
            </button>
            <button
              onClick={() => setActiveTab("updates")}
              className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === "updates" ? "bg-[#238636] text-white" : "text-[#c9d1d9] hover:bg-[#161b22]"}`}
            >
              Updates
            </button>
            <button
              onClick={() => setActiveTab("subscribe")}
              className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === "subscribe" ? "bg-[#238636] text-white" : "text-[#c9d1d9] hover:bg-[#161b22]"}`}
            >
              Get Notified
            </button>
          </div>
        </div>

        {activeTab === "features" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 transition-all duration-300 hover:border-[#58a6ff] hover:translate-y-[-5px]">
              <div className="w-12 h-12 bg-[#238636] rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-[#58a6ff] mb-2">Discussion Forums</h2>
              <p className="text-[#c9d1d9] mb-4">Ask questions, help others, and discuss coding topics in our active forums.</p>
              <span className="inline-block px-3 py-1 bg-[#238636]/20 text-[#238636] text-xs font-medium rounded-full">
                Coming Soon
              </span>
            </div>

            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 transition-all duration-300 hover:border-[#58a6ff] hover:translate-y-[-5px]">
              <div className="w-12 h-12 bg-[#238636] rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-[#58a6ff] mb-2">Events & Contests</h2>
              <p className="text-[#c9d1d9] mb-4">Participate in coding competitions, webinars, and community events.</p>
              <span className="inline-block px-3 py-1 bg-[#238636]/20 text-[#238636] text-xs font-medium rounded-full">
                Coming Soon
              </span>
            </div>

            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 transition-all duration-300 hover:border-[#58a6ff] hover:translate-y-[-5px]">
              <div className="w-12 h-12 bg-[#238636] rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-[#58a6ff] mb-2">Leaderboard</h2>
              <p className="text-[#c9d1d9] mb-4">See top performers and get inspired by the community's achievements.</p>
              <span className="inline-block px-3 py-1 bg-[#238636]/20 text-[#238636] text-xs font-medium rounded-full">
                Coming Soon
              </span>
            </div>
          </div>
        )}

        {activeTab === "updates" && (
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-[#58a6ff] mb-6">Latest Updates</h2>
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#30363d]">
                <div className="flex items-center mb-2">
                  <span className="inline-block px-3 py-1 bg-[#238636]/20 text-[#238636] text-xs font-medium rounded-full mr-3">
                    Planning
                  </span>
                  <span className="text-sm text-[#8b949e]">June 15, 2023</span>
                </div>
                <h3 className="text-xl font-semibold text-[#c9d1d9] mb-2">Community Features in Development</h3>
                <p className="text-[#8b949e]">We're currently designing and developing our community platform. Expect initial features to roll out in Q4 2023.</p>
              </div>
              
              <div className="pb-4 border-b border-[#30363d]">
                <div className="flex items-center mb-2">
                  <span className="inline-block px-3 py-1 bg-[#58a6ff]/20 text-[#58a6ff] text-xs font-medium rounded-full mr-3">
                    Research
                  </span>
                  <span className="text-sm text-[#8b949e]">May 28, 2023</span>
                </div>
                <h3 className="text-xl font-semibold text-[#c9d1d9] mb-2">Community Feedback Gathering</h3>
                <p className="text-[#8b949e]">We've been collecting feedback from our users about what community features they'd find most valuable.</p>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <span className="inline-block px-3 py-1 bg-[#8b949e]/20 text-[#8b949e] text-xs font-medium rounded-full mr-3">
                    Announcement
                  </span>
                  <span className="text-sm text-[#8b949e]">April 10, 2023</span>
                </div>
                <h3 className="text-xl font-semibold text-[#c9d1d9] mb-2">Community Platform Announcement</h3>
                <p className="text-[#8b949e]">We're excited to announce that we'll be launching a community platform to help developers connect and learn together!</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "subscribe" && (
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-[#58a6ff] mb-2">Get Notified When We Launch</h2>
            <p className="text-[#8b949e] mb-6">Be the first to know when our community features go live!</p>
            
            <form className="space-y-4 max-w-md">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#c9d1d9] mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md py-2 px-3 text-[#c9d1d9] focus:outline-none focus:ring-2 focus:ring-[#58a6ff]" 
                  placeholder="you@example.com"
                />
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="updates" 
                  className="h-4 w-4 text-[#58a6ff] bg-[#0d1117] border-[#30363d] rounded focus:ring-[#58a6ff]"
                />
                <label htmlFor="updates" className="ml-2 block text-sm text-[#8b949e]">
                  Also notify me about platform updates and new features
                </label>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-[#238636] to-[#2ea043] text-white font-medium py-2 px-4 rounded-md hover:from-[#2ea043] hover:to-[#3fb950] transition-all duration-200"
              >
                Notify Me on Launch
              </button>
            </form>
          </div>
        )}

        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#c9d1d9] mb-4">Join Our Growing Community</h2>
          <p className="max-w-2xl mx-auto text-[#8b949e] mb-6">
            While we're building our integrated community platform, you can still connect with us through these channels:
          </p>
          
          <div className="flex justify-center space-x-4">
            <a href="#" className="inline-flex items-center text-sm text-[#58a6ff] hover:underline">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              GitHub Discussions
            </a>
            
            <a href="#" className="inline-flex items-center text-sm text-[#58a6ff] hover:underline">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
              </svg>
              Discord Server
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;