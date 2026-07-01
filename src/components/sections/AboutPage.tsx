"use client";

import { motion } from "framer-motion";

// ================= CUSTOM INLINE SVGS =================
const GithubIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17A5.05 5.05 0 0 0 19 5.5A5.05 5.05 0 0 0 19 2.5s-1.4-.45-4.5 1.6a15.65 15.65 0 0 0-8 0C3.4 2.05 2 2.5 2 2.5a5.05 5.05 0 0 0 0 3a5.05 5.05 0 0 0-1.5 2.3c0 5.76 3.35 6.78 6.5 7.16A4.8 4.8 0 0 0 6 18v4"></path>
  </svg>
);

const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const MailIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const CodeIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const XIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4l16 16M20 4L4 20"></path>
  </svg>
);

const ArrowUpRightIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 7h10v10"></path>
    <path d="M17 7 7 17"></path>
  </svg>
);
// ======================================================

const MILESTONES = [
  { 
    year: "2024", 
    title: "BMS College of Engineering", 
    sub: "B.E. Computer Science. Building the foundation.", 
  },
  { 
    year: "Mar '26 - May '26", 
    title: "Full Stack Developer Intern", 
    sub: "Engineered core architecture and deployed full-stack features.", 
  },
  { 
    year: "May 2026", 
    title: "Eventara", 
    sub: "Campus Event Management System.", 
  },
  { 
    year: "Jun 2026", 
    title: "PlaceWise 2.0", 
    sub: "Launched version 2.0 with enhanced integration.", 
  },
  { 
    year: "Now", 
    title: "Open for Opportunities", 
    sub: "Seeking internships and product-focused engineering roles.", 
    badge: "Available" 
  },
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/vishnu062006", icon: GithubIcon },
  { label: "LinkedIn", href: "https://linkedin.com/in/vishnumashalkar", icon: LinkedinIcon },
  { label: "X", href: "https://x.com/BossGamerVishnu", icon: XIcon },
  { label: "LeetCode", href: "https://leetcode.com/u/VishnuMashalkar/", icon: CodeIcon },
  { label: "Email", href: "mailto:vishnumashalkar@gmail.com", icon: MailIcon },
];

const PROFILE_CARDS = [
  { 
    title: "What I Build", 
    body: "AI-assisted student tools, full-stack SaaS, and systems that scale." 
  },
  { 
    title: "The Execution", 
    body: "Turning scattered workflows into clear, automated product experiences." 
  },
  { 
    title: "Current Focus", 
    body: "RAG pipelines, FastAPI backends, and premium React interfaces." 
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] pt-32 pb-24 px-4 md:px-12 selection:bg-[#ededed] selection:text-[#0a0a0a]">
      
      {/* Minimalist Grid Lines */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-1/3 w-[1px] h-full bg-[#ededed]" />
        <div className="absolute top-0 right-1/3 w-[1px] h-full bg-[#ededed]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block border-[2px] border-[#ededed] px-4 py-1 mb-6 font-bold uppercase tracking-widest text-sm"
          >
            Builder Profile
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[10vw] md:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-8 max-w-4xl"
          >
            I design and ship useful systems.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-medium max-w-2xl border-l-[4px] border-[#ededed] pl-6 text-[#ededed]/80"
          >
            Computer science student at BMS College, focused on AI product engineering, full-stack systems, and startup-speed execution.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-32">
          
          {/* Identity Box & Socials */}
          <motion.div
            className="lg:col-span-5 border-[4px] border-[#ededed] bg-[#111] p-8 md:p-12 shadow-[12px_12px_0px_#ededed] flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="w-16 h-16 border-[4px] border-[#ededed] bg-[#ededed] text-[#0a0a0a] flex items-center justify-center font-black text-2xl mb-8">
                VM
              </div>
              <p className="font-bold uppercase tracking-widest text-sm text-[#ededed]/60 mb-2">AI Engineer + Product Builder</p>
              <h3 className="text-4xl font-black uppercase tracking-tight mb-8">Vishnu Mashalkar</h3>
            </div>

            <div className="flex flex-col gap-0 border-t-[4px] border-[#ededed] pt-8">
              {SOCIALS.map((social) => (
                <a 
                  key={social.label} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center justify-between py-4 border-b-[2px] border-[#ededed]/20 hover:border-[#ededed] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <social.icon size={20} />
                    <span className="font-bold uppercase text-sm tracking-wider">{social.label}</span>
                  </div>
                  <ArrowUpRightIcon size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Profile Panels */}
          <motion.div
            className="lg:col-span-7 flex flex-col gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            {PROFILE_CARDS.map((card) => (
              <motion.div
                key={card.title}
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  show: { opacity: 1, x: 0 },
                }}
                className="bg-[#111] border-[4px] border-[#ededed] p-8"
              >
                <p className="font-bold uppercase tracking-widest text-sm text-[#ededed]/60 mb-3">{card.title}</p>
                <h3 className="text-2xl font-medium leading-snug">{card.body}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Animated Vertical Timeline */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="mb-16">
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight">The Roadmap.</h3>
          </div>
          
          <div className="relative pl-6 md:pl-12">
            
            {/* The Animated Vertical Line */}
            <motion.div 
              className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#ededed]"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            <div className="flex flex-col gap-12 md:gap-16 pb-8">
              {MILESTONES.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[30px] md:-left-[54px] top-1 w-5 h-5 border-[4px] border-[#0a0a0a] bg-[#ededed] group-hover:scale-150 transition-transform duration-300 z-10" />
                  
                  <div className="bg-[#111] border-[4px] border-[#ededed] p-6 md:p-8 shadow-[8px_8px_0px_rgba(237,237,237,0.2)] hover:shadow-[12px_12px_0px_#ededed] hover:-translate-y-1 transition-all">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="inline-block bg-[#0a0a0a] text-[#ededed] border-[2px] border-[#ededed] px-3 py-1 text-xs font-bold uppercase">
                        {item.year}
                      </span>
                      {item.badge && (
                        <span className="inline-block bg-[#ededed] text-[#0a0a0a] border-[2px] border-[#0a0a0a] px-3 py-1 text-xs font-bold uppercase">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    
                    <h4 className="text-2xl md:text-3xl font-black uppercase leading-tight mb-2">{item.title}</h4>
                    <p className="text-base md:text-lg font-medium text-[#ededed]/80">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}