"use client";
import { useState } from "react";
import { tokens } from "@/lib/tokens";

type Page = "home" | "projects" | "about" | "skills" | "contact";
const NAV_ITEMS: { id: Page; label: string }[] = [
  { id: "home",     label: "Home"     },
  { id: "projects", label: "Projects" },
  { id: "about",    label: "About"    },
  { id: "skills",   label: "Skills"   },
  { id: "contact",  label: "Contact"  },
];

export default function MobileNav({ active, onNavigate }: { active: Page; onNavigate: (p: Page) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "none",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 8, padding: "8px 10px",
          cursor: "none", flexDirection: "column", gap: 4,
        }}
        className="mobile-menu-btn"
        data-hover
      >
        {[0, 1, 2].map((i) => (
          <span key={i} style={{
            display: "block", width: 18, height: 1.5,
            background: tokens.text2, borderRadius: 1,
            transform: open
              ? i === 0 ? "rotate(45deg) translate(4px,4px)"
              : i === 2 ? "rotate(-45deg) translate(4px,-4px)"
              : "scaleX(0)"
              : "none",
            transition: "all 0.25s ease",
          }} />
        ))}
      </button>

      {/* Mobile menu overlay */}
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 98, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }} />
          <div style={{
            position: "fixed", top: 70, left: 16, right: 16,
            zIndex: 99,
            background: "rgba(12,16,24,0.98)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16, padding: 8,
            boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
            animation: "fadeUp 0.2s ease both",
          }}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setOpen(false); }}
                style={{
                  width: "100%", display: "flex", alignItems: "center",
                  gap: 12, padding: "12px 16px", borderRadius: 10,
                  background: active === item.id ? "rgba(61,126,255,0.10)" : "transparent",
                  border: "none", cursor: "none", textAlign: "left",
                  color: active === item.id ? tokens.accent : tokens.text2,
                  fontSize: 15, fontWeight: 600,
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  transition: "all 0.15s",
                }}
              >
                {item.label}
                {active === item.id && <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: tokens.accent }} />}
              </button>
            ))}
          </div>
        </>
      )}

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}