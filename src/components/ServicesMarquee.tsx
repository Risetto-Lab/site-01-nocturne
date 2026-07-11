"use client";

import { Fragment, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  "BRAND IDENTITY",
  "MOTION DESIGN",
  "SPATIAL DESIGN",
  "ART DIRECTION",
  "SOUND DESIGN",
  "DIGITAL PRODUCT",
];

function MarqueeWord({ word, accent }: { word: string; accent: boolean }) {
  if (accent) {
    return (
      <span className="font-display whitespace-nowrap text-[8vw] font-semibold leading-none tracking-tight text-accent sm:text-6xl">
        {word}
      </span>
    );
  }
  return (
    <span
      className="font-display whitespace-nowrap text-[8vw] font-semibold leading-none tracking-tight sm:text-6xl"
      style={{
        WebkitTextStroke: "1px #8A8A96",
        color: "transparent",
      }}
    >
      {word}
    </span>
  );
}

export default function ServicesMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const track = [...SERVICES, ...SERVICES];

  useEffect(() => {
    if (reduced || !trackRef.current || !sectionRef.current) return;

    const loop = gsap.to(trackRef.current, {
      xPercent: -50,
      repeat: -1,
      ease: "none",
      duration: 30,
    });

    // scroll velocity feeds marquee speed + skew; decays back to cruise when idle
    let velocity = 0;
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        velocity = self.getVelocity();
      },
    });

    const el = trackRef.current;
    const tick = () => {
      velocity *= 0.92;
      const target = gsap.utils.clamp(-2, 4, 1 + velocity / 600);
      loop.timeScale(gsap.utils.interpolate(loop.timeScale(), target, 0.1));
      gsap.set(el, {
        skewX: gsap.utils.clamp(-6, 6, velocity / 300),
      });
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      st.kill();
      loop.kill();
    };
  }, [reduced]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="w-full overflow-hidden border-y border-white/5 bg-bg py-12"
      aria-label="Services"
    >
      <ul className="sr-only">
        {SERVICES.map((service) => (
          <li key={service}>{service}</li>
        ))}
      </ul>
      <div ref={trackRef} className="flex w-max items-center gap-10" aria-hidden>
        {track.map((service, i) => (
          <Fragment key={i}>
            <MarqueeWord word={service} accent={i % 6 === 2} />
            <span className="text-2xl text-accent/60">✦</span>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
