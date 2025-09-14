import React from "react";

const CaseStudies = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-[#c9d1d9] px-4 py-16">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#58a6ff] to-[#238636] bg-clip-text text-transparent">Case Studies</h1>
        <p className="max-w-xl mx-auto text-2xl text-[#8b949e] mb-8 font-semibold">Success Stories</p>
        <p className="max-w-xl mx-auto text-lg text-[#8b949e] mb-8">Discover how ThinkCode has helped developers achieve their career goals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {[1, 2].map((item) => (
          <div key={item} className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden hover:border-[#58a6ff] transition-all">
            <div className="h-48 bg-gradient-to-r from-[#58a6ff]/20 to-[#238636]/20 flex items-center justify-center">
              <div className="text-center p-4">
                <span className="text-4xl">📊</span>
                <p className="text-[#8b949e] mt-2">Case Study Visualization (Coming Soon)</p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[#58a6ff] rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">{item}</span>
                </div>
                <div>
                  <h3 className="font-semibold">Case Study Title (Coming Soon)</h3>
                  <p className="text-sm text-[#8b949e]">Software Engineer • Tech Company</p>
                </div>
              </div>
              <p className="text-[#8b949e] mb-4">Coming soon: Detailed case study showing how ThinkCode helped this developer master complex algorithms and land their dream job.</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#8b949e]">Read time: 5 min (Coming Soon)</span>
                <button className="text-[#58a6ff] hover:text-[#79b8ff] text-sm font-medium opacity-70 cursor-not-allowed">
                  Read Full Story →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold mb-6">Impact Metrics (Coming Soon)</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "92%", label: "Career Advancement" },
            { value: "4.8/5", label: "Satisfaction Rate" },
            { value: "300+", label: "Hours Saved" },
            { value: "100+", label: "Companies Reached" }
          ].map((metric, index) => (
            <div key={index} className="text-center p-4 bg-[#0d1117] rounded-lg">
              <div className="text-3xl font-bold text-[#58a6ff] mb-2">{metric.value}</div>
              <div className="text-[#8b949e] text-sm">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">More Case Studies Coming Soon</h2>
        <p className="text-[#8b949e] mb-6">We're continuously gathering success stories from our community.</p>
        <button className="px-6 py-3 bg-gradient-to-r from-[#238636] to-[#238636]/90 text-white font-medium rounded-lg hover:from-[#2ea043] hover:to-[#2ea043]/90 transition-all opacity-70 cursor-not-allowed">
          View All Case Studies (Coming Soon)
        </button>
      </div>
    </div>
  </div>
);

export default CaseStudies;