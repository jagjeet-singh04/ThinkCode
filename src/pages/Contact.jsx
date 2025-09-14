import React from "react";

const Contact = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-[#c9d1d9] px-4 py-16">
    <div className="max-w-3xl w-full p-8 rounded-2xl bg-[#161b22] shadow-xl border border-[#30363d]">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-[#58a6ff]">Contact Us</h1>
        <div className="w-20 h-1 bg-[#58a6ff] mx-auto mb-6"></div>
        <p className="text-lg text-[#8b949e]">
          Have questions or feedback? We'd love to hear from you!
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#58a6ff]">Get In Touch</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-[#c9d1d9] mb-1">General Support</h3>
              <a href="mailto:support@thinkcode.com" className="text-[#58a6ff] underline">
                support@thinkcode.com
              </a>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-[#c9d1d9] mb-1">Partnerships</h3>
              <a href="mailto:partners@thinkcode.com" className="text-[#58a6ff] underline">
                partners@thinkcode.com
              </a>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-[#c9d1d9] mb-1">Press Inquiries</h3>
              <a href="mailto:press@thinkcode.com" className="text-[#58a6ff] underline">
                press@thinkcode.com
              </a>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#58a6ff]">Office Hours</h2>
          <p className="text-lg text-[#8b949e] mb-4">
            Our team typically responds within 24-48 hours during business days.
          </p>
          
          <div className="bg-[#0d1117] p-4 rounded-lg border border-[#30363d]">
            <p className="text-[#8b949e]">
              <span className="font-medium text-[#c9d1d9]">Monday - Friday:</span> 9:00 AM - 6:00 PM PST
            </p>
            <p className="text-[#8b949e] mt-2">
              <span className="font-medium text-[#c9d1d9]">Weekends:</span> Limited availability
            </p>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-8 pt-6 border-t border-[#30363d]">
        <h3 className="text-xl font-semibold mb-4 text-[#58a6ff]">Follow Us</h3>
        <div className="flex justify-center space-x-6">
          <a href="#" className="text-[#8b949e] hover:text-[#58a6ff] transition-colors">
            Twitter
          </a>
          <a href="#" className="text-[#8b949e] hover:text-[#58a6ff] transition-colors">
            LinkedIn
          </a>
          <a href="#" className="text-[#8b949e] hover:text-[#58a6ff] transition-colors">
            GitHub
          </a>
          <a href="#" className="text-[#8b949e] hover:text-[#58a6ff] transition-colors">
            YouTube
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;