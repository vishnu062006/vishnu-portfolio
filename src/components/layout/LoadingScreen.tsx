"use client";
import { useEffect, useState } from "react";
import { tokens } from "@/lib/tokens";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 1800);
    const t2 = setTimeout(() => setVisible(false), 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: tokens.bg0,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column", gap: 24,
      opacity: fadeOut ? 0 : 1,
      transition: "opacity 0.5s cubic-bezier(0.4,0,0.2,1)",
      pointerEvents: fadeOut ? "none" : "all",
    }}>
      {/* Logo mark */}
      <div style={{
        fontFamily: "'Cabinet Grotesk', sans-serif",
        fontWeight: 900, fontSize: 48,
        letterSpacing: "-0.05em",
        color: tokens.text1,
        animation: "fadeUp 0.6s ease both",
      }}>
        <span style={{ color: tokens.accent }}>V</span>
        <span>ishnu</span>
      </div>

      {/* Progress bar */}
      <div style={{
        width: 120, height: 2,
        background: "rgba(255,255,255,0.06)",
        borderRadius: 2, overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          background: `linear-gradient(90deg, ${tokens.accent}, ${tokens.cyan})`,
          borderRadius: 2,
          animation: "loadBar 1.6s cubic-bezier(0.4,0,0.2,1) forwards",
        }} />
      </div>

      <style>{`
        @keyframes loadBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}