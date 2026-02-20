"use client";
import { useEffect, useState } from "react";
import { tokens } from "@/lib/tokens";

const COMMANDS = [
  { key: "home",     icon: "⌂", label: "Go Home",           shortcut: "H" },
  { key: "projects", icon: "◈", label: "View Projects",      shortcut: "P" },
  { key: "about",    icon: "◉", label: "About Me",           shortcut: "A" },
  { key: "skills",   icon: "◆", label: "Skills",             shortcut: "S" },
  { key: "contact",  icon: "✉", label: "Contact",            shortcut: "C" },
  { key: "resume",   icon: "↓", label: "Download Resume",    shortcut: "R" },
  { key: "github",   icon: "⌥", label: "Open GitHub",        shortcut: "G" },
  { key: "linkedin", icon: "in", label: "Open LinkedIn",     shortcut: "L" },
];

interface CommandPaletteProps {
  onNavigate: (p: string) => void;
}

export default function CommandPalette({ onNavigate }: CommandPaletteProps) {
  const [open, setOpen]     = useState(false);
  const [query, setQuery]   = useState("");
  const [selected, setSelected] = useState(0);

  const filtered = COMMANDS.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery("");
        setSelected(0);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown")  { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp")    { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
      if (e.key === "Enter" && filtered[selected]) {
        execute(filtered[selected].key);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, selected, filtered]);

  const execute = (key: string) => {
    setOpen(false);
    setQuery("");
    if (key === "resume")   { window.open("/resume.pdf"); return; }
    if (key === "github")   { window.open("https://github.com/vishnu", "_blank"); return; }
    if (key === "linkedin") { window.open("https://linkedin.com/in/vishnu", "_blank"); return; }
    onNavigate(key);
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(8px)",
          animation: "fadeIn 0.15s ease",
        }}
      />

      {/* Palette */}
      <div style={{
        position: "fixed",
        top: "28%", left: "50%",
        transform: "translateX(-50%)",
        width: "min(560px, 90vw)",
        zIndex: 1001,
        background: "rgba(12,16,24,0.98)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: 16,
        boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(61,126,255,0.1)",
        overflow: "hidden",
        animation: "fadeUp 0.2s cubic-bezier(0.22,1,0.36,1) both",
      }}>
        {/* Search */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "14px 18px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: tokens.text3, flexShrink: 0 }}>
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            autoFocus
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
            placeholder="Search commands..."
            style={{
              flex: 1, background: "none", border: "none", outline: "none",
              fontSize: 15, color: tokens.text1,
              fontFamily: "'Cabinet Grotesk', sans-serif",
            }}
          />
          <kbd style={{
            fontSize: 11, color: tokens.text3,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 5, padding: "2px 7px",
            fontFamily: "'Geist Mono', monospace",
          }}>ESC</kbd>
        </div>

        {/* Commands */}
        <div style={{ padding: 6, maxHeight: 320, overflow: "auto" }}>
          {filtered.length === 0 ? (
            <div style={{ padding: "24px", textAlign: "center", color: tokens.text3, fontSize: 13, fontFamily: "'Geist Mono', monospace" }}>
              No commands found
            </div>
          ) : filtered.map((cmd, i) => (
            <div
              key={cmd.key}
              onClick={() => execute(cmd.key)}
              onMouseEnter={() => setSelected(i)}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 12px", borderRadius: 8,
                background: selected === i ? "rgba(61,126,255,0.10)" : "transparent",
                cursor: "none", transition: "background 0.1s",
              }}
            >
              <span style={{
                width: 32, height: 32, borderRadius: 8,
                background: selected === i ? "rgba(61,126,255,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${selected === i ? "rgba(61,126,255,0.25)" : "rgba(255,255,255,0.06)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, flexShrink: 0,
                transition: "all 0.1s",
              }}>{cmd.icon}</span>
              <span style={{
                flex: 1, fontSize: 14, fontWeight: 500,
                color: selected === i ? tokens.text1 : tokens.text2,
                transition: "color 0.1s",
              }}>{cmd.label}</span>
              <kbd style={{
                fontSize: 11,
                color: selected === i ? tokens.accent : tokens.text3,
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${selected === i ? "rgba(61,126,255,0.2)" : "rgba(255,255,255,0.06)"}`,
                borderRadius: 5, padding: "2px 7px",
                fontFamily: "'Geist Mono', monospace",
                transition: "all 0.1s",
              }}>{cmd.shortcut}</kbd>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          padding: "10px 18px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex", gap: 16,
        }}>
          {[["↑↓", "navigate"], ["↵", "select"], ["esc", "close"]].map(([key, label]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <kbd style={{ fontSize: 10, color: tokens.text3, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 4, padding: "1px 6px", fontFamily: "'Geist Mono',monospace" }}>{key}</kbd>
              <span style={{ fontSize: 11, color: tokens.text3 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}