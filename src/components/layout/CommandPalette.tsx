"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ================= CUSTOM INLINE SVGS =================
const HomeIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const ProjectIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
const UserIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const SkillIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
const MailIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const DownloadIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>;
const GithubIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17A5.05 5.05 0 0 0 19 5.5A5.05 5.05 0 0 0 19 2.5s-1.4-.45-4.5 1.6a15.65 15.65 0 0 0-8 0C3.4 2.05 2 2.5 2 2.5a5.05 5.05 0 0 0 0 3a5.05 5.05 0 0 0-1.5 2.3c0 5.76 3.35 6.78 6.5 7.16A4.8 4.8 0 0 0 6 18v4"/></svg>;
const LinkedinIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;

const COMMANDS = [
  { key: "home",     icon: <HomeIcon />,     label: "Go Home",           shortcut: "H" },
  { key: "projects", icon: <ProjectIcon />,  label: "View Projects",     shortcut: "P" },
  { key: "about",    icon: <UserIcon />,     label: "About Me",          shortcut: "A" },
  { key: "skills",   icon: <SkillIcon />,    label: "Skills",            shortcut: "S" },
  { key: "contact",  icon: <MailIcon />,     label: "Contact",           shortcut: "C" },
  { key: "resume",   icon: <DownloadIcon />, label: "Download Resume",   shortcut: "R" },
  { key: "github",   icon: <GithubIcon />,   label: "Open GitHub",       shortcut: "G" },
  { key: "linkedin", icon: <LinkedinIcon />, label: "Open LinkedIn",     shortcut: "L" },
];

interface CommandPaletteProps {
  onNavigate: (p: string) => void;
}

export default function CommandPalette({ onNavigate }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
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
    // Wired up with your exact deployment links
    if (key === "resume")   { window.open("/resume.pdf"); return; }
    if (key === "github")   { window.open("https://github.com/vishnu062006", "_blank"); return; }
    if (key === "linkedin") { window.open("https://linkedin.com/in/vishnumashalkar", "_blank"); return; }
    onNavigate(key);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Brutalist Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[1000] bg-[#0a0a0a]/80 backdrop-blur-sm"
          />

          {/* Palette Container */}
          <motion.div 
            initial={{ opacity: 0, y: 20, x: "-50%", scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: 10, x: "-50%", scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-[15vh] left-1/2 w-full max-w-2xl z-[1001] bg-[#111] border-[4px] border-[#ededed] shadow-[16px_16px_0px_#00E5FF] overflow-hidden"
          >
            {/* Search Header */}
            <div className="flex items-center gap-4 p-6 border-b-[4px] border-[#ededed] bg-[#0a0a0a]">
              <span className="text-[#E2FF32] font-black text-2xl animate-pulse">{'>'}</span>
              <input
                autoFocus
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
                placeholder="TYPE COMMAND..."
                className="flex-1 bg-transparent border-none outline-none text-2xl font-black uppercase text-[#ededed] placeholder:text-[#ededed]/20 tracking-wide"
              />
              <kbd className="hidden md:block text-xs font-bold uppercase tracking-widest text-[#0a0a0a] bg-[#ededed] border-[2px] border-[#0a0a0a] px-2 py-1 shadow-[2px_2px_0px_#00E5FF]">
                ESC
              </kbd>
            </div>

            {/* Commands List */}
            <div className="max-h-[360px] overflow-y-auto p-4 flex flex-col gap-2">
              {filtered.length === 0 ? (
                <div className="p-8 text-center text-xl font-black uppercase text-[#ededed]/30">
                  UNKNOWN COMMAND
                </div>
              ) : filtered.map((cmd, i) => {
                const isSelected = selected === i;
                
                return (
                  <div
                    key={cmd.key}
                    onClick={() => execute(cmd.key)}
                    onMouseEnter={() => setSelected(i)}
                    className={`flex items-center gap-6 p-4 border-[4px] cursor-pointer transition-all duration-100 ${
                      isSelected 
                        ? "bg-[#E2FF32] border-[#0a0a0a] text-[#0a0a0a] shadow-[4px_4px_0px_#0a0a0a] translate-x-2" 
                        : "bg-transparent border-transparent text-[#ededed] hover:bg-[#ededed]/5"
                    }`}
                  >
                    <span className="flex-shrink-0">
                      {cmd.icon}
                    </span>
                    <span className="flex-1 text-xl font-black uppercase tracking-tight">
                      {cmd.label}
                    </span>
                    <kbd className={`text-sm font-bold uppercase px-3 py-1 border-[2px] ${
                      isSelected 
                        ? "border-[#0a0a0a] bg-[#0a0a0a] text-[#E2FF32]" 
                        : "border-[#ededed]/20 text-[#ededed]/50"
                    }`}>
                      {cmd.shortcut}
                    </kbd>
                  </div>
                );
              })}
            </div>

            {/* Brutalist Footer */}
            <div className="p-4 border-t-[4px] border-[#ededed] bg-[#0a0a0a] flex flex-wrap gap-6 justify-center md:justify-start">
              {[
                { key: "↑↓", label: "NAVIGATE" }, 
                { key: "↵", label: "EXECUTE" }, 
                { key: "ESC", label: "ABORT" }
              ].map((item) => (
                <div key={item.key} className="flex items-center gap-2">
                  <kbd className="text-xs font-bold bg-[#ededed] text-[#0a0a0a] px-2 py-1 border-[2px] border-[#0a0a0a]">
                    {item.key}
                  </kbd>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#ededed]/50">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}