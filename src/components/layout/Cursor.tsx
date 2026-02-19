"use client";
import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const ring = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const raf  = useRef<number>(0);

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top  = e.clientY + "px";
      }
      ring.current.tx = e.clientX;
      ring.current.ty = e.clientY;
      document.documentElement.style.setProperty("--mx", e.clientX + "px");
      document.documentElement.style.setProperty("--my", e.clientY + "px");
    };

    const animate = () => {
      ring.current.x = lerp(ring.current.x, ring.current.tx, 0.12);
      ring.current.y = lerp(ring.current.y, ring.current.ty, 0.12);
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + "px";
        ringRef.current.style.top  = ring.current.y + "px";
      }
      raf.current = requestAnimationFrame(animate);
    };
    animate();

    const enter = () => setHovering(true);
    const leave = () => setHovering(false);

    const attachListeners = () => {
      document.querySelectorAll("button, a, [data-hover]").forEach((el) => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    };
    attachListeners();

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className={`cursor-dot  ${hovering ? "hovering" : ""}`} />
      <div ref={ringRef} className={`cursor-ring ${hovering ? "hovering" : ""}`} />
    </>
  );
}
