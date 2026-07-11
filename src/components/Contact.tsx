"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useIsCoarsePointer } from "@/lib/useIsCoarsePointer";
import Reveal from "./Reveal";

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
      className="flex w-full flex-col items-center justify-center bg-bg px-6 py-40 text-center sm:px-12 lg:py-56"
    >
      <Reveal y={32} className="flex flex-col items-center">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
          <span className="text-accent">04</span>
          <span className="h-px w-8 bg-muted/40" aria-hidden />
          <span>Get in touch</span>
          <span className="h-px w-8 bg-muted/40" aria-hidden />
          <span className="text-accent">04</span>
        </div>
        <p className="font-display mt-10 max-w-2xl text-2xl font-medium text-muted sm:text-3xl">
          Got something that keeps you up at night?
        </p>
      </Reveal>
      <Reveal y={48} delay={0.1} className="w-full">
        <div ref={wrapRef} className="mt-6 flex items-center justify-center">
          <a
            ref={linkRef}
            href="mailto:hello@nocturne.studio"
            data-cursor="grow"
            className="font-display group inline-block break-all text-[9vw] font-semibold leading-none tracking-tight text-ink transition-colors duration-300 hover:text-accent sm:text-6xl lg:text-7xl"
          >
            hello@nocturne.studio
            <span className="mt-3 block h-[3px] w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </a>
        </div>
      </Reveal>
      <p className="mt-12 max-w-sm text-sm text-muted">
        NOCTURNE Studio — a fictional creative practice.
        Currently taking on a small number of projects for 2026.
      </p>
    </section>
  );
}
