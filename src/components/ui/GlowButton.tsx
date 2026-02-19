"use client";
import { useState } from "react";
import { tokens } from "@/lib/tokens";

interface GlowButtonProps {
  children: React.ReactNode;
  primary?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  style?: React.CSSProperties;
}

export default function GlowButton({
  children, primary = false, onClick, type = "button", style = {}
}: GlowButtonProps) {
  const [hover, setHover] = useState(false);

  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: primary ? "12px 24px" : "11px 22px",
        borderRadius: 10, fontSize: 14, fontWeight: 600,
        fontFamily: "'Cabinet Grotesk', sans-serif",
        letterSpacing: "-0.01em", cursor: "none",
        border: primary
          ? "1px solid rgba(61,126,255,0.55)"
          : "1px solid rgba(255,255,255,0.10)",
        background: primary
          ? hover ? "rgba(61,126,255,0.98)" : "rgba(61,126,255,0.85)"
          : hover ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)",
        color: primary ? "#fff" : hover ? tokens.text1 : tokens.text2,
        boxShadow: primary
          ? hover
            ? "0 0 32px rgba(61,126,255,0.55), 0 0 64px rgba(61,126,255,0.20)"
            : "0 0 20px rgba(61,126,255,0.30)"
          : "none",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
