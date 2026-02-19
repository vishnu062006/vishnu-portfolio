"use client";
import { useInView } from "@/hooks";
import { tokens, skillGroups } from "@/lib/tokens";
import Badge from "@/components/ui/Badge";
import SectionHeader from "@/components/ui/SectionHeader";

function SkillBar({ name, pct, level, delay }: { name: string; pct: number; level: string; delay: string }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref} style={{ marginBottom: 18, opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-10px)", transition: `all 0.5s ease ${delay}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: tokens.text1 }}>{name}</span>
        <span style={{ fontSize: 11, color: tokens.text3, fontFamily: "'Geist Mono',monospace", textTransform: "uppercase", letterSpacing: "0.06em" }}>{level}</span>
      </div>
      <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 2,
          background: "linear-gradient(90deg, #3d7eff, #22d3ee)",
          width: inView ? `${pct}%` : "0%",
          transition: `width 0.9s cubic-bezier(0.4,0,0.2,1) ${delay}`,
          boxShadow: "0 0 8px rgba(61,126,255,0.5)",
        }} />
      </div>
    </div>
  );
}

function SkillGroup({ title, color, skills, index }: (typeof skillGroups)[number] & { index: number }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div
      ref={ref}
      className="card-shine"
      style={{
        background: "rgba(12,16,24,0.8)", border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 20, padding: 28,
        opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)",
        transition: `all 0.5s ease ${index * 0.1}s`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Geist Mono',monospace", fontSize: 11, color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 24 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}`, display: "inline-block" }} />
        {title}
      </div>
      {[...skills].map((s, i) => (
        <SkillBar key={s.name} name={s.name} pct={s.pct} level={s.level} delay={`${i * 0.08}s`} />
      ))}
    </div>
  );
}

const ALSO_USED = ["React Router", "Context API", "JWT", "Cloudinary", "Mongoose", "dotenv", "Nodemon", "npm", "REST APIs", ];

export default function SkillsPage() {
  return (
    <div style={{ maxWidth: 1040, margin: "0 auto", padding: "100px 24px 80px" }}>
      <SectionHeader label="Capabilities" title="Skills" sub="Grouped by layer — frontend-first, full-stack capable." />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
        {skillGroups.map((g, i) => (
          <SkillGroup key={g.title} {...g} index={i} />
        ))}
      </div>

      <div style={{ marginTop: 40, padding: 28, background: "rgba(12,16,24,0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20 }}>
        <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11, color: tokens.text3, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20, textAlign: "center" }}>
          Also worked with
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
          {ALSO_USED.map((t) => <Badge key={t}>{t}</Badge>)}
        </div>
      </div>
    </div>
  );
}
