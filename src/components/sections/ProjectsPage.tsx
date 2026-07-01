"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { tokens, projects } from "@/lib/tokens";
import Badge from "@/components/ui/Badge";

const brutalColors = ["#00E5FF", "#E2FF32", "#FF3366", "#B5A1FF"];

function ProjectCard({ project, onClick, index, total }: {
  project: (typeof projects)[number];
  onClick?: () => void;
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const shadowColor = brutalColors[index % brutalColors.length];

  // Dynamic top offset so they stack like a deck of cards (e.g., 120px, 160px, 200px)
  const stickyTop = `calc(12vh + ${index * 40}px)`;

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col lg:flex-row bg-[#0a0a0a] border-[4px] border-[#ededed] cursor-pointer w-full mb-[20vh] origin-top"
      style={{ 
        position: "sticky",
        top: stickyTop,
        zIndex: 10 + index, // Ensures the next card stacks ON TOP of the previous
        boxShadow: `12px 12px 0px 0px ${shadowColor}`
      }}
      onClick={onClick}
    >
      {/* Left Column: Data & Actions */}
      <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col border-b-[4px] lg:border-b-0 lg:border-r-[4px] border-[#ededed] bg-[#111]">
        <div className="flex justify-between items-start mb-8">
          <Badge variant="default" className="bg-[#ededed] text-[#0a0a0a] font-black border-2 border-[#ededed] uppercase">
            {project.category}
          </Badge>
          <span className="font-black text-xl text-[#ededed]/40">0{index + 1} // {project.year}</span>
        </div>

        <h3 className="text-4xl md:text-5xl font-black uppercase leading-tight mb-4 text-[#ededed] group-hover:text-[#E2FF32] transition-colors duration-300">
          {project.name}
        </h3>
        <p className="text-xl font-bold border-l-[4px] border-[#ededed] pl-4 mb-8 text-[#ededed]/90 group-hover:border-[#E2FF32] transition-colors duration-300">
          {project.impact}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 flex-grow">
          <div className="flex flex-col gap-2">
            <span className="font-bold uppercase tracking-widest text-xs text-[#ededed]/50">Problem</span>
            <p className="text-sm font-medium text-[#ededed]/80">{project.problem}</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold uppercase tracking-widest text-xs text-[#ededed]/50">Solution</span>
            <p className="text-sm font-medium text-[#ededed]/80">{project.does}</p>
          </div>
        </div>

        {/* Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.stack?.slice(0, 4).map((tech) => (
            <span key={tech} className="border-[2px] border-[#ededed]/30 px-3 py-1 text-xs font-bold uppercase bg-[#0a0a0a] text-[#ededed]/70">
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-auto">
          <button 
            className="flex-1 border-[4px] border-[#ededed] py-4 font-black uppercase text-center bg-[#ededed] text-[#0a0a0a] group-hover:bg-[#E2FF32] group-hover:border-[#E2FF32] transition-colors"
            onClick={(e) => { e.stopPropagation(); onClick?.(); }}
          >
            Case Study
          </button>
          <a 
            href={project.demo || "#"} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-6 border-[4px] border-[#ededed] flex items-center justify-center font-black bg-[#0a0a0a] text-[#ededed] hover:bg-[#ededed] hover:text-[#0a0a0a] transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            ↗
          </a>
        </div>
      </div>

      {/* Right Column: Image Reveal Window */}
      <div className="w-full lg:w-1/2 h-[400px] lg:h-auto relative overflow-hidden bg-[#0a0a0a]">
        
        {/* State 1: The Idle Brutalist Number */}
        <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-500 z-10 bg-[#0a0a0a]">
          <span className="text-[15vw] lg:text-[10vw] font-black text-[#ededed]/10 select-none">
            0{index + 1}
          </span>
          {/* Abstract Wireframe Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBWNDBoLTQweiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPjxwYXRoIGQ9Ik0zOS41IDB2NDBoLjVWMGgtLjV6IiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PC9zdmc+')] opacity-50 pointer-events-none" />
        </div>

        {/* State 2: The Hover Image Reveal */}
        {/* NOTE: Make sure you put an image named 'sample-project.jpg' (or .png) inside your public folder */}
        <img 
          src={project.image}
          alt={`${project.name} UI Preview`}
          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-100 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-20"
        />
        
        {/* Acid Yellow Inner Border on Hover */}
        <div className="absolute inset-0 border-[8px] border-[#E2FF32] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30 pointer-events-none" />
      </div>

    </motion.article>
  );
}

export default function ProjectsPage({ onNavigate }: { onNavigate: (p: string) => void }) {
  const router = useRouter();

  return (
    // CRITICAL: Removed 'overflow-hidden' from main wrapper so position: sticky works
    <div className="relative min-h-screen bg-[#0a0a0a] text-[#ededed] pt-32 pb-24 px-4 md:px-12 selection:bg-[#E2FF32] selection:text-[#0a0a0a]">
      
      {/* Minimalist Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-[#ededed]" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-[#ededed]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Minimalist Swiss Header */}
        <div className="mb-32 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block border-[2px] border-[#ededed] px-4 py-1 mb-6 font-bold uppercase tracking-widest text-sm"
          >
            The Archive
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[12vw] md:text-8xl font-black uppercase leading-[0.85] tracking-tighter mb-8 text-[#ededed]"
          >
            Featured<br/>Deployments.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-medium border-l-[4px] border-[#E2FF32] pl-6 text-[#ededed]/80"
          >
            Startup-grade product showcases. A focused collection of AI, SaaS, marketplace, and career products built with product thinking, systems design, and extreme motion UI.
          </motion.p>
        </div>

        {/* The Stacking Deck Wrapper */}
        <div className="relative w-full pb-[10vh]">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
              onClick={() => router.push(`/projects/${project.slug}`)}
            />
          ))}
        </div>

        {/* Brutalist Currently Building Footer */}
        <motion.div
          className="w-full border-[4px] border-[#ededed] bg-[#111] p-8 md:p-12 shadow-[16px_16px_0px_#ededed] mt-20 relative z-[99]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b-[4px] border-[#ededed] pb-8">
            <div>
              <span className="inline-block border-[2px] border-[#E2FF32] text-[#E2FF32] px-3 py-1 font-bold uppercase tracking-widest text-sm mb-4">
                Active Branch
              </span>
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-none">
                PlaceWise v2.1 & TrenDaq
              </h3>
            </div>
          </div>
          
          <p className="max-w-3xl text-lg font-medium text-[#ededed]/80 mb-8 leading-relaxed">
            The current focus is AI-assisted student outcomes: resume intelligence, opportunity discovery, event infrastructure, and building dashboards that feel production-ready from day one.
          </p>

          <div className="flex flex-wrap gap-4">
            {["PlaceWise Infrastructure", "Eventara Workflows", "Campus Mart Scaling", "MicroInternship Ecosystem"].map((item) => (
              <span 
                key={item}
                className="border-[2px] border-[#ededed]/30 px-4 py-2 font-bold uppercase text-sm bg-[#0a0a0a] hover:bg-[#ededed] hover:text-[#0a0a0a] transition-all cursor-default"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
        
      </div>
    </div>
  );
}