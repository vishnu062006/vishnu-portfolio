"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { projects } from "@/lib/tokens";

type Project = (typeof projects)[number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

// Brutalist Terminal Mockup replacing the soft glass version
function ProductMockup({ project }: { project: Project }) {
  return (
    <div className="w-full border-[4px] border-[#ededed] bg-[#111] shadow-[16px_16px_0px_#ededed] overflow-hidden group">
      
      {/* Terminal Topbar */}
      <div className="flex items-center gap-3 border-b-[4px] border-[#ededed] bg-[#0a0a0a] p-4 z-20 relative">
        <div className="w-4 h-4 border-2 border-[#ededed] bg-[#FF3366]" />
        <div className="w-4 h-4 border-2 border-[#ededed] bg-[#E2FF32]" />
        <div className="w-4 h-4 border-2 border-[#ededed] bg-[#00E5FF]" />
        <span className="ml-4 font-mono text-xs uppercase tracking-widest text-[#ededed]/50 hidden sm:block">
          SYS.VM / {project.id}.EXE
        </span>
      </div>

      {/* Terminal Body */}
      <div className="p-8 flex flex-col md:flex-row gap-8 relative overflow-hidden">
        {/* Abstract Background Accent */}
        <div className="absolute -right-20 -bottom-20 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
          <div className="w-64 h-64 border-[12px] border-[#E2FF32] rounded-full rotate-45" />
        </div>

        <aside className="md:w-1/3 flex flex-col gap-4 border-b-[4px] md:border-b-0 md:border-r-[4px] border-[#ededed] pb-8 md:pb-0 md:pr-8">
          <div className="w-16 h-16 border-[4px] border-[#ededed] bg-[#ededed] text-[#0a0a0a] flex items-center justify-center font-black text-3xl mb-4">
            {project.name.charAt(0)}
          </div>
          <div className="font-bold uppercase tracking-widest text-sm text-[#E2FF32]">Core Metric</div>
          <div className="text-5xl font-black tracking-tighter">
            {project.id === "placewise" ? "87" : project.id === "eventara" ? "12" : project.id === "campusmart" ? "48" : "24"}
            <span className="text-xl text-[#ededed]/50">x</span>
          </div>
          <div className="text-xs font-bold uppercase tracking-widest text-[#ededed]/50">{project.metric}</div>
        </aside>

        <main className="md:w-2/3 flex flex-col gap-6 relative z-10">
          <div className="flex justify-between items-end border-b-[2px] border-[#ededed]/20 pb-4">
            <span className="font-black text-2xl uppercase tracking-tight">{project.category}</span>
            <span className="border-[2px] border-[#ededed] px-2 py-1 text-xs font-bold uppercase bg-[#ededed] text-[#0a0a0a]">
              {project.status}
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            {project.highlights.slice(0, 4).map((item) => (
              <div key={item} className="border-[2px] border-[#ededed] bg-[#0a0a0a] p-4 text-sm font-bold uppercase tracking-wide">
                {item}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

// Brutalist Block Wrapper
function CaseBlock({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <motion.section
      className="border-[4px] border-[#ededed] bg-[#111] p-8 md:p-12 shadow-[8px_8px_0px_rgba(237,237,237,0.2)]"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="border-b-[4px] border-[#ededed] pb-6 mb-8">
        <p className="font-bold uppercase tracking-widest text-sm text-[#E2FF32] mb-3">{eyebrow}</p>
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-none">{title}</h2>
      </div>
      <div className="text-lg font-medium text-[#ededed]/80 leading-relaxed space-y-4">
        {children}
      </div>
    </motion.section>
  );
}

export default function ProjectCaseStudy({
  project,
  onBack,
}: {
  project: Project;
  onBack?: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] pt-32 pb-24 px-4 md:px-12 selection:bg-[#E2FF32] selection:text-[#0a0a0a]">
      
      {/* Minimalist Grid Lines */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-[#ededed]" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-[#ededed]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Navigation Back Row */}
        <div className="mb-12">
          {onBack ? (
            <button 
              type="button" 
              onClick={onBack} 
              className="group font-bold uppercase tracking-widest text-sm text-[#ededed] flex items-center gap-2"
            >
              <span className="text-[#E2FF32] group-hover:-translate-x-1 transition-transform">←</span> Back to Archive
            </button>
          ) : (
            <Link 
              href="/" 
              className="group font-bold uppercase tracking-widest text-sm text-[#ededed] flex items-center gap-2"
            >
              <span className="text-[#E2FF32] group-hover:-translate-x-1 transition-transform">←</span> Back to Projects
            </Link>
          )}
        </div>

        {/* Brutalist Hero Area */}
        <motion.header
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24 items-center"
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.div className="flex flex-col items-start" variants={fadeUp}>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className={`border-[2px] border-[#ededed] px-3 py-1 text-xs font-bold uppercase ${project.id === "placewise" ? "bg-[#00E5FF] border-[#00E5FF] text-[#0a0a0a]" : "bg-[#ededed] text-[#0a0a0a]"}`}>
                {project.category}
              </span>
              <span className="font-mono text-sm tracking-widest uppercase border-[2px] border-[#ededed] px-3 py-1">
                {project.year}
              </span>
              <span className="font-bold text-xs uppercase tracking-widest text-[#ededed]/60">
                {project.status}
              </span>
            </div>
            
            <h1 className="text-[12vw] lg:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-8">
              {project.name}
            </h1>
            
            <p className="text-2xl font-bold border-l-[4px] border-[#E2FF32] pl-6 mb-6">
              {project.impact}
            </p>
            
            <p className="text-lg font-medium text-[#ededed]/70 mb-10 max-w-xl">
              {project.does}
            </p>
            
            <div className="flex flex-wrap gap-4 w-full sm:w-auto">
              <a 
                href={project.demo} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full sm:w-auto text-center border-[4px] border-[#ededed] bg-[#E2FF32] text-[#0a0a0a] px-8 py-4 font-black uppercase tracking-wide hover:bg-[#ededed] transition-colors shadow-[6px_6px_0px_#ededed] hover:-translate-y-1 hover:translate-x-1 hover:shadow-none"
              >
                Live Deployment ↗
              </a>
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full sm:w-auto text-center border-[4px] border-[#ededed] bg-[#0a0a0a] text-[#ededed] px-8 py-4 font-black uppercase tracking-wide hover:bg-[#ededed] hover:text-[#0a0a0a] transition-colors shadow-[6px_6px_0px_#ededed] hover:-translate-y-1 hover:translate-x-1 hover:shadow-none"
              >
                Source Code
              </a>
            </div>
          </motion.div>
          
          <motion.div variants={fadeUp}>
            <ProductMockup project={project} />
          </motion.div>
        </motion.header>

        {/* Meta Data Row */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 border-y-[4px] border-[#ededed] py-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          {[
            ["Engineering Role", "Product engineering, interface design, full-stack architecture"],
            ["Tech Stack", project.stack.join(" / ")],
            ["Primary Focus", project.metric],
          ].map(([label, value], i) => (
            <motion.div key={label} className={`flex flex-col ${i !== 0 ? 'md:border-l-[4px] md:border-[#ededed] md:pl-6' : ''}`} variants={fadeUp}>
              <p className="font-bold uppercase tracking-widest text-sm text-[#ededed]/50 mb-3">{label}</p>
              <h3 className="text-xl font-black uppercase tracking-tight leading-snug">{value}</h3>
            </motion.div>
          ))}
        </motion.div>

        {/* Content Grids */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <CaseBlock eyebrow="Problem" title="The user problem">
            <p>{project.problem}</p>
          </CaseBlock>
          <CaseBlock eyebrow="How it works" title="From input to useful output">
            <p>{project.solution}</p>
          </CaseBlock>
        </div>

        {/* Full-width Preview */}
        <motion.section
          className="w-full mb-8 border-[4px] border-[#ededed] bg-[#111] p-8 md:p-16 shadow-[16px_16px_0px_rgba(237,237,237,0.2)]"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="text-center mb-12">
            <p className="font-bold uppercase tracking-widest text-sm text-[#E2FF32] mb-3">UI Preview</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Screenshots & Surface</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <ProductMockup project={project} />
          </div>
        </motion.section>

        {/* Architecture */}
        <div className="mb-8">
          <CaseBlock eyebrow="Tech Architecture" title="System overview">
            <div className="flex flex-col gap-4 mt-6">
              {project.architecture.map((item, index) => (
                <div key={item} className="flex items-start md:items-center gap-6 border-b-[2px] border-[#ededed]/20 pb-4 last:border-0">
                  <span className="font-black text-3xl text-[#E2FF32]/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong className="text-xl font-bold uppercase tracking-tight">{item}</strong>
                </div>
              ))}
            </div>
          </CaseBlock>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <CaseBlock eyebrow="Features" title="What the product does">
            <div className="flex flex-col gap-3">
              {project.highlights.map((item) => (
                <div key={item} className="border-l-[4px] border-[#ededed] pl-4 py-2 bg-[#0a0a0a] text-base font-bold uppercase">
                  {item}
                </div>
              ))}
            </div>
          </CaseBlock>
          <CaseBlock eyebrow="Challenges" title="Engineering tradeoffs">
            <div className="flex flex-col gap-3">
              {project.challenges.map((item) => (
                <div key={item} className="border-l-[4px] border-[#FF3366] pl-4 py-2 bg-[#0a0a0a] text-base font-bold uppercase">
                  {item}
                </div>
              ))}
            </div>
          </CaseBlock>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CaseBlock eyebrow="Impact / Use Case" title="What it delivers">
            <div className="flex flex-col gap-3">
              {project.outcomes.map((item) => (
                <div key={item} className="border-l-[4px] border-[#00E5FF] pl-4 py-2 bg-[#0a0a0a] text-base font-bold uppercase">
                  {item}
                </div>
              ))}
            </div>
          </CaseBlock>
          <CaseBlock eyebrow="Roadmap" title="Where it goes next">
            <div className="flex flex-col gap-3">
              {project.roadmap.map((item) => (
                <div key={item} className="border-l-[4px] border-[#ededed]/50 pl-4 py-2 bg-[#0a0a0a] text-base font-bold uppercase text-[#ededed]/70">
                  {item}
                </div>
              ))}
            </div>
          </CaseBlock>
        </div>

      </div>
    </div>
  );
}