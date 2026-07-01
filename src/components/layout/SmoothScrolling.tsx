"use client";

import { ReactLenis } from "lenis/react";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function SmoothScrolling({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Register GSAP globally
    gsap.registerPlugin(ScrollTrigger);
    
    // Make sure GSAP doesn't lag behind the Lenis scroll
    gsap.ticker.lagSmoothing(0);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08, // Smoothness (lower = smoother)
        smoothWheel: true,
      }}
    >
      {/* We bypass the TS error here */}
      {children as any}
    </ReactLenis>
  );
}