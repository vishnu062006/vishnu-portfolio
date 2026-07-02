"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RESPONSES: Record<string, string> = {
  "who are you?": "Hey! I'm Vishnu Mashalkar — a Product Engineer who enjoys building AI-powered products and scalable full-stack applications. I love turning ideas into polished, production-ready software.",
  "projects": "I've built products like PlaceWise (AI placement readiness platform), Eventara (campus event management system), Campus Mart, and more. Head over to the Projects section to explore live demos and source code.",
  "resume": "You can download my latest resume from the Hero section. It covers my projects, internship experience, tech stack, and achievements in one place.",
  "skills": "My toolkit includes Next.js, React, TypeScript, FastAPI, Spring Boot, PostgreSQL, MongoDB, ChromaDB, REST APIs, RAG pipelines, and modern AI application development.",
  "contact": "Let's build something awesome! Reach me at vishnumashalkar@gmail.com or connect with me on LinkedIn. I usually reply within a day.",
  "default": "I can tell you about my projects, skills, experience, resume, PlaceWise, or how to get in touch. Give one of those a try!"
};

export default function TerminalAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{role: "user" | "sys", text: string}[]>([
    { role: "sys", text: "Hey! I'm Vishnu's AI assistant. Ask me anything about his work, skills, or background." }
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, open]);

  const handleCommand = (cmd: string) => {
    if (!cmd.trim()) return;
    const newHistory = [...history, { role: "user" as const, text: cmd }];
    setHistory(newHistory);
    setInput("");

    // Simulate natural typing delay
    setTimeout(() => {
      const response = RESPONSES[cmd.toLowerCase()] || RESPONSES["default"];
      setHistory(prev => [...prev, { role: "sys", text: response }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
      
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-[340px] md:w-[380px] h-[500px] bg-[#0a0a0a] border-[4px] border-[#ededed] shadow-[8px_8px_0px_rgba(237,237,237,0.5)] mb-4 flex flex-col overflow-hidden pointer-events-auto"
          >
            {/* Header */}
            <div className="bg-[#ededed] text-[#0a0a0a] px-4 py-3 flex justify-between items-center border-b-[4px] border-[#0a0a0a]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF3366] animate-pulse" />
                <span className="font-black uppercase tracking-widest text-sm">Ask Vishnu</span>
              </div>
              <button 
                onClick={() => setOpen(false)} 
                className="hover:bg-[#0a0a0a] hover:text-[#ededed] w-6 h-6 flex items-center justify-center font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Chat Screen */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-hide bg-[#111]">
              {history.map((msg, i) => (
                <div 
                  key={i} 
                  className={`p-3 text-sm font-medium leading-relaxed max-w-[85%] ${
                    msg.role === "user" 
                      ? "bg-[#E2FF32] text-[#0a0a0a] self-end rounded-tl-xl rounded-tr-xl rounded-bl-xl border-[2px] border-[#0a0a0a]" 
                      : "bg-[#222] text-[#ededed] self-start rounded-tr-xl rounded-bl-xl rounded-br-xl border-[2px] border-[#ededed]/20"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Quick Prompts (Suggested Questions) */}
            <div className="flex flex-wrap gap-2 px-4 py-3 bg-[#111] border-t-[2px] border-[#ededed]/10">
              {["who are you?", "projects", "skills", "contact"].map(cmd => (
                <button 
                  key={cmd}
                  onClick={() => handleCommand(cmd)}
                  className="text-xs font-bold bg-[#222] text-[#ededed] border-[2px] border-[#ededed]/20 px-3 py-1.5 rounded-full hover:bg-[#ededed] hover:text-[#0a0a0a] hover:border-[#ededed] transition-all"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="border-t-[4px] border-[#ededed] p-3 bg-[#0a0a0a] flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCommand(input)}
                placeholder="Message Vishnu..."
                className="flex-1 bg-transparent border-none outline-none text-[#ededed] text-sm px-2 placeholder:text-[#ededed]/40"
              />
              <button 
                onClick={() => handleCommand(input)}
                className="bg-[#ededed] text-[#0a0a0a] px-3 py-1.5 font-bold text-sm uppercase tracking-wider hover:bg-[#E2FF32] transition-colors"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-[#ededed] border-[3px] border-[#0a0a0a] text-[#0a0a0a] rounded-full flex items-center justify-center shadow-[4px_4px_0px_#ededed] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#E2FF32] hover:bg-[#E2FF32] transition-all pointer-events-auto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </motion.button>
    </div>
  );
}