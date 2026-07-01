"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
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
  children?: React.ReactNode;
}

// Magnetic Physics Wrapper for the CTA and Logo
function Magnetic({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  return (
    <motion.div
      style={{ x: springX, y: springY, display: "inline-flex" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.2);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Nav({ active, onNavigate, children }: NavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed", 
        top: scrolled ? 16 : 24, 
        // BULLETPROOF CENTERING (Doesn't fight Framer Motion)
        left: 0, 
        right: 0, 
        margin: "0 auto",
        zIndex: 100,
        // The Floating Island Layout
        width: "min(900px, 95vw)",
        height: 64,
        padding: "0 12px 0 24px",
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        borderRadius: 32,
        // Liquid Glassmorphism Core
        background: scrolled ? "rgba(10, 14, 20, 0.65)" : "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(32px) saturate(150%)",
        WebkitBackdropFilter: "blur(32px) saturate(150%)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: scrolled 
          ? "0 24px 48px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.1)" 
          : "0 12px 32px -12px rgba(0, 0, 0, 0.3)",
        transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* Brand / Logo + Mascot */}
      <Magnetic>
        <button
          onClick={() => onNavigate("home")}
          data-hover
          style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 12,
            padding: "8px 0"
          }}
        >
          {/* Mascot Image Wrapper */}
          <div style={{
            width: 28, 
            height: 28, 
            borderRadius: "50%", 
            overflow: "hidden",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            {/* Make sure mascot.png is directly inside your /public folder */}
            <img 
              src="/mascot.png" 
              alt="Vishnu Mascot" 
              style={{ width: "100%", height: "100%", objectFit: "cover" }} 
            />
          </div>
          
          <span style={{
            fontFamily: "'Cabinet Grotesk', sans-serif",
            fontWeight: 800, 
            fontSize: 16, 
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: tokens.text1,
          }}>
            Vishnu
          </span>
        </button>
      </Magnetic>

      {/* Center Links Dock */}
      <div className="hidden md:flex" style={{
        gap: 4,
        padding: 4,
        borderRadius: 24,
      }}>
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              data-hover
              style={{
                position: "relative",
                background: "none",
                border: "none",
                padding: "8px 16px",
                borderRadius: 20,
                fontSize: 14, 
                fontWeight: 600,
                fontFamily: "'Cabinet Grotesk', sans-serif",
                cursor: "pointer", 
                letterSpacing: "0.02em",
                color: isActive ? tokens.text1 : tokens.text2,
                transition: "color 0.2s ease",
              }}
            >
              {/* Framer Motion Gliding Background Pill */}
              {isActive && (
                <motion.div
                  layoutId="activeNavTab"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 20,
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1)",
                    zIndex: -1,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span style={{ position: "relative", zIndex: 1 }}>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right CTA */}
      <div className="hidden md:block">
        <Magnetic>
          <GlowButton 
            onClick={() => onNavigate("contact")} 
            style={{ 
              fontSize: 13, 
              padding: "10px 20px", 
              borderRadius: 20,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              fontWeight: 800,
              // OVERRIDE THE DEFAULT BLUE:
              background: "#E2FF32", 
              color: "#0a0a0a",
              border: "none",
              boxShadow: "0 0 24px rgba(226, 255, 50, 0.4)" // Acid Yellow Glow
            }}
          >
            <>Let's Build</>
          </GlowButton>
        </Magnetic>
      </div>

      {/* Mobile Nav Trigger (passed as children, usually a hamburger icon) */}
      <div className="md:hidden">
        {children}
      </div>
    </motion.nav>
  );
}