"use client";
import { tokens } from "@/lib/tokens";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh", background: tokens.bg0,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      fontFamily: "'Cabinet Grotesk', sans-serif",
      padding: "0 24px", textAlign: "center",
    }}>
      <div style={{
        fontSize: "clamp(80px,15vw,160px)", fontWeight: 900,
        letterSpacing: "-0.06em", lineHeight: 1,
        background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        marginBottom: 8,
      }}>
        404
      </div>

      <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: 12, color: tokens.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
        page_not_found
      </div>

      <p style={{ fontSize: 16, color: tokens.text2, maxWidth: 360, lineHeight: 1.7, marginBottom: 40 }}>
        This page doesn&apos;t exist. Maybe it&apos;s still being built — like every good product.
      </p>

      <a href="/" style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "12px 24px", borderRadius: 10,
        background: "rgba(61,126,255,0.85)",
        border: "1px solid rgba(61,126,255,0.5)",
        color: "#fff", fontSize: 14, fontWeight: 600,
        textDecoration: "none",
        transition: "all 0.2s",
        boxShadow: "0 0 20px rgba(61,126,255,0.3)",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 32px rgba(61,126,255,0.5)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 0 20px rgba(61,126,255,0.3)"; }}
      >
        ← Back Home
      </a>
    </div>
  );
}