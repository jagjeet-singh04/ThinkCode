import React from "react";

const HelpCenter = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-[#c9d1d9] px-4 py-16">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-[#58a6ff]">Help Center</h1>
        <div className="w-20 h-1 bg-[#58a6ff] mx-auto mb-6"></div>
        <p className="text-lg text-[#8b949e] max-w-2xl mx-auto">
          Find answers to common questions and get support for ThinkCode. We're here to help you succeed.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-[#161b22] rounded-xl border border-[#30363d] hover:border-[#58a6ff] transition-colors">
          <div className="text-3xl mb-4">📚</div>
          <h3 className="text-xl font-semibold mb-2 text-[#c9d1d9]">Documentation</h3>
          <p className="text-[#8b949e]">Browse our comprehensive guides and tutorials.</p>
        </div>
        
        <div className="p-6 bg-[#161b22] rounded-xl border border-[#30363d] hover:border-[#58a6ff] transition-colors">
          <div className="text-3xl mb-4">❓</div>
          <h3 className="text-xl font-semibold mb-2 text-[#c9d1d9]">FAQs</h3>
          <p className="text-[#8b949e]">Find answers to frequently asked questions.</p>
        </div>
        
        <div className="p-6 bg-[#161b22] rounded-xl border border-[#30363d] hover:border-[#58a6ff] transition-colors">
          <div className="text-3xl mb-4">💬</div>
          <h3 className="text-xl font-semibold mb-2 text-[#c9d1d9]">Community</h3>
          <p className="text-[#8b949e]">Join our community of developers.</p>
        </div>
      </div>

      <div className="bg-[#161b22] rounded-2xl p-8 border border-[#30363d]">
        <h2 className="text-2xl font-semibold mb-6 text-[#58a6ff]">Popular Help Topics</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-[#0d1117] rounded-lg border border-[#30363d]">
            <h3 className="text-lg font-medium text-[#c9d1d9]">How do I reset my password?</h3>
            <p className="text-[#8b949e] mt-1">Go to your account settings and click "Reset Password".</p>
          </div>
          
          <div className="p-4 bg-[#0d1117] rounded-lg border border-[#30363d]">
            <h3 className="text-lg font-medium text-[#c9d1d9]">What languages does ThinkCode support?</h3>
            <p className="text-[#8b949e] mt-1">We currently support Python, JavaScript, Java, C++, and more.</p>
          </div>
          
          <div className="p-4 bg-[#0d1117] rounded-lg border border-[#30363d]">
            <h3 className="text-lg font-medium text-[#c9d1d9]">How accurate is the AI feedback?</h3>
            <p className="text-[#8b949e] mt-1">Our AI has been trained on thousands of coding patterns and provides 95%+ accuracy.</p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <a href="#" className="inline-flex items-center text-[#58a6ff] hover:underline">
            View all help articles
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default HelpCenter;