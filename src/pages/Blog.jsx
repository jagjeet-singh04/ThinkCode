import React from "react";

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-[#c9d1d9] px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#58a6ff] to-[#238636] bg-clip-text text-transparent">Blog</h1>
          <p className="max-w-xl mx-auto text-2xl text-[#8b949e] mb-8 font-semibold">Insights & Updates</p>
          <p className="max-w-xl mx-auto text-lg text-[#8b949e] mb-8">Stay updated with the latest news, tips, and insights from ThinkCode</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[1, 2].map((item) => (
            <div key={item} className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden hover:border-[#58a6ff] transition-all">
              <div className="h-48 bg-gradient-to-r from-[#58a6ff]/20 to-[#238636]/20 flex items-center justify-center">
                <div className="text-center p-4">
                  <span className="text-4xl">📝</span>
                  <p className="text-[#8b949e] mt-2">Blog Image (Coming Soon)</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="px-3 py-1 bg-[#0d1117] text-[#8b949e] rounded-full text-xs">
                    {item === 1 ? "Programming Tips" : "Company News"}
                  </span>
                  <span className="mx-2 text-[#8b949e]">•</span>
                  <span className="text-[#8b949e] text-sm">Coming Soon</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Blog Post Title (Coming Soon)</h3>
                <p className="text-[#8b949e] mb-4">Coming soon: An insightful article about coding best practices, industry trends, or ThinkCode updates.</p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#58a6ff] rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">A</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Author Name</p>
                    <p className="text-xs text-[#8b949e]">ThinkCode Team</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 hover:border-[#58a6ff] transition-all">
              <h3 className="font-semibold mb-2">Blog Post Title {item} (Coming Soon)</h3>
              <p className="text-[#8b949e] text-sm mb-3">Coming soon: A brief excerpt from this upcoming blog post...</p>
              <div className="flex items-center text-[#8b949e] text-xs">
                <span>Apr 12, 2023</span>
                <span className="mx-2">•</span>
                <span>5 min read</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog Coming Soon</h2>
          <p className="text-[#8b949e] mb-6">We're preparing valuable content to help you on your coding journey.</p>
          <div className="max-w-md mx-auto flex">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-3 bg-[#0d1117] border border-[#30363d] rounded-l-lg text-white focus:outline-none focus:border-[#58a6ff]"
              disabled
            />
            <button className="px-6 py-3 bg-gradient-to-r from-[#238636] to-[#238636]/90 text-white font-medium rounded-r-lg hover:from-[#2ea043] hover:to-[#2ea043]/90 transition-all opacity-70 cursor-not-allowed">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}