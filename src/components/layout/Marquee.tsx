"use client";
import { tokens } from "@/lib/tokens";

const ITEMS = [
  "React.js", "Node.js", "MongoDB", "Tailwind CSS", "Express.js",
  "TypeScript", "MySQL", "REST APIs", "JWT Auth", "Git", "Vercel",
  "Next.js", "Mongoose", "Postman", "VS Code",
];

export default function Marquee() {
  const repeated = [...ITEMS, ...ITEMS];

  return (
    <div style={{
      width: "100%", overflow: "hidden",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      padding: "14px 0",
      background: "rgba(255,255,255,0.01)",
      position: "relative", zIndex: 2,
      maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
      WebkitMaskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
    }}>
      <div style={{
        display: "flex", gap: 40,
        width: "max-content",
        animation: "marqueeScroll 28s linear infinite",
      }}>
        {repeated.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 40,
            whiteSpace: "nowrap",
          }}>
            <span style={{
              fontSize: 13, fontWeight: 600,
              fontFamily: "'Cabinet Grotesk', sans-serif",
              color: tokens.text3,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
            }}>
              {item}
            </span>
            <span style={{
              width: 4, height: 4, borderRadius: "50%",
              background: tokens.accent, opacity: 0.4,
              display: "inline-block", flexShrink: 0,
            }} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}