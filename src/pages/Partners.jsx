import React from "react";

const Partners = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-[#c9d1d9] px-4 py-16">
    <div className="max-w-4xl w-full p-8 rounded-2xl bg-[#161b22] shadow-xl border border-[#30363d]">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-[#58a6ff]">Partnerships</h1>
        <div className="w-20 h-1 bg-[#58a6ff] mx-auto mb-6"></div>
        <p className="text-lg text-[#8b949e]">
          Join forces with ThinkCode to empower developers worldwide
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#58a6ff]">Why Partner With Us?</h2>
          <p className="text-lg text-[#8b949e] mb-6">
            ThinkCode offers partnership opportunities for educational institutions, 
            coding bootcamps, companies, and developer communities.
          </p>
          
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-[#58a6ff] mr-2">•</span>
              <span className="text-[#8b949e]">Expand your educational offerings</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#58a6ff] mr-2">•</span>
              <span className="text-[#8b949e]">Access to cutting-edge interview preparation technology</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#58a6ff] mr-2">•</span>
              <span className="text-[#8b949e]">Revenue sharing opportunities</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#58a6ff] mr-2">•</span>
              <span className="text-[#8b949e]">Co-marketing and brand exposure</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#58a6ff]">Partnership Programs</h2>
          
          <div className="mb-6 p-4 bg-[#0d1117] rounded-lg border border-[#30363d]">
            <h3 className="text-xl font-semibold mb-2 text-[#c9d1d9]">Education Partners</h3>
            <p className="text-[#8b949e]">
              Universities and coding bootcamps can integrate ThinkCode into their curriculum 
              to better prepare students for technical interviews.
            </p>
          </div>
          
          <div className="mb-6 p-4 bg-[#0d1117] rounded-lg border border-[#30363d]">
            <h3 className="text-xl font-semibold mb-2 text-[#c9d1d9]">Corporate Partners</h3>
            <p className="text-[#8b949e]">
              Companies can use ThinkCode for their hiring processes and employee development programs.
            </p>
          </div>
          
          <div className="p-4 bg-[#0d1117] rounded-lg border border-[#30363d]">
            <h3 className="text-xl font-semibold mb-2 text-[#c9d1d9]">Community Partners</h3>
            <p className="text-[#8b949e]">
              Developer communities and organizations can offer discounted access to their members.
            </p>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-8 pt-8 border-t border-[#30363d]">
        <h2 className="text-2xl font-semibold mb-4 text-[#58a6ff]">Get Started</h2>
        <p className="text-lg text-[#8b949e] mb-6">
          Interested in partnering with us? Reach out to our partnerships team:
        </p>
        <a 
          href="mailto:partners@thinkcode.com" 
          className="px-6 py-3 bg-[#58a6ff] text-white rounded-lg hover:bg-[#388bfd] transition-colors inline-block"
        >
          partners@thinkcode.com
        </a>
      </div>
    </div>
  </div>
);

export default Partners;