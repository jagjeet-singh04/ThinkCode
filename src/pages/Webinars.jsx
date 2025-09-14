import React from "react";

export default function Webinars() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-[#c9d1d9] px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#58a6ff] to-[#238636] bg-clip-text text-transparent">Webinars</h1>
          <p className="max-w-xl mx-auto text-2xl text-[#8b949e] mb-8 font-semibold">Live Learning Sessions</p>
          <p className="max-w-xl mx-auto text-lg text-[#8b949e] mb-8">Join interactive sessions with industry experts and thought leaders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[1, 2].map((item) => (
            <div key={item} className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden hover:border-[#58a6ff] transition-all">
              <div className="h-48 bg-gradient-to-r from-[#58a6ff]/20 to-[#238636]/20 flex items-center justify-center">
                <div className="text-center p-4">
                  <span className="text-4xl">🎥</span>
                  <p className="text-[#8b949e] mt-2">Webinar Thumbnail (Coming Soon)</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-[#0d1117] text-[#8b949e] rounded-full text-xs">
                    {item === 1 ? "Live Session" : "Recorded"}
                  </span>
                  <span className="text-[#8b949e] text-sm">Coming Soon</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Webinar Title (Coming Soon)</h3>
                <p className="text-[#8b949e] mb-4">Coming soon: An interactive session with industry experts on relevant coding topics and trends.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-[#8b949e] mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-[#8b949e]">Date TBD</span>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-[#238636] to-[#238636]/90 text-white text-sm font-medium rounded-lg hover:from-[#2ea043] hover:to-[#2ea043]/90 transition-all opacity-70 cursor-not-allowed">
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6">Upcoming Webinars (Coming Soon)</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 bg-[#0d1117] rounded-lg">
                <div>
                  <h3 className="font-semibold">Webinar Title {item} (Coming Soon)</h3>
                  <p className="text-[#8b949e] text-sm">Date and time to be announced</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-[#238636] to-[#238636]/90 text-white text-sm font-medium rounded-lg hover:from-[#2ea043] hover:to-[#2ea043]/90 transition-all opacity-70 cursor-not-allowed">
                  Remind Me
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Webinars Coming Soon</h2>
          <p className="text-[#8b949e] mb-6">We're planning interactive sessions with industry experts.</p>
          <button className="px-6 py-3 bg-gradient-to-r from-[#238636] to-[#238636]/90 text-white font-medium rounded-lg hover:from-[#2ea043] hover:to-[#2ea043]/90 transition-all opacity-70 cursor-not-allowed">
            Get Notified
          </button>
        </div>
      </div>
    </div>
  );
}