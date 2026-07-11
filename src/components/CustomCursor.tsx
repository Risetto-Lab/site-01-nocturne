"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useIsCoarsePointer } from "@/lib/useIsCoarsePointer";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const coarse = useIsCoarsePointer();
  const disabled = reduced || coarse;

  useEffect(() => {
    if (disabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const growTargets = 'a, button, [data-cursor="grow"]';

    const onOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest(growTargets)) {
        gsap.to(ring, { scale: 2.4, duration: 0.35, ease: "power3.out" });
        gsap.to(dot, { scale: 0, duration: 0.35, ease: "power3.out" });
      }
    };

    const onOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest(growTargets)) {
        gsap.to(ring, { scale: 1, duration: 0.35, ease: "power3.out" });
        gsap.to(dot, { scale: 1, duration: 0.35, ease: "power3.out" });
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    document.documentElement.classList.add("cursor-none-native");

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.classList.remove("cursor-none-native");
    };
  }, [disabled]);

  if (disabled) return null;

  return (
    <>
      <style jsx global>{`
        .cursor-none-native,
        .cursor-none-native * {
          cursor: none !important;
        }
      `}</style>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent mix-blend-difference"
        aria-hidden
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        aria-hidden
      />
    </>
  );
}
