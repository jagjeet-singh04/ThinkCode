import React, { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Marquee } from "../components/magicui/marquee";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { 
  Code, Zap, Target, Trophy, ChevronRight, Sparkles, X, 
  Users, BookOpen, Clock, Shield, Star, Mail, Twitter, 
  Github, Linkedin, ArrowRight, Menu, Globe, Award,
  BarChart3, Heart, Calculator, Brain, MessageSquare
} from "lucide-react";
import Topbar from "../components/Topbar";
import { Meteors } from "../components/magicui/meteors"; // <-- Add this import
import { CardStack } from "../components/ui/card-stack"; // <-- Add this import
import { EvervaultCard } from "../components/ui/evervault-card";
import { SiPython, SiJavascript, SiOpenjdk, SiCplusplus } from "react-icons/si"; // Add this import

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showModeSelect, setShowModeSelect] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    }
  }, [user, navigate]);
  
  const handleStart = () => {
    navigate('/choose-path');
  };
  
  const handleBack = () => setShowModeSelect(false);
  const handleModeSelect = (mode) => {
    if (mode === "test") {
      navigate("/test");
    } else {
      navigate("/solve", { state: { mode } });
    }
  };

  const features = [
    {
      icon: <Code className="w-7 h-7 text-purple-400" />,
      title: "Smart Code Editor",
      description: "Multi-language support with syntax highlighting, auto-completion, and error detection.",
    },
    {
      icon: <Zap className="w-7 h-7 text-yellow-400" />,
      title: "AI-Powered Feedback",
      description: "Get instant evaluation and intelligent improvement tips from our advanced AI system.",
    },
    {
      icon: <Target className="w-7 h-7 text-green-400" />,
      title: "Targeted Practice",
      description: "Sharpen skills by topic, difficulty level, and specific problem patterns.",
    },
    {
      icon: <Trophy className="w-7 h-7 text-pink-400" />,
      title: "Test Mode",
      description: "Timed challenges that simulate real technical interviews with detailed performance reports.",
    },
    {
      icon: <BarChart3 className="w-7 h-7 text-blue-400" />,
      title: "Progress Analytics",
      description: "Track your improvement with detailed statistics and personalized recommendations.",
    },
    {
      icon: <BookOpen className="w-7 h-7 text-indigo-400" />,
      title: "Learning Resources",
      description: "Access curated study materials, algorithm explanations, and solution approaches.",
    },
    {
      icon: <Clock className="w-7 h-7 text-amber-400" />,
      title: "Time Management",
      description: "Practice with time constraints to improve your speed and efficiency.",
    },
    {
      icon: <Shield className="w-7 h-7 text-teal-400" />,
      title: "Secure Environment",
      description: "Code in a protected environment that prevents cheating and ensures fair practice.",
    },
  ];

  // Marquee reviews for the effect
  const reviews = [
    {
      name: "Bhavesh",
      username: "@Bhavesh",
      body: "I've never seen anything like this before. It's amazing. I love it.",
      img: "https://avatar.vercel.sh/jack",
    },
    {
      name: "Kislay",
      username: "@Kislay",
      body: "I don't know what to say. I'm speechless. This is amazing.",
      img: "https://avatar.vercel.sh/jill",
    },
    {
      name: "Ank",
      username: "@Ank",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/john",
    },
    {
      name: "Anurag",
      username: "@Anurag",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/jane",
    },
    {
      name: "Himansu",
      username: "@Himansu",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/jenny",
    },
    {
      name: "Aashutosh",
      username: "@Aashutosh",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/james",
    },
  ];
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);

  const ReviewCard = ({ img, name, username, body }) => (
    <figure
      className="relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4 border-[#30363d] bg-[#161b22] hover:bg-[#21262d] transition"
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-[#c9d1d9]">{name}</figcaption>
          <p className="text-xs font-medium text-[#8b949e]">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-[#c9d1d9]">{body}</blockquote>
    </figure>
  );

  const codingLanguages = [
    { name: "Python", icon: <SiPython className="text-[#3776AB] w-12 h-12" /> },
    { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E] w-12 h-12" /> },
    { name: "Java", icon: <SiOpenjdk className="text-[#007396] w-12 h-12" /> },
    { name: "C++", icon: <SiCplusplus className="text-[#00599C] w-12 h-12" /> },
  ];

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Testimonials", href: "/testimonials" },
        { name: "Pricing", href: "/pricing" },
        { name: "Case Studies", href: "/case-studies" },
        { name: "API", href: "/api" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/documentation" },
        { name: "Tutorials", href: "/tutorials" },
        { name: "Blog", href: "/blog" },
        { name: "Community", href: "/community" },
        { name: "Webinars", href: "/webinars" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about-us" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
        { name: "Press", href: "/press" },
        { name: "Partners", href: "/partners" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/support" },
        { name: "Status", href: "/status" },
        { name: "FAQs", href: "/faqs" },
        { name: "Email Support", href: "/email-support" },
        { name: "Live Chat", href: "/live-chat" },
      ],
    },
  ];

  const cardStackItems = [
    {
      id: 1,
      content: "“ThinkCode helped me land my dream job at a top tech company!”",
      name: "Bhavesh",
      designation: "Software Engineer, Google",
    },
    {
      id: 2,
      content: "“The AI feedback is next-level. I improved so much in just weeks.”",
      name: "Kislay",
      designation: "SDE, Amazon",
    },
    {
      id: 3,
      content: "“The best coding interview prep platform. Highly recommended!”",
      name: "Ank",
      designation: "Backend Developer, Microsoft",
    },
    {
      id: 4,
      content: "“Loved the analytics and progress tracking features!”",
      name: "Anurag",
      designation: "Full Stack Dev, Meta",
    },
    {
      id: 5,
      content: "“The community and resources are super helpful.”",
      name: "Himansu",
      designation: "Student, IIT",
    },
  ];

  return (
  <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-[#c9d1d9] flex flex-col">
      {/* Meteors background effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Meteors />
      </div>

      {/* Animated background elements */}
      <div className="absolute -top-40 -right-40 w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse z-0" />
      <div className="absolute -bottom-40 -left-40 w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-pink-500/20 rounded-full blur-[120px] animate-pulse z-0" />
      <div className="absolute top-1/4 left-1/4 w-40 h-40 sm:w-52 sm:h-52 bg-blue-500/15 rounded-full blur-[90px] animate-pulse delay-1000 z-0" />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* Animated floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Topbar for auth/profile navigation */}
      <div className="sticky top-0 left-0 w-full z-50">
        <Topbar />
      </div>

      <main className="relative z-10 flex-1 w-full flex flex-col items-center px-2 sm:px-4 md:px-6 py-8 md:py-16">
        {/* Hero Section */}
        <section className="w-full max-w-6xl mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <motion.div 
              className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-5 sm:mb-6 bg-gradient-to-tr from-purple-400/30 to-pink-400/30 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20 animate-float"
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Code className="w-10 h-10 sm:w-12 sm:h-12 text-purple-300" />
            </motion.div>

            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Master <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Coding Interviews</span>
            </motion.h1>

            <motion.p 
              className="text-base sm:text-lg text-white/80 max-w-md sm:max-w-2xl mx-auto leading-relaxed px-2 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              The all-in-one platform to prepare for technical interviews with AI-powered feedback, curated problems, and personalized learning paths.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="w-full max-w-xs sm:max-w-md mx-auto"
            >
              <Button
                onClick={handleStart}
                size="lg"
                className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold rounded-xl shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <span className="relative z-10">Start Your Journey</span>
                <ChevronRight className="ml-2 w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <motion.div 
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10"
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="w-full max-w-6xl mb-16 md:mb-24">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {[
              { number: "200+", label: "Coding Problems" },
              { number: "100+", label: "Users" },
              { number: "95%", label: "Success Rate" },
              { number: "50+", label: "Tech Companies" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-center"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm text-white/70 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="w-full max-w-6xl mb-16 md:mb-24">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Why Choose ThinkCode?</h2>
            <p className="text-white/70 max-w-2xl mx-auto">Our platform offers everything you need to ace your next technical interview</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 w-full px-1 sm:px-0">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 8px 32px 0 rgba(128,0,255,0.12)",
                }}
                className="relative group bg-gradient-to-br from-[#1a1333] via-[#181c2f] to-[#1a1333] border border-purple-900/30 rounded-2xl overflow-hidden shadow-lg transition-all duration-200 min-h-[240px] flex flex-col justify-center items-center p-6"
              >
                {/* Icon */}
                <div className="relative z-10 w-14 h-14 flex items-center justify-center mb-4 bg-white/10 rounded-xl shadow-lg">
                  {feature.icon}
                </div>
                {/* Title */}
                <h3 className="relative z-10 font-semibold text-lg mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {feature.title}
                </h3>
                {/* Description */}
                <p className="relative z-10 text-sm text-white/80 text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Supported Languages Section */}
        <section className="w-full max-w-6xl mb-16 md:mb-24">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Supported Languages</h2>
            <p className="text-white/70 max-w-2xl mx-auto">Practice in your preferred programming language</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            {codingLanguages.map((language, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 8px 32px 0 rgba(128,0,255,0.10)",
                }}
                className="relative group bg-gradient-to-br from-[#23272f] via-[#181c2f] to-[#23272f] border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center shadow-xl overflow-hidden"
              >
                {/* Icon */}
                <div className="relative z-10 mb-4">
                  {language.icon}
                </div>
                <span className="relative z-10 text-lg font-semibold text-white mb-1">{language.name}</span>
                {/* Animated underline on hover */}
                <span className="relative z-10 block h-1 w-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full max-w-6xl mb-16 md:mb-24">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-[#8b949e] max-w-2xl mx-auto">Join thousands of developers who have accelerated their career with ThinkCode</p>
          </motion.div>
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:20s] mb-2">
              {firstRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
              {secondRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#161b22] to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#161b22] to-transparent"></div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full max-w-4xl mb-16">
          <motion.div 
            className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/10 rounded-3xl p-8 md:p-12 text-center backdrop-blur-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to Ace Your Next Interview?</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">Join thousands of developers who have accelerated their career with ThinkCode</p>
            <Button
              onClick={handleStart}
              size="lg"
              className="h-12 sm:h-14 text-base sm:text-lg font-semibold rounded-xl shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <span className="relative z-10">Get Started Now</span>
              <ChevronRight className="ml-2 w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/20 backdrop-blur-xl border-t border-white/10 pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          {/* First row: Product, Resources, Company */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 md:mb-24">
            <div className="lg:col-span-1">
              <motion.div 
                className="flex items-center mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Code className="w-8 h-8 text-purple-400 mr-2" />
                <span className="text-xl font-bold">ThinkCode</span>
              </motion.div>
              <motion.p 
                className="text-white/70 text-sm mb-6 max-w-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                The premier platform for technical interview preparation with AI-powered feedback and personalized learning paths.
              </motion.p>
              <motion.div 
                className="flex space-x-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {[Twitter, Github, Linkedin].map((Icon, index) => (
                  <button key={index} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition">
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </motion.div>
            </div>

            {/* Only Product, Resources, Company */}
            {footerSections.slice(0, 3).map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              >
                <h3 className="font-semibold mb-4 text-lg">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {link.href.startsWith('/') ? (
                        <Link to={link.href} className="text-white/70 hover:text-white text-sm transition">
                          {link.name}
                        </Link>
                      ) : (
                        <a href={link.href} className="text-white/70 hover:text-white text-sm transition" target={link.href.startsWith('mailto:') ? undefined : '_blank'} rel="noopener noreferrer">
                          {link.name}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Second row: Support and CardStack */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-start">
            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="md:col-span-1 flex justify-start mb-8 md:mb-0"
            >
              <div>
                <h3 className="font-semibold mb-4 text-lg">{footerSections[3].title}</h3>
                <ul className="space-y-3">
                  {footerSections[3].links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {link.href.startsWith("/") ? (
                        <Link
                          to={link.href}
                          className="text-white/70 hover:text-white text-sm transition"
                        >
                          {link.name}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="text-white/70 hover:text-white text-sm transition"
                          target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                          rel="noopener noreferrer"
                        >
                          {link.name}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* CardStack centered in the middle column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-1 flex justify-center"
            >
              <div className="w-full max-w-xs sm:max-w-sm mx-auto">
                <CardStack items={cardStackItems} offset={16} scaleFactor={0.07} />
              </div>
            </motion.div>

            {/* Empty column for spacing on desktop */}
            <div className="hidden md:block md:col-span-1" />
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <motion.p 
              className="text-white/60 text-sm mb-4 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              © {new Date().getFullYear()} ThinkCode. All rights reserved.
            </motion.p>
            <motion.div 
              className="flex space-x-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <a href="#" className="text-white/60 hover:text-white text-sm transition">Privacy Policy</a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition">Terms of Service</a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition">Cookie Policy</a>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;