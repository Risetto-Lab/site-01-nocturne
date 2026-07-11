"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroScene from "./HeroScene";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { heroScrollState } from "@/lib/heroScrollState";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const manifestoRef = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !headlineRef.current) return;

    const split = new SplitText(headlineRef.current, {
      type: "chars",
      charsClass: "char",
    });

    gsap.set(split.chars, { clipPath: "inset(0 0 100% 0)", yPercent: 40 });

    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(split.chars, {
      clipPath: "inset(0 0 0% 0)",
      yPercent: 0,
      duration: 1,
      stagger: 0.035,
      ease: "power4.out",
    }).fromTo(
      manifestoRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );

    return () => {
      tl.kill();
      split.revert();
    };
  }, [reduced]);

  useEffect(() => {
    if (reduced || !sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        heroScrollState.progress = self.progress;
      },
    });

    // headline lifts and fades as the hero scrolls out, slightly ahead of the torus
    const exit = gsap.to(contentRef.current, {
      yPercent: -35,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "75% top",
        scrub: true,
      },
    });

    return () => {
      trigger.kill();
      exit.scrollTrigger?.kill();
      exit.kill();
      heroScrollState.progress = 0;
    };
  }, [reduced]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-6"
    >
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div className="h-[120vw] w-[120vw] max-h-[900px] max-w-[900px] sm:h-[70vw] sm:w-[70vw]">
          <HeroScene />
        </div>
      </div>

      <div ref={contentRef} className="relative z-10 flex flex-col items-center text-center">
        <h1
          ref={headlineRef}
          className="font-display select-none text-[18vw] font-semibold leading-[0.85] tracking-[-0.02em] text-ink sm:text-[14vw] lg:text-[11vw]"
        >
          NOCTURNE
        </h1>
        <p
          ref={manifestoRef}
          className="font-body mt-8 max-w-md text-balance text-base text-muted sm:text-lg"
        >
          A studio for ideas that only make sense{" "}
          <span className="text-ink">after midnight</span>.
        </p>
      </div>

      <div className="absolute bottom-8 left-6 z-10 hidden text-xs uppercase tracking-[0.3em] text-muted sm:block sm:left-12">
        EST. 2018 — London
      </div>
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted">
        Scroll
      </div>
      <div className="absolute bottom-8 right-6 z-10 hidden text-xs uppercase tracking-[0.3em] text-muted sm:block sm:right-12">
        Brand — Motion — Space
      </div>
    </section>
  );
}
