import React, { useState } from "react";

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What programming languages does ThinkCode support?",
      answer: "ThinkCode currently supports Python, JavaScript, Java, C++, C#, Ruby, and Swift. We're continuously adding support for more languages based on user demand."
    },
    {
      question: "How does the AI feedback system work?",
      answer: "Our AI analyzes your code based on multiple factors including efficiency, readability, best practices, and edge case handling. It compares your solution against thousands of patterns to provide personalized feedback."
    },
    {
      question: "Can I use ThinkCode to prepare for specific companies?",
      answer: "Yes! We offer company-specific preparation paths for Google, Amazon, Facebook, Microsoft, Apple, and many other tech companies."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Our mobile app is currently in development and will be available for both iOS and Android devices in the coming months."
    },
    {
      question: "How often is new content added to the platform?",
      answer: "We add new questions and learning materials weekly. Our content team works constantly to keep our question bank updated with the latest interview trends."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-[#c9d1d9] px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-[#58a6ff]">Frequently Asked Questions</h1>
          <div className="w-20 h-1 bg-[#58a6ff] mx-auto mb-6"></div>
          <p className="text-lg text-[#8b949e]">
            Find answers to common questions about ThinkCode
          </p>
        </div>

        <div className="bg-[#161b22] rounded-2xl p-8 border border-[#30363d]">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-[#30363d] rounded-lg overflow-hidden">
                <button
                  className="flex justify-between items-center w-full p-4 text-left bg-[#0d1117] hover:bg-[#0d1117]/80 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-medium text-[#c9d1d9]">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${activeIndex === index ? 'transform rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {activeIndex === index && (
                  <div className="p-4 bg-[#161b22]">
                    <p className="text-[#8b949e]">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-[#0d1117] rounded-lg border border-[#30363d]">
            <h3 className="text-xl font-semibold mb-4 text-[#c9d1d9]">Still have questions?</h3>
            <p className="text-[#8b949e] mb-4">
              Can't find the answer you're looking for? Please reach out to our support team.
            </p>
            <a
              href="mailto:support@thinkcode.com"
              className="inline-flex items-center px-4 py-2 bg-[#58a6ff] text-white rounded-lg hover:bg-[#388bfd] transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;