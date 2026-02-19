"use client";
import { useInView } from "@/hooks";
import { tokens } from "@/lib/tokens";

interface SectionHeaderProps {
  label: string;
  title: string;
  sub?: string;
  center?: boolean;
}

export default function SectionHeader({ label, title, sub, center = false }: SectionHeaderProps) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      style={{ marginBottom: 64, textAlign: center ? "center" : "left" }}
    >
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        fontFamily: "'Geist Mono', monospace", fontSize: 11,
        letterSpacing: "0.12em", textTransform: "uppercase",
        color: tokens.accent, marginBottom: 16,
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(10px)",
        transition: "all 0.5s ease",
      }}>
        <span style={{ width: 24, height: 1, background: tokens.accent, opacity: 0.6 }} />
        {label}
      </div>

      <h2 style={{
        fontSize: "clamp(32px, 4vw, 52px)",
        fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1,
        color: tokens.text1, marginBottom: sub ? 16 : 0,
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(16px)",
        transition: "all 0.6s ease 0.1s",
      }}>
        {title}
      </h2>

      {sub && (
        <p style={{
          fontSize: 16, color: tokens.text2,
          maxWidth: 540, lineHeight: 1.75, fontWeight: 400,
          margin: center ? "0 auto" : "0",
          opacity: inView ? 1 : 0,
          transform: inView ? "none" : "translateY(10px)",
          transition: "all 0.6s ease 0.2s",
        }}>
          {sub}
        </p>
      )}
    </div>
  );
}
