"use client";
import { useState } from "react";
import { tokens } from "@/lib/tokens";
import GlowButton from "@/components/ui/GlowButton";
import SectionHeader from "@/components/ui/SectionHeader";

const SOCIALS = [
  { icon: "✉",  label: "Email",   val: "vishnumashalkar@gmail.com",     href: "mailto:vishnumashalkar@gmail.com"      },
  { icon: "⌥",  label: "GitHub",  val: "github.com/vishnu062006",      href: "https://github.com/vishnu062006"      },
  { icon: "in", label: "LinkedIn",val: "linkedin.com/in/vishnumashalkar",  href: "https://linkedin.com/in/vishnumashalkar" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: "", email: "", message: "" }); }, 3000);
  };

  const inputStyle = (id: string): React.CSSProperties => ({
    width: "100%",
    background: "rgba(12,16,24,0.8)",
    border: `1px solid ${focused === id ? "rgba(61,126,255,0.35)" : "rgba(255,255,255,0.06)"}`,
    borderRadius: 10, padding: "12px 16px",
    fontSize: 14, color: tokens.text1,
    fontFamily: "'Cabinet Grotesk', sans-serif",
    outline: "none", transition: "border-color 0.2s, box-shadow 0.2s",
    boxShadow: focused === id ? "0 0 0 3px rgba(61,126,255,0.08)" : "none",
  });

  return (
    <div style={{ maxWidth: 1040, margin: "0 auto", padding: "100px 24px 80px" }}>
      <SectionHeader
        label="Get in Touch"
        title="Let's Talk"
        sub="Open to internships, full-time roles, collabs, and anything interesting."
        center
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 60, alignItems: "start" }}>
        {/* Left */}
        <div>
          <p style={{ fontSize: 15, color: tokens.text2, lineHeight: 1.75, marginBottom: 32 }}>
            Whether you&apos;re a recruiter, a senior engineer, or a founder — I&apos;m always open to a good conversation.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {SOCIALS.map(({ icon, label, val, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "16px 18px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 12, textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = "rgba(61,126,255,0.22)"; el.style.background = "rgba(61,126,255,0.04)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,0.06)"; el.style.background = "rgba(255,255,255,0.02)"; }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700 }}>{icon}</div>
                <div>
                  <div style={{ fontSize: 10.5, color: tokens.text3, fontFamily: "'Geist Mono',monospace", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>{label}</div>
                  <div style={{ fontSize: 14, color: tokens.text1, fontWeight: 500 }}>{val}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handle} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {(["name", "email"] as const).map((id) => (
            <div key={id}>
              <label style={{ display: "block", fontFamily: "'Geist Mono',monospace", fontSize: 11, color: tokens.text3, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 7 }}>
                {id}
              </label>
              <input
                type={id === "email" ? "email" : "text"}
                required
                placeholder={id === "email" ? "your@email.com" : "Your name"}
                value={form[id]}
                onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
                onFocus={() => setFocused(id)}
                onBlur={() => setFocused(null)}
                style={inputStyle(id)}
              />
            </div>
          ))}
          <div>
            <label style={{ display: "block", fontFamily: "'Geist Mono',monospace", fontSize: 11, color: tokens.text3, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 7 }}>
              Message
            </label>
            <textarea
              required
              rows={5}
              placeholder="What's on your mind?"
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
              style={{ ...inputStyle("message"), resize: "none" }}
            />
          </div>
          <GlowButton
            primary
            type="submit"
            style={{
              alignSelf: "flex-start",
              background: sent ? "rgba(16,185,129,0.8)" : undefined,
              borderColor: sent ? "rgba(16,185,129,0.5)" : undefined,
            }}
          >
            {sent ? "Message Sent ✓" : "Send Message →"}
          </GlowButton>
        </form>
      </div>
    </div>
  );
}
