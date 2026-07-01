"use client";

import { motion } from "framer-motion";

type Page = "home" | "projects" | "about" | "skills" | "contact";

interface FooterProps {
  onNavigate: (p: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const pages: Page[] = ["home", "projects", "about", "skills", "contact"];
  
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative z-10 bg-[#0a0a0a] border-t-[1px] border-[#ededed]/10 pt-16 pb-12 px-4 md:px-12 mt-20"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        
        {/* Branding & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <span className="font-black uppercase tracking-widest text-2xl text-[#ededed]">Sys.VM</span>
          <p className="font-mono text-xs text-[#ededed]/40 uppercase tracking-widest text-center md:text-left leading-relaxed">
            © 2026 <span className="text-[#E2FF32] font-bold">Vishnu Mashalkar</span>
            <br className="md:hidden" />
            <span className="hidden md:inline"> · </span> Built with Love using Next.js
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => onNavigate(p)}
              className="group relative text-xs md:text-sm font-bold uppercase tracking-widest text-[#ededed]/50 hover:text-[#ededed] transition-colors duration-300 cursor-pointer"
            >
              {p}
              {/* Hover Underline Animation */}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#E2FF32] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>
        
      </div>
    </motion.footer>
  );
}