"use client";

import { motion } from "framer-motion";

// Curated Top 5 per category, strictly formatted for impact.
const skillGroups = [
  {
    title: "Frontend Engineering",
    color: "#00E5FF", // Cyan
    skills: [
      { name: "React / Next.js", level: "Advanced", pct: 95 },
      { name: "TypeScript", level: "Advanced", pct: 90 },
      { name: "Tailwind CSS", level: "Advanced", pct: 95 },
      { name: "Framer Motion", level: "Intermediate", pct: 80 },
      { name: "Component Architecture", level: "Advanced", pct: 90 },
    ],
  },
  {
    title: "Backend & Auth",
    color: "#E2FF32", // Acid Yellow
    skills: [
      { name: "Node.js / Express.js", level: "Advanced", pct: 90 },
      { name: "FastAPI", level: "Intermediate", pct: 75 },
      { name: "REST API Design", level: "Advanced", pct: 95 },
      { name: "JWT & RBAC Auth", level: "Advanced", pct: 85 },
      { name: "Cloudinary Uploads", level: "Intermediate", pct: 80 },
    ],
  },
  {
    title: "AI / ML Integration",
    color: "#FF3366", // Neon Pink
    skills: [
      { name: "RAG Pipelines", level: "Advanced", pct: 85 },
      { name: "Vector Search", level: "Advanced", pct: 85 },
      { name: "LLM Integration", level: "Advanced", pct: 90 },
      { name: "Prompt Engineering", level: "Advanced", pct: 90 },
      { name: "ChromaDB", level: "Intermediate", pct: 75 },
    ],
  },
  {
    title: "Database & Deployment",
    color: "#B5A1FF", // Lilac
    skills: [
      { name: "MongoDB / Mongoose", level: "Advanced", pct: 95 },
      { name: "PostgreSQL", level: "Intermediate", pct: 75 },
      { name: "Git & GitHub", level: "Advanced", pct: 90 },
      { name: "Vercel / Railway", level: "Advanced", pct: 85 },
      { name: "Postman", level: "Advanced", pct: 90 },
    ],
  },
];

// Engineering highlights pulled from your actual capabilities
const HIGHLIGHTS = [
  { label: "Product Architecture", value: "Full-stack system design mapping user needs to technical execution." },
  { label: "AI Workflows", value: "Designing resilient pipelines for resume intelligence and LLM logic." },
  { label: "Data Integrity", value: "Robust database schemas and role-based access control (RBAC)." },
  { label: "API Integration", value: "Building and consuming RESTful services with strict authentication." },
];

function SkillGroup({ title, color, skills, index }: (typeof skillGroups)[number] & { index: number }) {
  return (
    <motion.div
      className="bg-[#111] border-[4px] border-[#ededed] p-6 md:p-8 relative group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1, duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ y: -6, boxShadow: `12px 12px 0px ${color}` }}
      style={{ boxShadow: `8px 8px 0px rgba(237,237,237,0.1)` }}
    >
      <div className="flex items-center gap-4 mb-8 border-b-[4px] border-[#ededed] pb-4">
        <span 
          className="w-4 h-4 border-[2px] border-[#ededed]" 
          style={{ backgroundColor: color }} 
        />
        <h3 className="text-2xl font-black uppercase tracking-tight text-[#ededed]">{title}</h3>
      </div>
      
      <div className="flex flex-col gap-6">
        {skills.map((skill, skillIndex) => (
          <div key={skill.name} className="flex flex-col gap-2">
            <div className="flex justify-between items-end">
              <strong className="text-sm md:text-base font-bold uppercase tracking-wide text-[#ededed]">
                {skill.name}
              </strong>
              <small className="text-xs font-bold uppercase tracking-widest text-[#ededed]/50">
                {skill.level}
              </small>
            </div>
            
            {/* Brutalist Meter Bar */}
            <div className="w-full h-4 border-[2px] border-[#ededed] bg-[#0a0a0a] relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full border-r-[2px] border-[#ededed]"
                style={{ backgroundColor: color }}
                initial={{ width: "0%" }}
                whileInView={{ width: `${skill.pct}%` }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + skillIndex * 0.05, duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] pt-32 pb-24 px-4 md:px-12 selection:bg-[#E2FF32] selection:text-[#0a0a0a]">
      
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
            Technical Arsenal
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[10vw] md:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-8 max-w-4xl"
          >
            Modern tools. Real products.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-medium max-w-2xl border-l-[4px] border-[#E2FF32] pl-6 text-[#ededed]/80"
          >
            Grouped into the layers I use to build usable systems: frontend architecture, robust backend APIs, applied machine learning and deployment tools.
          </motion.p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-32">
          {skillGroups.map((group, index) => (
            <SkillGroup key={group.title} {...group} index={index} />
          ))}
        </div>

        {/* Engineering Highlights */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          transition={{ staggerChildren: 0.1 }}
        >
          {HIGHLIGHTS.map((item, index) => (
            <motion.div
              key={item.label}
              className="bg-[#ededed] text-[#0a0a0a] border-[4px] border-[#ededed] p-6 shadow-[8px_8px_0px_#111] hover:-translate-y-2 hover:shadow-[12px_12px_0px_#E2FF32] transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <div className="font-black text-4xl text-[#0a0a0a]/10 mb-2">0{index + 1}</div>
              <p className="font-bold uppercase tracking-widest text-sm mb-3 border-b-[2px] border-[#0a0a0a] pb-2">
                {item.label}
              </p>
              <h3 className="text-lg font-black leading-snug">{item.value}</h3>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}