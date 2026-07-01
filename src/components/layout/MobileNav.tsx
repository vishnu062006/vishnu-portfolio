"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Page = "home" | "projects" | "about" | "skills" | "contact";

const NAV_ITEMS: { id: Page; label: string }[] = [
  { id: "home",     label: "Home"     },
  { id: "projects", label: "Projects" },
  { id: "about",    label: "About"    },
  { id: "skills",   label: "Skills"   },
  { id: "contact",  label: "Contact"  },
];

export default function MobileNav({ active, onNavigate }: { active: Page; onNavigate: (p: Page) => void }) {
  const [open, setOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [open]);

  return (
    <>
      {/* Brutalist Hamburger Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative z-[110] flex flex-col items-center justify-center gap-[5px] w-12 h-12 bg-[#0a0a0a] border-[2px] border-[#ededed] shadow-[4px_4px_0px_rgba(237,237,237,0.5)] transition-all duration-200 active:translate-y-1 active:translate-x-1 active:shadow-none"
        aria-label="Toggle Menu"
      >
        <span 
          className={`block w-6 h-[2px] bg-[#ededed] transition-transform duration-300 origin-center ${
            open ? "rotate-45 translate-y-[7px]" : ""
          }`} 
        />
        <span 
          className={`block w-6 h-[2px] bg-[#ededed] transition-opacity duration-300 ${
            open ? "opacity-0" : "opacity-100"
          }`} 
        />
        <span 
          className={`block w-6 h-[2px] bg-[#ededed] transition-transform duration-300 origin-center ${
            open ? "-rotate-45 -translate-y-[7px]" : ""
          }`} 
        />
      </button>

      {/* Full Screen Menu & Overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)} 
              className="fixed inset-0 z-[100] bg-[#0a0a0a]/80 backdrop-blur-md" 
            />
            
            {/* Brutalist Dropdown Panel */}
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed top-[100px] left-4 right-4 z-[105] bg-[#111] border-[4px] border-[#ededed] p-6 shadow-[12px_12px_0px_#E2FF32] flex flex-col gap-3"
            >
              <div className="font-bold uppercase tracking-widest text-xs text-[#ededed]/50 mb-2 border-b-[2px] border-[#ededed]/20 pb-2">
                System Navigation
              </div>

              {NAV_ITEMS.map((item, i) => {
                const isActive = active === item.id;

                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                    onClick={() => { 
                      onNavigate(item.id); 
                      setTimeout(() => setOpen(false), 300); // Slight delay to show tap state
                    }}
                    className={`w-full flex items-center justify-between p-4 border-[2px] font-black uppercase tracking-wide text-xl transition-all duration-200 ${
                      isActive 
                        ? "bg-[#E2FF32] border-[#0a0a0a] text-[#0a0a0a] shadow-[4px_4px_0px_#0a0a0a] translate-x-2" 
                        : "bg-[#0a0a0a] border-[#ededed] text-[#ededed] hover:bg-[#ededed] hover:text-[#0a0a0a]"
                    }`}
                  >
                    <span>{item.label}</span>
                    
                    {/* Active State Indicator */}
                    {isActive && (
                      <span className="font-mono text-sm tracking-widest">
                        [ ACTIVE ]
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}