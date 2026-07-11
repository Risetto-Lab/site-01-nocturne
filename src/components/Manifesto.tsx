"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const LINES = [
  "We do not chase trends.",
  "We chase the hour when the noise finally stops",
  "and the real idea shows up.",
  "NOCTURNE builds brands, motion, and space",
  "for people who think best in the dark.",
];

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !containerRef.current) return;

    const lines = containerRef.current.querySelectorAll<HTMLElement>(".manifesto-line");

    const ctx = gsap.context(() => {
      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { opacity: 0.08, yPercent: 30 },
          {
            opacity: 1,
            yPercent: 0,
            ease: "power3.out",
            duration: 1,
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              end: "top 40%",
              scrub: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="manifesto"
      className="relative w-full bg-bg px-6 py-32 sm:px-12 lg:py-48"
    >
      <div ref={containerRef} className="mx-auto max-w-5xl">
        {LINES.map((line, i) => (
          <p
            key={i}
            className={`manifesto-line font-display font-medium leading-[1.15] tracking-tight text-[7vw] sm:text-[4.5vw] lg:text-[3.2vw] ${
              i % 2 === 0 ? "text-ink" : "text-muted"
            } ${reduced ? "" : "opacity-[0.08]"}`}
          >
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}
