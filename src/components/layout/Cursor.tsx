"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  
  // Track positions for the lerp calculation
  const ring = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const raf  = useRef<number>(0);

  useEffect(() => {
    // Hide the default cursor globally when this component mounts
    document.body.style.cursor = "none";

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      // 1. Instantly move the inner dot using GPU-accelerated transforms
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
      }
      
      // Update target coordinates for the trailing square
      ring.current.tx = e.clientX;
      ring.current.ty = e.clientY;
      
      // Keep CSS variables updated if you use them elsewhere
      document.documentElement.style.setProperty("--mx", e.clientX + "px");
      document.documentElement.style.setProperty("--my", e.clientY + "px");
    };

    const animate = () => {
      // 2. Smoothly interpolate the outer trailing square
      ring.current.x = lerp(ring.current.x, ring.current.tx, 0.15);
      ring.current.y = lerp(ring.current.y, ring.current.ty, 0.15);
      
      if (ringRef.current) {
        // Use translate3d to avoid layout thrashing and maintain 60fps
        ringRef.current.style.transform = `translate3d(calc(${ring.current.x}px - 50%), calc(${ring.current.y}px - 50%), 0) ${hovering ? "rotate(45deg) scale(0.8)" : "rotate(0deg) scale(1)"}`;
      }
      
      raf.current = requestAnimationFrame(animate);
    };
    animate();

    const enter = () => setHovering(true);
    const leave = () => setHovering(false);

    // Attach hover states to all interactive elements
    const attachListeners = () => {
      const interactiveElements = document.querySelectorAll("button, a, input, textarea, [data-hover]");
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
        // Force hide default cursor on interactive elements as well
        (el as HTMLElement).style.cursor = "none";
      });
    };
    
    // Slight delay to ensure DOM is painted before attaching listeners
    setTimeout(attachListeners, 100);

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
      document.body.style.cursor = "auto";
    };
  }, [hovering]);

  return (
    <>
      {/* Inner Dot: A stark Acid Yellow square with mix-blend mode to pop against dark backgrounds */}
      <div 
        ref={dotRef}  
        className={`fixed top-0 left-0 w-3 h-3 bg-[#E2FF32] pointer-events-none z-[9999] mix-blend-difference transition-transform duration-200 ${hovering ? "scale-150" : "scale-100"}`} 
      />
      
      {/* Outer Trail: A thick-bordered square that rotates into a diamond on hover */}
      <div 
        ref={ringRef} 
        className={`fixed top-0 left-0 w-12 h-12 border-[3px] pointer-events-none z-[9998] mix-blend-difference transition-colors duration-300 ease-out ${
          hovering 
            ? "border-[#E2FF32] bg-[#E2FF32]/10" 
            : "border-[#ededed]"
        }`} 
      />
    </>
  );
}