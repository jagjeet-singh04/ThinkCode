import React from "react";

const LiveChat = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-[#c9d1d9] px-4 py-16">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-[#58a6ff]">Live Chat Support</h1>
        <div className="w-20 h-1 bg-[#58a6ff] mx-auto mb-6"></div>
        <p className="text-lg text-[#8b949e]">
          Get instant help from our support team
        </p>
      </div>

      <div className="bg-[#161b22] rounded-2xl p-8 border border-[#30363d] mb-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-6">💬</div>
          <h2 className="text-2xl font-semibold mb-4 text-[#58a6ff]">Coming Soon!</h2>
          <p className="text-lg text-[#8b949e] mb-6">
            Our live chat feature is currently in development and will be available soon.
            We're working hard to bring you instant support directly through the platform.
          </p>
          <div className="bg-[#0d1117] p-4 rounded-lg border border-[#30363d] mb-6">
            <p className="text-[#8b949e]">
              <span className="font-medium text-[#c9d1d9]">Expected Launch:</span> Q3 2023
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#161b22] rounded-xl p-6 border border-[#30363d]">
          <h3 className="text-xl font-semibold mb-4 text-[#c9d1d9]">In the meantime</h3>
          <p className="text-[#8b949e] mb-4">
            While we work on launching live chat, you can still get support through:
          </p>
          <ul className="space-y-2 text-[#8b949e]">
            <li className="flex items-start">
              <span className="text-[#58a6ff] mr-2">•</span>
              <span>Email support: <a href="mailto:support@thinkcode.com" className="text-[#58a6ff] hover:underline">support@thinkcode.com</a></span>
            </li>
            <li className="flex items-start">
              <span className="text-[#58a6ff] mr-2">•</span>
              <span>Our comprehensive Help Center</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#58a6ff] mr-2">•</span>
              <span>FAQs with common questions</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#58a6ff] mr-2">•</span>
              <span>Community forums</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-[#161b22] rounded-xl p-6 border border-[#30363d]">
          <h3 className="text-xl font-semibold mb-4 text-[#c9d1d9]">What to expect</h3>
          <p className="text-[#8b949e] mb-4">
            Our upcoming live chat will feature:
          </p>
          <ul className="space-y-2 text-[#8b949e]">
            <li className="flex items-start">
              <span className="text-[#58a6ff] mr-2">•</span>
              <span>Instant connection with support agents</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#58a6ff] mr-2">•</span>
              <span>Code sharing capabilities</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#58a6ff] mr-2">•</span>
              <span>File attachment support</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#58a6ff] mr-2">•</span>
              <span>24/5 availability during business hours</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 bg-[#161b22] rounded-2xl p-8 border border-[#30363d] text-center">
        <h2 className="text-2xl font-semibold mb-4 text-[#c9d1d9]">Get Notified</h2>
        <p className="text-[#8b949e] mb-6">
          Want to be the first to know when live chat becomes available?
        </p>
        <div className="max-w-md mx-auto flex">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-l-lg text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff]"
          />
          <button className="px-4 py-2 bg-[#58a6ff] text-white rounded-r-lg hover:bg-[#388bfd] transition-colors">
            Notify Me
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default LiveChat;