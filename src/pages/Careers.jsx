import React from "react";

const Careers = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-[#c9d1d9] px-4 py-16">
    <div className="max-w-3xl w-full p-8 rounded-2xl bg-[#161b22] shadow-xl border border-[#30363d] text-center">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-[#58a6ff]">Careers at ThinkCode</h1>
        <div className="w-20 h-1 bg-[#58a6ff] mx-auto mb-6"></div>
      </div>
      
      <div className="mb-8 p-6 bg-[#0d1117] rounded-lg border border-[#30363d]">
        <div className="text-5xl mb-4">🚀</div>
        <h2 className="text-2xl font-semibold mb-4 text-[#58a6ff]">Coming Soon!</h2>
        <p className="text-lg text-[#8b949e] mb-4">
          We're not currently hiring, but we're growing fast! Check back soon for exciting 
          career opportunities at ThinkCode.
        </p>
        <p className="text-lg text-[#8b949e]">
          In the meantime, feel free to send your resume to{" "}
          <a href="mailto:careers@thinkcode.com" className="text-[#58a6ff] underline">
            careers@thinkcode.com
          </a>{" "}
          and we'll keep it on file for future openings.
        </p>
      </div>
      
      <div className="text-left mt-8">
        <h3 className="text-xl font-semibold mb-4 text-[#58a6ff]">Why Work With Us?</h3>
        <p className="text-lg text-[#8b949e] mb-4">
          When we do start hiring, we'll be looking for passionate individuals who want to 
          make a difference in the developer education space. Our values include:
        </p>
        <ul className="grid md:grid-cols-2 gap-3 text-[#8b949e]">
          <li className="flex items-center">
            <span className="text-[#58a6ff] mr-2">•</span>
            Innovation and creativity
          </li>
          <li className="flex items-center">
            <span className="text-[#58a6ff] mr-2">•</span>
            User-centric design
          </li>
          <li className="flex items-center">
            <span className="text-[#58a6ff] mr-2">•</span>
            Collaborative environment
          </li>
          <li className="flex items-center">
            <span className="text-[#58a6ff] mr-2">•</span>
            Continuous learning
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Careers;