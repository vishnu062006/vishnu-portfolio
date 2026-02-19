"use client";
import { useState, useEffect } from "react";
import { tokens } from "@/lib/tokens";
import GlowButton from "@/components/ui/GlowButton";

type Page = "home" | "projects" | "about" | "skills" | "contact";

const NAV_ITEMS: { id: Page; label: string }[] = [
  { id: "home",     label: "Home"     },
  { id: "projects", label: "Projects" },
  { id: "about",    label: "About"    },
  { id: "skills",   label: "Skills"   },
  { id: "contact",  label: "Contact"  },
];

interface NavProps {
  active: Page;
  onNavigate: (p: Page) => void;
}

export default function Nav({ active, onNavigate }: NavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 24px", height: 60,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(4,6,10,0.88)" : "transparent",
      backdropFilter: scrolled ? "blur(24px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
      transition: "all 0.3s ease",
    }}>
      {/* Logo */}
      <button
        onClick={() => onNavigate("home")}
        data-hover
        style={{
          background: "none", border: "none", cursor: "none",
          fontFamily: "'Cabinet Grotesk', sans-serif",
          fontWeight: 900, fontSize: 20, letterSpacing: "-0.05em",
          color: tokens.text1,
          display: "flex", alignItems: "center", gap: 2,
        }}
      >
        <span style={{ color: tokens.accent }}>V</span>
        <span>ishnu</span>
        <span style={{
          marginLeft: 5, width: 7, height: 7, borderRadius: "50%",
          background: tokens.green,
          boxShadow: `0 0 8px ${tokens.green}`,
          animation: "pulse 2s infinite",
          display: "inline-block",
        }} />
      </button>

      {/* Links pill */}
      <div style={{
        display: "flex", gap: 2,
        background: "rgba(255,255,255,0.03)",
        borderRadius: 12, padding: 4,
        border: "1px solid rgba(255,255,255,0.06)",
      }}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            data-hover
            style={{
              background: active === item.id ? "rgba(61,126,255,0.12)" : "transparent",
              border: "none",
              color: active === item.id ? tokens.accent : tokens.text2,
              padding: "7px 14px", borderRadius: 8,
              fontSize: 13.5, fontWeight: 500,
              fontFamily: "'Cabinet Grotesk', sans-serif",
              cursor: "none", letterSpacing: "-0.01em",
              transition: "all 0.2s ease",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* CTA */}
      <GlowButton primary onClick={() => onNavigate("contact")} style={{ fontSize: 13, padding: "8px 16px" }}>
        Hire Me ↗
      </GlowButton>
    </nav>
  );
}
