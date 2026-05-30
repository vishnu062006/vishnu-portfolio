"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { tokens } from "@/lib/tokens";
import GlowButton from "@/components/ui/GlowButton";
import SectionHeader from "@/components/ui/SectionHeader";

const SOCIALS = [
  { label: "Email", val: "vishnumashalkar@gmail.com", href: "mailto:vishnumashalkar@gmail.com" },
  { label: "GitHub", val: "github.com/vishnu062006", href: "https://github.com/vishnu062006" },
  { label: "LinkedIn", val: "linkedin.com/in/vishnumashalkar", href: "https://linkedin.com/in/vishnumashalkar" },
];

const STARTERS = ["AI product idea", "Startup MVP", "Internship role", "Collaboration"];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", message: "" });
    }, 3000);
  };

  const inputStyle = (id: string): React.CSSProperties => ({
    width: "100%",
    background: "rgba(6,10,16,0.66)",
    border: `1px solid ${focused === id ? "rgba(34,211,238,0.42)" : "rgba(255,255,255,0.08)"}`,
    borderRadius: 14,
    padding: "14px 16px",
    fontSize: 15,
    color: tokens.text1,
    fontFamily: "'Cabinet Grotesk', sans-serif",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
    boxShadow: focused === id ? "0 0 0 4px rgba(34,211,238,0.08), 0 0 28px rgba(34,211,238,0.08)" : "none",
  });

  return (
    <div className="premium-section-page">
      <div className="mesh-bg" />
      <SectionHeader
        label="Contact"
        title="Let's build something useful."
        sub="Open to AI product work, startup MVPs, internships, full-stack roles, and focused collaborations."
        center
      />

      <div className="contact-founder-grid">
        <motion.div
          className="contact-command premium-glass"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p>Best conversations start with a real problem.</p>
          <h3>Send the context, goal, and constraints. I will understand the product angle quickly.</h3>

          <div className="contact-starters">
            {STARTERS.map((starter) => (
              <button
                key={starter}
                type="button"
                data-hover
                onClick={() => setForm((current) => ({ ...current, message: `I want to discuss a ${starter.toLowerCase()}...` }))}
              >
                {starter}
              </button>
            ))}
          </div>

          <div className="contact-links">
            {SOCIALS.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" data-hover>
                <span>{social.label}</span>
                <strong>{social.val}</strong>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.form
          className="contact-form premium-glass"
          onSubmit={handle}
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
        >
          {(["name", "email"] as const).map((id) => (
            <div key={id}>
              <label>{id}</label>
              <input
                type={id === "email" ? "email" : "text"}
                required
                placeholder={id === "email" ? "your@email.com" : "Your name"}
                value={form[id]}
                onChange={(e) => setForm((current) => ({ ...current, [id]: e.target.value }))}
                onFocus={() => setFocused(id)}
                onBlur={() => setFocused(null)}
                style={inputStyle(id)}
              />
            </div>
          ))}

          <div>
            <label>message</label>
            <textarea
              required
              rows={7}
              placeholder="Tell me what you want to build, improve, or hire for."
              value={form.message}
              onChange={(e) => setForm((current) => ({ ...current, message: e.target.value }))}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
              style={{ ...inputStyle("message"), resize: "vertical", minHeight: 180 }}
            />
          </div>

          <GlowButton
            primary
            type="submit"
            style={{
              alignSelf: "flex-start",
              background: sent ? "rgba(16,185,129,0.82)" : undefined,
              borderColor: sent ? "rgba(16,185,129,0.5)" : undefined,
            }}
          >
            {sent ? "Message Sent" : "Send Message"}
          </GlowButton>
        </motion.form>
      </div>
    </div>
  );
}
