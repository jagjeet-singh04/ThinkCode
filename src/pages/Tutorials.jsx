import React from "react";

export default function Tutorials() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-[#c9d1d9] px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#58a6ff] to-[#238636] bg-clip-text text-transparent">Tutorials</h1>
          <p className="max-w-xl mx-auto text-2xl text-[#8b949e] mb-8 font-semibold">Step-by-Step Learning Guides</p>
          <p className="max-w-xl mx-auto text-lg text-[#8b949e] mb-8">Master coding concepts with our comprehensive tutorials</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { level: "Beginner", title: "Introduction to Algorithms", duration: "45 min", color: "from-green-500 to-green-600" },
            { level: "Intermediate", title: "Data Structures Deep Dive", duration: "1.5 hours", color: "from-yellow-500 to-yellow-600" },
            { level: "Advanced", title: "System Design Patterns", duration: "2 hours", color: "from-red-500 to-red-600" }
          ].map((tutorial, index) => (
            <div key={index} className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden hover:border-[#58a6ff] transition-all">
              <div className={`h-3 bg-gradient-to-r ${tutorial.color}`}></div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-[#0d1117] text-[#8b949e] rounded-full text-xs mb-4">
                  {tutorial.level}
                </span>
                <h3 className="text-xl font-bold mb-2">{tutorial.title}</h3>
                <div className="flex items-center text-[#8b949e] mb-4">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{tutorial.duration} (Coming Soon)</span>
                </div>
                <p className="text-[#8b949e] mb-4">Coming soon: A comprehensive tutorial that will help you master this topic with practical examples and exercises.</p>
                <button className="w-full py-2 bg-gradient-to-r from-[#238636] to-[#238636]/90 text-white font-medium rounded-lg hover:from-[#2ea043] hover:to-[#2ea043]/90 transition-all opacity-70 cursor-not-allowed">
                  Start Learning
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6">Learning Paths (Coming Soon)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Frontend Developer", progress: "0%", color: "bg-blue-500" },
              { title: "Backend Specialist", progress: "0%", color: "bg-green-500" },
              { title: "Full Stack Master", progress: "0%", color: "bg-purple-500" },
              { title: "Algorithm Expert", progress: "0%", color: "bg-yellow-500" }
            ].map((path, index) => (
              <div key={index} className="bg-[#0d1117] rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{path.title}</h3>
                  <span className="text-[#8b949e] text-sm">{path.progress}</span>
                </div>
                <div className="w-full bg-[#161b22] rounded-full h-2">
                  <div className={`${path.color} h-2 rounded-full`} style={{ width: path.progress }}></div>
                </div>
                <div className="text-[#8b949e] text-sm mt-2">Coming soon: Structured learning path with tutorials and projects</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Tutorials Coming Soon</h2>
          <p className="text-[#8b949e] mb-6">We're creating high-quality tutorials to help you master coding concepts.</p>
          <button className="px-6 py-3 bg-gradient-to-r from-[#238636] to-[#238636]/90 text-white font-medium rounded-lg hover:from-[#2ea043] hover:to-[#2ea043]/90 transition-all opacity-70 cursor-not-allowed">
            Get Notified
          </button>
        </div>
      </div>
    </div>
  );
}