"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Custom inline SVG for the brutalist aesthetic
const ArrowUpRightIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 7h10v10"></path>
    <path d="M17 7 7 17"></path>
  </svg>
);

const SOCIALS = [
  { label: "Email", val: "vishnumashalkar@gmail.com", href: "mailto:vishnumashalkar@gmail.com" },
  { label: "GitHub", val: "github.com/vishnu062006", href: "https://github.com/vishnu062006" },
  { label: "LinkedIn", val: "linkedin.com/in/vishnumashalkar", href: "https://linkedin.com/in/vishnumashalkar" },
];

const STARTERS = ["AI product idea", "Startup MVP", "Internship role", "Collaboration"];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] pt-32 pb-24 px-4 md:px-12 selection:bg-[#E2FF32] selection:text-[#0a0a0a]">
      
      {/* Minimalist Grid Lines */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-1/3 w-[1px] h-full bg-[#ededed]" />
        <div className="absolute top-0 right-1/3 w-[1px] h-full bg-[#ededed]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Massive Swiss Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block border-[2px] border-[#ededed] px-4 py-1 mb-6 font-bold uppercase tracking-widest text-sm"
          >
            Contact
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[10vw] md:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-8 max-w-4xl"
          >
            Let's Build Something.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-medium max-w-2xl border-l-[4px] border-[#E2FF32] pl-6 text-[#ededed]/80"
          >
            Open to internships, collaborations, and AI product roles.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Left Column: Command & Context */}
          <motion.div
            className="bg-[#111] border-[4px] border-[#ededed] p-8 md:p-12 shadow-[12px_12px_0px_#ededed] flex flex-col justify-between"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <p className="font-bold uppercase tracking-widest text-sm text-[#E2FF32] mb-4">The Context</p>
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6 leading-tight">
                Best conversations start with a real problem.
              </h3>
              <p className="text-lg font-medium text-[#ededed]/80 mb-12">
                Send the context, goal, and constraints. I will understand the product angle quickly.
              </p>

              {/* Starters Block */}
              <div className="mb-16">
                <span className="block font-bold uppercase tracking-widest text-sm text-[#ededed]/50 mb-4">Quick Starters:</span>
                <div className="flex flex-wrap gap-3">
                  {STARTERS.map((starter) => (
                    <button
                      key={starter}
                      type="button"
                      onClick={() => setForm((current) => ({ ...current, message: `I want to discuss a ${starter.toLowerCase()}...` }))}
                      className="border-[2px] border-[#ededed] px-4 py-2 text-sm font-bold uppercase hover:bg-[#ededed] hover:text-[#0a0a0a] hover:-translate-y-1 hover:shadow-[4px_4px_0px_#E2FF32] transition-all cursor-pointer bg-[#0a0a0a]"
                    >
                      {starter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-0 border-t-[4px] border-[#ededed] pt-8">
              {SOCIALS.map((social) => (
                <a 
                  key={social.label} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b-[2px] border-[#ededed]/20 hover:border-[#ededed] transition-colors"
                >
                  <span className="font-bold uppercase tracking-wider text-[#ededed]/60 group-hover:text-[#ededed] transition-colors">
                    {social.label}
                  </span>
                  <div className="flex items-center gap-4 mt-2 sm:mt-0">
                    <strong className="text-sm md:text-base font-black truncate max-w-[200px] md:max-w-none">{social.val}</strong>
                    <ArrowUpRightIcon size={24} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-[#E2FF32]" />
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Brutalist Form */}
          <motion.form
            className="bg-[#111] border-[4px] border-[#ededed] p-8 md:p-12 shadow-[12px_12px_0px_#ededed]"
            onSubmit={handle}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex flex-col gap-8">
              
              {(["name", "email"] as const).map((id) => (
                <div key={id} className="flex flex-col gap-3">
                  <label className="font-bold uppercase tracking-widest text-sm text-[#ededed]/80">
                    {id}
                  </label>
                  <input
                    type={id === "email" ? "email" : "text"}
                    required
                    placeholder={id === "email" ? "YOUR@EMAIL.COM" : "YOUR NAME"}
                    value={form[id]}
                    onChange={(e) => setForm((current) => ({ ...current, [id]: e.target.value }))}
                    className="w-full bg-[#0a0a0a] border-[4px] border-[#ededed] p-4 text-xl font-black uppercase placeholder:text-[#ededed]/20 focus:outline-none focus:bg-[#ededed] focus:text-[#0a0a0a] focus:border-[#E2FF32] transition-colors"
                  />
                </div>
              ))}

              <div className="flex flex-col gap-3">
                <label className="font-bold uppercase tracking-widest text-sm text-[#ededed]/80">
                  Message
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="Tell me what you want to build, improve, or hire for."
                  value={form.message}
                  onChange={(e) => setForm((current) => ({ ...current, message: e.target.value }))}
                  className="w-full bg-[#0a0a0a] border-[4px] border-[#ededed] p-4 text-lg font-bold placeholder:text-[#ededed]/20 focus:outline-none focus:bg-[#ededed] focus:text-[#0a0a0a] focus:border-[#E2FF32] transition-colors resize-y min-h-[160px]"
                />
              </div>

              {/* Brutalist Submit Button */}
              <motion.button
                type="submit"
                whileHover={sent ? {} : { scale: 1.02, boxShadow: "8px 8px 0px #E2FF32" }}
                whileTap={sent ? {} : { scale: 0.98, boxShadow: "0px 0px 0px #E2FF32", y: 4, x: 4 }}
                className={`mt-4 w-full border-[4px] p-6 text-2xl font-black uppercase tracking-wide flex items-center justify-center gap-4 transition-all duration-300 ${
                  sent 
                    ? "bg-[#00E5FF] border-[#00E5FF] text-[#0a0a0a] shadow-none" 
                    : "bg-[#E2FF32] border-[#ededed] text-[#0a0a0a]"
                }`}
              >
                {sent ? "Message Transmitted ✓" : "Let's Build"}
              </motion.button>
            </div>
          </motion.form>

        </div>
      </div>
    </div>
  );
}