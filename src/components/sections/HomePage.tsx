"use client";
import { useEffect, useRef } from "react";
import { useTypewriter, useInView } from "@/hooks";
import { tokens } from "@/lib/tokens";
import GlowButton from "@/components/ui/GlowButton";
import Badge from "@/components/ui/Badge";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const COUNT = 70;
    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.5 + 0.4,
      a: Math.random() * 0.5 + 0.1,
    }));

    let mx = W / 2, my = H / 2;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", onMove);

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p) => {
        const dx = mx - p.x, dy = my - p.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 180) { p.vx += dx / d * 0.012; p.vy += dy / d * 0.012; }
        p.vx *= 0.98; p.vy *= 0.98;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(61,126,255,${p.a})`;
        ctx.fill();
      });
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(61,126,255,${0.12 * (1 - d / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", inset: 0,
      zIndex: 0, pointerEvents: "none", opacity: 0.65,
    }} />
  );
}

function StatCard({ value, label, delay }: { value: string; label: string; delay: string }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      padding: "20px 24px",
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 12,
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(20px)",
      transition: `all 0.6s ease ${delay}`,
    }}>
      <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.04em", color: tokens.text1, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11.5, color: tokens.text3, marginTop: 6, fontFamily: "'Geist Mono', monospace", letterSpacing: "0.04em" }}>{label}</div>
    </div>
  );
}

const WORDS = ["React Interfaces.", "MERN Applications.", "Scalable Systems.", "Clean Components.", "Startup Products."];

export default function HomePage({ onNavigate }: { onNavigate: (p: string) => void }) {
  const typed = useTypewriter(WORDS);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 24px", position: "relative" }}>
      <ParticleCanvas />
      <div className="grid-bg" style={{ position: "fixed", inset: 0, zIndex: 0, opacity: 0.35, pointerEvents: "none" }} />
      <div style={{ position: "fixed", top: "-20%", left: "-10%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(61,126,255,0.10), transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-20%", right: "-10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.06), transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ maxWidth: 1040, margin: "0 auto", width: "100%", position: "relative", zIndex: 2, paddingTop: 100 }}>

        {/* Status pill */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 16px", border: "1px solid rgba(16,185,129,0.22)", borderRadius: 30, marginBottom: 48, background: "rgba(16,185,129,0.055)", animation: "fadeUp 0.6s ease both" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: tokens.green, boxShadow: `0 0 10px ${tokens.green}`, animation: "pulse 2s infinite", display: "inline-block" }} />
          <span style={{ fontSize: 13, color: tokens.green, fontFamily: "'Geist Mono', monospace" }}>Available for Internship / Full-time</span>
        </div>

        {/* Headline */}
        <div style={{ animation: "fadeUp 0.7s ease 0.1s both" }}>
          <p style={{ color: tokens.text2, fontWeight: 400, fontSize: "clamp(18px,2.2vw,24px)", fontFamily: "'Instrument Serif', serif", fontStyle: "italic", marginBottom: 12 }}>
            Hi, I&apos;m Vishnu Mashalkar
          </p>
          <h1 style={{ fontSize: "clamp(52px,8vw,96px)", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1.0, marginBottom: 4 }}>
            <span className="shimmer-text">I Build</span>
          </h1>
          <h1 style={{ fontSize: "clamp(52px,8vw,96px)", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1.0, color: tokens.text1, minHeight: "1.1em" }}>
            {typed}<span style={{ animation: "blink 1s infinite", color: tokens.accent, display: "inline-block" }}>|</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p style={{ fontSize: "clamp(15px,1.8vw,18px)", color: tokens.text2, maxWidth: 520, lineHeight: 1.75, fontWeight: 400, margin: "28px 0 44px", animation: "fadeUp 0.7s ease 0.2s both" }}>
          Frontend-focused MERN Stack Developer. I craft pixel-perfect interfaces with component-driven architecture, clean APIs, and startup-grade speed.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", animation: "fadeUp 0.7s ease 0.3s both" }}>
          <GlowButton primary onClick={() => onNavigate("projects")}>
            View Projects
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </GlowButton>

          <GlowButton onClick={() => onNavigate("about")}>About Me</GlowButton>

          {/* Resume Download */}
          <a
            href="/resume.pdf"
            download="Vishnu_Mashalkar_Resume.pdf"
            data-hover
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "11px 22px", borderRadius: 10,
              fontSize: 14, fontWeight: 600,
              fontFamily: "'Cabinet Grotesk', sans-serif",
              border: "1px solid rgba(16,185,129,0.30)",
              background: "rgba(16,185,129,0.07)",
              color: tokens.green, textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = "rgba(16,185,129,0.14)";
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = "0 0 24px rgba(16,185,129,0.25)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = "rgba(16,185,129,0.07)";
              el.style.transform = "";
              el.style.boxShadow = "";
            }}
          >
            ↓ Resume
          </a>
        </div>

        {/* Tech badges */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 48, animation: "fadeUp 0.7s ease 0.4s both" }}>
          {["React.js", "Node.js", "MongoDB", "Tailwind CSS", "Express.js", "MySQL"].map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginTop: 80, maxWidth: 620 }}>
          <StatCard value="2+"   label="YEARS LEARNING" delay="0.1s" />
          <StatCard value="5+"   label="PROJECTS BUILT"  delay="0.2s" />
          <StatCard value="MERN" label="CORE STACK"       delay="0.3s" />
          <StatCard value="∞"    label="LINES WRITTEN"    delay="0.4s" />
        </div>

      </div>
    </div>
  );
}
