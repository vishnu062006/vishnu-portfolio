"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, TorusKnot } from "@react-three/drei";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/tokens";

const brutalColors = ["#00E5FF", "#E2FF32", "#FF3366", "#B5A1FF"];
const HERO_ROLES = ["AI", "Product", "SaaS"];

// SVGs for the Hero Box
const GithubIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17A5.05 5.05 0 0 0 19 5.5A5.05 5.05 0 0 0 19 2.5s-1.4-.45-4.5 1.6a15.65 15.65 0 0 0-8 0C3.4 2.05 2 2.5 2 2.5a5.05 5.05 0 0 0 0 3a5.05 5.05 0 0 0-1.5 2.3c0 5.76 3.35 6.78 6.5 7.16A4.8 4.8 0 0 0 6 18v4"></path></svg>
);
const LinkedinIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const MailIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
);

export default function HomePage({ onNavigate }: { onNavigate: (p: string) => void }) {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  
  // State for cycling Hero text
  const [roleIndex, setRoleIndex] = useState(0);
  
  // State for hovering projects
  const [activeProject, setActiveProject] = useState(0);
  const featuredProjects = projects.slice(0, 3);

  // Cycle through roles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % HERO_ROLES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0a0a0a] text-[#ededed] w-full selection:bg-[#ededed] selection:text-[#0a0a0a] overflow-x-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <section ref={heroRef} className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20">
        
        {/* Engineered 3D Background */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Canvas camera={{ position: [0, 0, 8] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 2]} intensity={2} />
            <TorusKnot args={[2, 0.5, 128, 16]}>
              <meshBasicMaterial wireframe color="#333" />
            </TorusKnot>
            <Environment preset="city" />
          </Canvas>
        </div>

        {/* Left-Aligned Layout restored */}
        <div className="z-10 w-full px-4 md:px-12 flex flex-col items-start pointer-events-none max-w-7xl mx-auto">
          <p className="font-bold uppercase tracking-widest text-sm mb-4 border-2 border-[#ededed] px-4 py-1 rounded-full bg-black/20 backdrop-blur-md shadow-[4px_4px_0px_#ededed]">
            Vishnu Mashalkar — Portfolio '26
          </p>
          
          <h1 className="text-[10vw] font-black uppercase leading-[0.85] tracking-tighter text-[#ededed] drop-shadow-2xl flex flex-col items-start">
            <div className="h-[1em] relative overflow-hidden w-full flex justify-start">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={HERO_ROLES[roleIndex]}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 1.25, ease: [0.5, 1, 0.36, 1] }}
                  className="absolute text-[#ededed]"
                >
                  {HERO_ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            <span>Engineer.</span>
          </h1>

          {/* Shifted Box Higher (mt-4 instead of mt-12) & Removed Yellow */}
          <div className="mt-4 p-6 md:p-8 max-w-xl bg-white/5 backdrop-blur-xl border-[4px] border-[#ededed] shadow-[12px_12px_0px_#ededed] pointer-events-auto transition-transform hover:-translate-y-1 hover:shadow-[16px_16px_0px_#ededed] duration-300">
            <h3 className="text-2xl font-black uppercase mb-4 border-b-2 border-[#ededed] pb-2 text-[#ededed]">
              Building Scalable Web Experiences
            </h3>
            <p className="text-lg font-medium leading-relaxed text-[#ededed]/80 mb-6">
              I build highly responsive, database-driven applications using MongoDB, Express, React, and Node.js, combined with extreme motion design and brutalist UI.
            </p>
            
            {/* White/Black Buttons */}
            <div className="flex flex-wrap gap-4 mb-6">
              <button 
                onClick={() => onNavigate("projects")}
                className="bg-[#ededed] text-[#0a0a0a] border-[4px] border-[#ededed] px-8 py-3 font-black uppercase tracking-wide hover:bg-transparent hover:text-[#ededed] transition-colors shadow-[6px_6px_0px_#0a0a0a]"
              >
                View Work
              </button>
              
              <a href="/resume.pdf" download className="bg-transparent text-[#ededed] border-[4px] border-[#ededed] px-6 py-3 font-black uppercase hover:bg-[#ededed] hover:text-[#0a0a0a] transition-colors shadow-[6px_6px_0px_#0a0a0a]">
                Grab Resume
              </a>
            </div>

            {/* Social Icons row inside the box */}
            <div className="flex gap-4 border-t-2 border-[#ededed]/20 pt-4">
              <a href="https://github.com/vishnu062006" target="_blank" rel="noreferrer" className="text-[#ededed] hover:text-[#0a0a0a] hover:bg-[#ededed] border-2 border-transparent hover:border-[#ededed] p-2 transition-colors rounded-sm">
                <GithubIcon size={22} />
              </a>
              <a href="https://linkedin.com/in/vishnumashalkar" target="_blank" rel="noreferrer" className="text-[#ededed] hover:text-[#0a0a0a] hover:bg-[#ededed] border-2 border-transparent hover:border-[#ededed] p-2 transition-colors rounded-sm">
                <LinkedinIcon size={22} />
              </a>
              <a href="mailto:vishnumashalkar@gmail.com" className="text-[#ededed] hover:text-[#0a0a0a] hover:bg-[#ededed] border-2 border-transparent hover:border-[#ededed] p-2 transition-colors rounded-sm">
                <MailIcon size={22} />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ================= STACKED PROJECTS & STICKY PREVIEW ================= */}
      <section className="w-full relative bg-[#0a0a0a] border-y-[4px] border-[#ededed] px-4 md:px-12 py-24 z-10">
        
        <div className="mb-16">
          <h2 className="text-[8vw] md:text-8xl font-black uppercase leading-[0.85] tracking-tighter text-[#ededed]">
            Featured<br/>Deployments
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative items-start">
          
          {/* Left Column: Stacked Directory */}
          <div className="lg:col-span-7 flex flex-col w-full border-t-[4px] border-[#ededed]">
            {featuredProjects.map((project, index) => (
              <div 
                key={project.id}
                className="group relative flex flex-col md:flex-row md:items-center justify-between p-8 border-b-[4px] border-[#ededed] cursor-pointer hover:bg-[#111] transition-colors overflow-hidden"
                onMouseEnter={() => setActiveProject(index)}
                onClick={() => router.push(`/projects/${project.slug}`)}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" 
                  style={{ backgroundColor: brutalColors[index % brutalColors.length] }} 
                />

                <div className="relative z-10 flex flex-col">
                  <span className="font-bold uppercase tracking-widest text-sm text-[#ededed]/50 group-hover:text-[#ededed] transition-colors mb-2">
                    0{index + 1} / {project.category}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                    {project.name}
                  </h3>
                </div>
                
                <div className="relative z-10 mt-6 md:mt-0 flex flex-wrap gap-2 md:max-w-[200px] justify-start md:justify-end">
                   {project.stack.slice(0, 3).map(tech => (
                     <span key={tech} className="border-2 border-[#ededed] px-2 py-1 text-xs font-bold uppercase transition-colors">
                       {tech}
                     </span>
                   ))}
                </div>
              </div>
            ))}

            <button 
              onClick={() => onNavigate("projects")}
              className="mt-12 border-[4px] border-[#ededed] text-[#0a0a0a] bg-[#ededed] w-full py-6 text-2xl font-black uppercase tracking-wide hover:bg-transparent hover:text-[#ededed] transition-colors shadow-[8px_8px_0px_#ededed] hover:translate-y-1 hover:translate-x-1 hover:shadow-none"
            >
              View Full Archive ↗
            </button>
          </div>

          {/* Right Column: Sticky Hover Preview */}
          <div className="hidden lg:block lg:col-span-5 sticky top-32 h-[600px] border-[4px] border-[#ededed] bg-[#111] shadow-[16px_16px_0px_#ededed] overflow-hidden">
             
             <div className="absolute top-0 w-full h-10 border-b-[4px] border-[#ededed] bg-[#0a0a0a] flex items-center px-4 gap-3 z-20">
               <span className="w-4 h-4 rounded-full border-2 border-[#ededed] bg-[#FF3366]" />
               <span className="w-4 h-4 rounded-full border-2 border-[#ededed] bg-[#ededed]" />
               <span className="w-4 h-4 rounded-full border-2 border-[#ededed] bg-[#00E5FF]" />
             </div>

             <div className="absolute inset-0 pt-10">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={activeProject}
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 1.05 }}
                   transition={{ duration: 0.3, ease: "easeOut" }}
                   className="w-full h-full flex flex-col items-center justify-center p-8 relative"
                   style={{ backgroundColor: `${brutalColors[activeProject % brutalColors.length]}15` }}
                 >
                   <div 
                     className="w-48 h-48 border-[8px] border-[#ededed] shadow-[12px_12px_0px_rgba(0,0,0,0.5)] bg-[#0a0a0a]"
                     style={{ 
                       borderRadius: activeProject % 2 === 0 ? '0%' : '50%',
                       rotate: activeProject * 15 + 'deg',
                       borderColor: brutalColors[activeProject % brutalColors.length]
                     }}
                   />
                   
                   <div className="mt-12 text-center">
                     <p className="text-xl font-medium text-[#ededed]">
                       {featuredProjects[activeProject]?.impact}
                     </p>
                   </div>
                 </motion.div>
               </AnimatePresence>
             </div>
          </div>
        </div>
      </section>

      {/* ================= BENTO UI FOOTER ================= */}
      <section className="min-h-screen p-8 md:p-24 bg-[#0a0a0a]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          
          <div className="md:col-span-2 border-[4px] border-[#ededed] bg-[#111] p-8 md:p-12 shadow-[12px_12px_0px_#ededed]">
            <h2 className="text-4xl font-black uppercase mb-4 text-[#ededed]">The Stack</h2>
            <p className="text-xl font-medium max-w-lg text-[#ededed]/80">
              Specializing in MongoDB, Express, React, and Node.js. Obsessed with clean code, smooth deployments, and interfaces that don't compromise on performance.
            </p>
          </div>

          <div className="border-[4px] border-[#ededed] bg-[#ededed] text-[#0a0a0a] p-8 shadow-[12px_12px_0px_rgba(255,255,255,0.3)] flex flex-col justify-between">
            <span className="font-bold uppercase tracking-widest text-sm border-b-2 border-[#0a0a0a] pb-2">Current Status</span>
            <span className="text-4xl font-black uppercase mt-4">Building.</span>
          </div>

          <div className="border-[4px] border-[#ededed] bg-[#111] p-8 shadow-[12px_12px_0px_#ededed] flex flex-col justify-between group cursor-pointer hover:bg-[#ededed] transition-colors">
             <span className="font-bold uppercase tracking-widest text-sm text-[#ededed]/60 group-hover:text-[#0a0a0a]/60">Let's Talk</span>
             <a href="mailto:vishnumashalkar@gmail.com" className="text-3xl font-black text-[#ededed] group-hover:text-[#0a0a0a] mt-4">
               CONTACT ↗
             </a>
          </div>

          <div className="md:col-span-2 border-[4px] border-[#ededed] bg-[#ededed] p-8 shadow-[12px_12px_0px_#ededed] overflow-hidden relative group">
            <div className="absolute inset-0 bg-[#0a0a0a] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />
            <div className="relative z-10 text-[#0a0a0a] group-hover:text-[#ededed] transition-colors duration-500 delay-100 flex flex-col justify-center h-full">
              <h2 className="text-5xl font-black uppercase mb-2">Ready to ship.</h2>
              <p className="font-medium text-xl">Available for opportunities.</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}