import React from "react";

const Features = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-[#c9d1d9] px-4 py-16">
    <div className="flex flex-col items-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#58a6ff] to-[#238636] bg-clip-text text-transparent">Features</h1>
      <p className="max-w-xl text-center text-2xl text-[#8b949e] mb-8 font-semibold">Explore ThinkCode's Powerful Features</p>
      <ul className="list-disc text-lg text-[#8b949e] mb-8 pl-6">
        <li>Smart Code Editor with syntax highlighting</li>
        <li>AI-powered instant feedback</li>
        <li>Topic & difficulty-based practice</li>
        <li>Test mode for real interview simulation</li>
        <li>Progress analytics and personalized recommendations</li>
        <li>Curated learning resources</li>
        <li>Secure, distraction-free coding environment</li>
      </ul>
      <p className="max-w-xl text-center text-lg text-[#8b949e]">More features coming soon!</p>
    </div>
  </div>
);

export default Features;
