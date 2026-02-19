"use client";
import { tokens } from "@/lib/tokens";

type Page = "home" | "projects" | "about" | "skills" | "contact";

interface FooterProps {
  onNavigate: (p: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const pages: Page[] = ["home", "projects", "about", "skills", "contact"];
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.05)",
      padding: "32px 24px",
      position: "relative", zIndex: 2,
    }}>
      <div style={{
        maxWidth: 1040, margin: "0 auto",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 16,
      }}>
        <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, color: tokens.text3 }}>
          © 2026 <span style={{ color: tokens.accent }}>Vishnu Mashalkar</span> · Built with Love using Next.js
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => onNavigate(p)}
              data-hover
              style={{
                background: "none", border: "none", cursor: "none",
                fontSize: 12.5, color: tokens.text3,
                fontFamily: "'Cabinet Grotesk', sans-serif",
                transition: "color 0.2s", textTransform: "capitalize",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = tokens.text1)}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = tokens.text3)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
