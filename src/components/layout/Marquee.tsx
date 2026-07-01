"use client";

// Infused with your AI/ML stack to look much more advanced
const ITEMS = [
  "React.js", "Node.js", "MongoDB", "Tailwind CSS", "Express.js",
  "TypeScript", "Vector Search", "REST APIs", "FastAPI", "ChromaDB",
  "Next.js", "RAG Pipelines", "PostgreSQL", "System Architecture",
];

export default function Marquee() {
  // Tripled to ensure it never runs out of width on ultra-wide monitors
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div 
      className="w-full overflow-hidden border-y-[1px] border-[#ededed]/10 py-5 bg-[#0a0a0a] relative z-10"
      style={{
        maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div 
        className="flex gap-12 w-max"
        style={{ animation: "marqueeScroll 40s linear infinite" }}
      >
        {repeated.map((item, i) => (
          <div key={i} className="flex items-center gap-12 whitespace-nowrap">
            <span className="text-sm font-bold uppercase tracking-widest text-[#ededed]/40">
              {item}
            </span>
            
            {/* Engineered separator: Acid Yellow Diamond */}
            <span className="w-1.5 h-1.5 bg-[#E2FF32] rotate-45 flex-shrink-0 opacity-80 shadow-[0_0_8px_rgba(226,255,50,0.5)]" />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          /* Shifts exactly one-third since we tripled the array */
          to   { transform: translateX(calc(-33.333% - 16px)); } 
        }
      `}</style>
    </div>
  );
}