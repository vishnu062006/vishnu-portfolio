"use client";
import { tokens } from "@/lib/tokens";
import Badge from "@/components/ui/Badge";
import SectionHeader from "@/components/ui/SectionHeader";

const MILESTONES = [
  { year: "2024", active: true,  title: "B.E. Computer Science",  sub: "BMS College of Engineering, Bengaluru",             badge: "ongoing" as const },
  { year: "2025", active: false, title: "First React Project",    sub: "Built component systems, learned Tailwind CSS"                                  },
  { year: "2025", active: false, title: "CampusMart",             sub: "First full-stack MERN app — REST API, JWT auth"                                  },
  { year: "2026", active: false, title: "Student Mgmt System",    sub: "Java/Python backend, relational MySQL schema"                                    },
  { year: "Now",  active: true,  title: "Seeking Opportunities",  sub: "Open to internships, full-time, and collabs",       badge: "open"    as const },
];

const SOCIALS = [
  { icon: "⌥", label: "GitHub",   val: "github.com/vishnu062006",         href: "https://github.com/vishnu062006"         },
  { icon: "in", label: "LinkedIn", val: "linkedin.com/in/vishnumashalkar",    href: "https://linkedin.com/in/vishnumashalkar"    },
  { icon: "✉",  label: "Email",   val: "vishnumashalkar@gmail.com",        href: "mailto:vishnumashalkar@gmail.com"         },
  { icon: "LC",  label: "LeetCode",   val: "leetcode.com/u/VishnuMashalkar/",        href: "https://leetcode.com/u/VishnuMashalkar/"         },
];

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 1040, margin: "0 auto", padding: "100px 24px 80px" }}>
      <SectionHeader label="Background" title="About Me" sub="CSE student at BMS College. I learn by building real things." />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }}>
        {/* Identity */}
        <div>
          <div style={{
            width: 96, height: 96, borderRadius: 24,
            background: "linear-gradient(135deg, rgba(61,126,255,0.18), rgba(34,211,238,0.09))",
            border: "1px solid rgba(61,126,255,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Cabinet Grotesk',sans-serif",
            fontWeight: 900, fontSize: 36, color: tokens.accent,
            letterSpacing: "-0.05em", marginBottom: 28,
            boxShadow: "0 0 40px rgba(61,126,255,0.14)",
          }}>
            VM
          </div>

          <h3 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 4 }}>
            Vishnu Mashalkar
          </h3>
          <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: 12.5, color: tokens.accent, marginBottom: 20 }}>
            // frontend-focused MERN developer
          </div>
          <p style={{ fontSize: 14.5, color: tokens.text2, lineHeight: 1.8, marginBottom: 16 }}>
            I&apos;m a CSE student at BMS College of Engineering, Bengaluru. My approach is simple: build things to understand them deeply. Real projects, real problems, production mindset.
          </p>
          <p style={{ fontSize: 14.5, color: tokens.text2, lineHeight: 1.8, marginBottom: 32 }}>
            I gravitate toward the interface layer — where engineering precision and design intent meet. Full-stack capable, but I care most about the experience you deliver to users.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {SOCIALS.map(({ icon, label, val, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "12px 16px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 10, textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = "rgba(61,126,255,0.2)"; el.style.background = "rgba(61,126,255,0.04)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,0.06)"; el.style.background = "rgba(255,255,255,0.02)"; }}
              >
                <span style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>{icon}</span>
                <div>
                  <div style={{ fontSize: 10, color: tokens.text3, fontFamily: "'Geist Mono',monospace", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 13.5, color: tokens.text1, fontWeight: 500 }}>{val}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11, color: tokens.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 32, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 20, height: 1, background: tokens.accent }} /> Timeline
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 11, top: 8, bottom: 8, width: 1, background: "rgba(255,255,255,0.06)" }} />
            {MILESTONES.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex", gap: 24, marginBottom: 40,
                  opacity: 0, animation: `fadeUp 0.5s ease ${i * 0.1}s forwards`,
                }}
              >
                <div style={{
                  width: 24, height: 24, borderRadius: "50%",
                  border: `2px solid ${m.active ? tokens.accent : "rgba(255,255,255,0.10)"}`,
                  background: m.active ? "rgba(61,126,255,0.14)" : "rgba(12,16,24,1)",
                  flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                  zIndex: 1, position: "relative",
                  boxShadow: m.active ? "0 0 12px rgba(61,126,255,0.3)" : "none",
                }}>
                  {m.active && <span style={{ width: 8, height: 8, borderRadius: "50%", background: tokens.accent, display: "inline-block" }} />}
                </div>
                <div>
                  <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: 10.5, color: tokens.text3, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{m.year}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 4, display: "flex", alignItems: "center", gap: 10 }}>
                    {m.title}
                    {m.badge && <Badge variant={m.badge === "open" ? "green" : "accent"}>{m.badge}</Badge>}
                  </div>
                  <div style={{ fontSize: 13.5, color: tokens.text2 }}>{m.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
