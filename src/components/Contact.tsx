"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useIsCoarsePointer } from "@/lib/useIsCoarsePointer";

export default function Contact() {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const coarse = useIsCoarsePointer();

  useEffect(() => {
    if (reduced || coarse) return;
    const wrap = wrapRef.current;
    const link = linkRef.current;
    if (!wrap || !link) return;

    const x = gsap.quickTo(link, "x", { duration: 0.5, ease: "power3.out" });
    const y = gsap.quickTo(link, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      x(relX * 0.3);
      y(relY * 0.3);
    };

    const onLeave = () => {
      x(0);
      y(0);
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);

    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced, coarse]);

  return (
    <section
      id="contact"
      className="flex w-full flex-col items-center justify-center bg-bg px-6 py-40 text-center sm:px-12"
    >
      <span className="text-xs uppercase tracking-[0.3em] text-muted">Get in touch</span>
      <div ref={wrapRef} className="mt-8 flex items-center justify-center">
        <a
          ref={linkRef}
          href="mailto:hello@nocturne.studio"
          data-cursor="grow"
          className="font-display inline-block break-all text-[9vw] font-semibold leading-none tracking-tight text-ink transition-colors duration-300 hover:text-accent sm:text-6xl lg:text-7xl"
        >
          hello@nocturne.studio
        </a>
      </div>
      <p className="mt-10 max-w-sm text-sm text-muted">
        NOCTURNE Studio — a fictional creative practice.
        Currently taking on a small number of projects for 2026.
      </p>
    </section>
  );
}
