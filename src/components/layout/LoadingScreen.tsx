"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Tight timing: Boots in 1.8s, fades in 0.5s
    const t1 = setTimeout(() => setFadeOut(true), 1800);
    const t2 = setTimeout(() => setVisible(false), 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0 }}
        style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "#0a0a0a",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexDirection: "column", gap: 32,
          opacity: fadeOut ? 0 : 1,
          transition: "opacity 0.5s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Mascot + Boot Sequence */}
        <div className="flex flex-col items-center gap-6">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 rounded-full border-[3px] border-[#ededed] overflow-hidden bg-[#111] p-1"
          >
            <img 
              src="/mascot.png" 
              alt="Mascot" 
              className="w-full h-full object-cover rounded-full" 
            />
          </motion.div>

          {/* Terminal Boot Text */}
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#ededed]/60">
            Initializing System_VM...
          </div>
        </div>

        {/* Brutalist Progress Bar */}
        <div className="w-[200px] h-2 border-[2px] border-[#ededed] p-[2px]">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-full bg-[#E2FF32] shadow-[0_0_12px_rgba(226,255,50,0.6)]"
          />
        </div>

        {/* Loading Percentage */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-black text-[#ededed] text-lg uppercase"
        >
          {/* Simple JS counter for effect */}
          <Counter />%
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Simple internal helper for the percentage number
function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => (prev < 100 ? prev + 1 : 100));
    }, 15);
    return () => clearInterval(interval);
  }, []);
  return <>{count}</>;
}