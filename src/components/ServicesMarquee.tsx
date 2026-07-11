"use client";

const SERVICES = [
  "BRAND IDENTITY",
  "MOTION DESIGN",
  "SPATIAL DESIGN",
  "ART DIRECTION",
  "SOUND DESIGN",
  "DIGITAL PRODUCT",
];

export default function ServicesMarquee() {
  const track = [...SERVICES, ...SERVICES];

  return (
    <section
      id="services"
      className="w-full overflow-hidden border-y border-white/5 bg-bg py-10"
      aria-label="Services"
    >
      <div className="flex w-max animate-marquee items-center gap-12 motion-reduce:animate-none">
        {track.map((service, i) => (
          <span
            key={i}
            className="font-display whitespace-nowrap text-[8vw] font-semibold leading-none tracking-tight sm:text-6xl"
            style={{
              WebkitTextStroke: "1.5px #F2F0EB",
              color: "transparent",
            }}
          >
            {service}
          </span>
        ))}
      </div>
    </section>
  );
}
