import React from "react";

const EmailSupport = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-[#c9d1d9] px-4 py-16">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-[#58a6ff]">Email Support</h1>
        <div className="w-20 h-1 bg-[#58a6ff] mx-auto mb-6"></div>
        <p className="text-lg text-[#8b949e]">
          Get in touch with our support team for assistance
        </p>
      </div>

      <div className="bg-[#161b22] rounded-2xl p-8 border border-[#30363d] mb-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-[#c9d1d9]">Contact Options</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-[#0d1117] rounded-lg border border-[#30363d]">
                <h3 className="text-lg font-medium mb-2 text-[#c9d1d9]">General Support</h3>
                <a href="mailto:support@thinkcode.com" className="text-[#58a6ff] hover:underline">
                  support@thinkcode.com
                </a>
                <p className="text-[#8b949e] text-sm mt-2">For general questions and technical support</p>
              </div>
              
              <div className="p-4 bg-[#0d1117] rounded-lg border border-[#30363d]">
                <h3 className="text-lg font-medium mb-2 text-[#c9d1d9]">Billing Questions</h3>
                <a href="mailto:billing@thinkcode.com" className="text-[#58a6ff] hover:underline">
                  billing@thinkcode.com
                </a>
                <p className="text-[#8b949e] text-sm mt-2">For subscription and payment inquiries</p>
              </div>
              
              <div className="p-4 bg-[#0d1117] rounded-lg border border-[#30363d]">
                <h3 className="text-lg font-medium mb-2 text-[#c9d1d9]">Security Issues</h3>
                <a href="mailto:security@thinkcode.com" className="text-[#58a6ff] hover:underline">
                  security@thinkcode.com
                </a>
                <p className="text-[#8b949e] text-sm mt-2">To report security vulnerabilities</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-[#c9d1d9]">What to Include</h2>
            
            <div className="p-6 bg-[#0d1117] rounded-lg border border-[#30363d]">
              <ul className="space-y-3 text-[#8b949e]">
                <li className="flex items-start">
                  <span className="text-[#58a6ff] mr-2">•</span>
                  <span>Your account email address</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#58a6ff] mr-2">•</span>
                  <span>A detailed description of your issue</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#58a6ff] mr-2">•</span>
                  <span>Screenshots if applicable</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#58a6ff] mr-2">•</span>
                  <span>Error messages you've encountered</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#58a6ff] mr-2">•</span>
                  <span>Steps to reproduce the issue</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-6 p-6 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <h3 className="text-lg font-medium mb-2 text-[#58a6ff]">Response Time</h3>
              <p className="text-[#8b949e]">
                We typically respond to all support emails within 24 hours on business days.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#161b22] rounded-2xl p-8 border border-[#30363d] text-center">
        <h2 className="text-2xl font-semibold mb-4 text-[#c9d1d9]">Before You Contact Us</h2>
        <p className="text-[#8b949e] mb-6">
          You might find instant answers in our Help Center or FAQ sections.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#" className="px-4 py-2 bg-[#30363d] text-[#c9d1d9] rounded-lg hover:bg-[#58a6ff] hover:text-white transition-colors">
            Visit Help Center
          </a>
          <a href="#" className="px-4 py-2 bg-[#30363d] text-[#c9d1d9] rounded-lg hover:bg-[#58a6ff] hover:text-white transition-colors">
            Browse FAQs
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default EmailSupport;