import React from "react";

const Pricing = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-[#c9d1d9] px-4 py-16">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#58a6ff] to-[#238636] bg-clip-text text-transparent">Pricing</h1>
        <p className="max-w-xl mx-auto text-2xl text-[#8b949e] mb-8 font-semibold">Choose Your Plan</p>
        <p className="max-w-xl mx-auto text-lg text-[#8b949e] mb-8">Flexible options for developers at every stage of their journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { name: "Free", price: "$0", description: "For beginners getting started with coding" },
          { name: "Pro", price: "$15", description: "For serious developers building skills" },
          { name: "Team", price: "$45", description: "For teams and organizations" }
        ].map((plan, index) => (
          <div key={index} className="bg-[#161b22] border border-[#30363d] rounded-xl p-8 hover:border-[#58a6ff] transition-all">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline justify-center">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                <span className="text-[#8b949e] ml-1">/month</span>
              </div>
              <p className="text-[#8b949e] mt-2">{plan.description}</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              {[1, 2, 3, 4].map((item) => (
                <li key={item} className="flex items-center">
                  <svg className="w-5 h-5 text-[#238636] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#8b949e]">Feature {item} (Coming Soon)</span>
                </li>
              ))}
            </ul>
            
            <button className="w-full py-3 bg-gradient-to-r from-[#238636] to-[#238636]/90 text-white font-medium rounded-lg hover:from-[#2ea043] hover:to-[#2ea043]/90 transition-all opacity-70 cursor-not-allowed">
              Get Started (Coming Soon)
            </button>
          </div>
        ))}
      </div>

      <div className="text-center bg-[#161b22] border border-[#30363d] rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-4">Enterprise Solutions</h2>
        <p className="text-[#8b949e] mb-6">Need a custom plan for your organization? We offer tailored solutions for teams of all sizes.</p>
        <button className="px-6 py-3 bg-gradient-to-r from-[#58a6ff] to-[#58a6ff]/90 text-white font-medium rounded-lg hover:from-[#79b8ff] hover:to-[#79b8ff]/90 transition-all opacity-70 cursor-not-allowed">
          Contact Sales (Coming Soon)
        </button>
      </div>
    </div>
  </div>
);

export default Pricing;