import React from "react";

const Support = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-[#c9d1d9] px-4 py-16">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#58a6ff] to-[#238636] bg-clip-text text-transparent">Support</h1>
        <p className="max-w-xl text-center text-2xl text-[#8b949e] mb-8 font-semibold">How can we help you?</p>
        <p className="max-w-xl text-center text-lg text-[#8b949e] mb-8">For any questions, feedback, or issues, please contact us at <a href="mailto:support@thinkcode.com" className="text-blue-400 underline">support@thinkcode.com</a> or use the form below (coming soon).</p>
      </div>
    </div>
  );
};

export default Support;
