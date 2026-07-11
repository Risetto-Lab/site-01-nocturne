"use client";

import { Fragment } from "react";

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
  const track = [...SERVICES, ...SERVICES];

  return (
    <section
      id="services"
      className="w-full overflow-hidden border-y border-white/5 bg-bg py-12"
      aria-label="Services"
    >
      <div className="flex w-max animate-marquee items-center gap-10 motion-reduce:animate-none">
        {track.map((service, i) => (
          <Fragment key={i}>
            <MarqueeWord word={service} accent={i % 6 === 2} />
            <span className="text-2xl text-accent/60" aria-hidden>
              ✦
            </span>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
