"use client";
import { useState, useRef, useCallback } from "react";
import { useInView } from "@/hooks";
import { tokens, projects } from "@/lib/tokens";
import Badge from "@/components/ui/Badge";
import SectionHeader from "@/components/ui/SectionHeader";

function ProjectCard({ project, onClick, index }: {
  project: (typeof projects)[number];
  onClick?: () => void;
  index: number;
}) {
  const [hover, setHover]   = useState(false);
  const [mouse, setMouse]   = useState({ x: 0, y: 0 });
  const [tilt, setTilt]     = useState({ rx: 0, ry: 0 });
  const cardRef             = useRef<HTMLDivElement>(null);
  const [ref, inView]       = useInView(0.1);

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r  = cardRef.current.getBoundingClientRect();
    const x  = e.clientX - r.left;
    const y  = e.clientY - r.top;
    setMouse({ x, y });
    setTilt({
      rx: ((y / r.height) - 0.5) * -14,
      ry: ((x / r.width)  - 0.5) *  14,
    });
  }, []);

  const setRefs = (el: HTMLDivElement | null) => {
    (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
    cardRef.current = el;
  };

  return (
    <div
      ref={setRefs}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setTilt({ rx: 0, ry: 0 }); }}
      onMouseMove={onMove}
      onClick={onClick}
      data-hover
      className="card-shine"
      style={{
        position: "relative",
        background: hover ? "rgba(14,19,30,0.92)" : "rgba(12,16,24,0.80)",
        border: `1px solid ${hover ? "rgba(61,126,255,0.28)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 20, padding: 32,
        cursor: onClick ? "none" : "default",
        overflow: "hidden",
        opacity: inView ? 1 : 0,
        transform: inView
          ? `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(${hover ? -4 : 0}px)`
          : "translateY(30px)",
        transition: hover
          ? "border-color 0.2s, background 0.2s, box-shadow 0.2s"
          : `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
        boxShadow: hover ? "0 28px 60px rgba(0,0,0,0.5)" : "none",
        display: "flex", flexDirection: "column", gap: 20,
        transformStyle: "preserve-3d",
      }}
    >
      {hover && (
        <div style={{
          position: "absolute", width: 380, height: 380, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(61,126,255,0.11) 0%, transparent 70%)",
          left: mouse.x - 190, top: mouse.y - 190,
          pointerEvents: "none", zIndex: 0,
        }} />
      )}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: hover ? "linear-gradient(90deg,transparent,rgba(61,126,255,0.55),transparent)" : "transparent", transition: "background 0.3s" }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(61,126,255,0.08)", border: "1px solid rgba(61,126,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
            {project.icon}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {project.featured && <Badge variant="accent">Featured</Badge>}
            <span style={{ color: hover ? tokens.accent : tokens.text3, fontSize: 18, transform: hover ? "translate(3px,-3px)" : "none", transition: "all 0.2s", display: "block" }}>↗</span>
          </div>
        </div>

        <h3 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.04em", color: tokens.text1, marginBottom: 10 }}>{project.name}</h3>
        <p style={{ fontSize: 14, color: tokens.text2, lineHeight: 1.7, marginBottom: 24 }}>{project.description}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
          {project.stack.map((t) => <Badge key={t} variant="accent">{t}</Badge>)}
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[{ label: "GitHub ↗", href: project.github }, { label: "Live Demo ↗", href: project.demo }].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} data-hover
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "7px 14px", fontSize: 12.5, color: tokens.text2, fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 500, textDecoration: "none", transition: "all 0.2s" }}
              onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = "rgba(255,255,255,0.08)"; el.style.color = tokens.text1; }}
              onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = "rgba(255,255,255,0.04)"; el.style.color = tokens.text2; }}
            >{label}</a>
          ))}
          {project.hasDetail && (
            <button onClick={(e) => { e.stopPropagation(); onClick?.(); }} data-hover
              style={{ marginLeft: "auto", background: "rgba(61,126,255,0.08)", border: "1px solid rgba(61,126,255,0.22)", borderRadius: 8, padding: "7px 14px", fontSize: 12.5, color: tokens.accent, fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 600, cursor: "none", transition: "all 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(61,126,255,0.16)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(61,126,255,0.08)")}
            >Case Study →</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <div style={{ maxWidth: 1040, margin: "0 auto", padding: "100px 24px 80px" }}>
      <SectionHeader label="Work" title="Selected Projects" sub="Real products solving real problems. No tutorial clones." />
      <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} onClick={p.hasDetail ? () => onNavigate("detail") : undefined} />
        ))}
      </div>
      <div style={{ marginTop: 40, padding: 32, border: "1px dashed rgba(255,255,255,0.06)", borderRadius: 20, textAlign: "center" }}>
        <div style={{ fontSize: 13, color: tokens.text3, fontFamily: "'Geist Mono',monospace" }}>
          more_projects.push( <span style={{ color: tokens.accent }}>&hellip;coming_soon</span> )
        </div>
      </div>
    </div>
  );
}