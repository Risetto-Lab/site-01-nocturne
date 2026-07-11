"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function StatNumber({
  value,
  pad = true,
  suffix = "",
  className,
}: {
  value: number;
  pad?: boolean;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const format = (n: number) =>
    `${pad ? String(Math.round(n)).padStart(2, "0") : Math.round(n)}${suffix}`;

  useEffect(() => {
    if (reduced || !ref.current) return;

    const counter = { n: 0 };
    const el = ref.current;
    const tween = gsap.to(counter, {
      n: value,
      duration: 1.4,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = format(counter.n);
      },
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, value, pad, suffix]);

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
