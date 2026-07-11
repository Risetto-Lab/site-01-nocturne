"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import SectionLabel from "./SectionLabel";

type Project = {
  index: string;
  title: string;
  category: string;
  year: string;
  gradient: string;
};

const PROJECTS: Project[] = [
  {
    index: "01",
    title: "Vantablack Radio",
    category: "Brand & Sound Identity",
    year: "2025",
    gradient:
      "radial-gradient(120% 120% at 85% 15%, rgba(198,242,78,0.28) 0%, rgba(198,242,78,0.05) 35%, transparent 60%), linear-gradient(135deg, #23232f 0%, #0a0a0f 70%)",
  },
  {
    index: "02",
    title: "Hollow Moon",
    category: "Spatial Design",
    year: "2025",
    gradient:
      "radial-gradient(90% 90% at 20% 85%, rgba(138,138,150,0.35) 0%, rgba(138,138,150,0.08) 40%, transparent 65%), linear-gradient(160deg, #1a1a26 0%, #101018 60%, #0a0a0f 100%)",
  },
  {
    index: "03",
    title: "Afterglow Atlas",
    category: "Editorial & Motion",
    year: "2024",
    gradient:
      "radial-gradient(110% 110% at 75% 80%, rgba(120,110,180,0.30) 0%, rgba(120,110,180,0.06) 40%, transparent 65%), linear-gradient(140deg, #14141e 0%, #262336 55%, #0f0f16 100%)",
  },
  {
    index: "04",
    title: "Static Bloom",
    category: "Digital Product",
    year: "2024",
    gradient:
      "radial-gradient(100% 100% at 15% 20%, rgba(198,242,78,0.18) 0%, rgba(140,170,60,0.06) 40%, transparent 65%), linear-gradient(150deg, #1c2418 0%, #14141c 55%, #0a0a0f 100%)",
  },
];

function WorkCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const rotateX = useRef<gsap.QuickToFunc | null>(null);
  const rotateY = useRef<gsap.QuickToFunc | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !cardRef.current) return;

    if (!rotateX.current) {
      rotateX.current = gsap.quickTo(cardRef.current, "rotationX", {
        duration: 0.5,
        ease: "power3.out",
      });
      rotateY.current = gsap.quickTo(cardRef.current, "rotationY", {
        duration: 0.5,
        ease: "power3.out",
      });
    }

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    rotateX.current(y * -10);
    rotateY.current?.(x * 10);
  };

  const handleMouseLeave = () => {
    if (reduced || !cardRef.current) return;
    gsap.to(cardRef.current, { rotationX: 0, rotationY: 0, duration: 0.6, ease: "power3.out" });
  };

  return (
    <div
      className="group relative"
      style={{ perspective: "800px" }}
      data-cursor="grow"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/5 transition-colors duration-500 will-change-transform group-hover:border-accent/30"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ background: project.gradient }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent" />

        <span
          className="font-display absolute right-5 top-4 text-6xl font-semibold text-ink/10 transition-colors duration-500 group-hover:text-accent/25 sm:text-7xl"
          aria-hidden
        >
          {project.index}
        </span>

        <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-8">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">
            {project.category} — {project.year}
          </span>
          <div className="mt-2 flex items-baseline justify-between gap-4">
            <h3 className="font-display text-2xl font-semibold text-ink transition-colors duration-300 group-hover:text-accent sm:text-3xl">
              {project.title}
            </h3>
            <span
              className="translate-x-2 text-lg text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
              aria-hidden
            >
              →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SelectedWork() {
  return (
    <section id="work" className="w-full bg-bg px-6 py-32 sm:px-12 lg:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <SectionLabel index="02" title="Selected Work" />
        </div>
        <div className="mb-16 flex items-end justify-between lg:mb-20">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
            Work that ships
            <br />
            <span className="text-muted">after dark.</span>
          </h2>
          <span className="hidden pb-2 text-sm text-muted sm:block">04 projects</span>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          <div className="flex flex-col gap-6 sm:gap-8">
            <WorkCard project={PROJECTS[0]} />
            <WorkCard project={PROJECTS[2]} />
          </div>
          <div className="flex flex-col gap-6 sm:mt-24 sm:gap-8">
            <WorkCard project={PROJECTS[1]} />
            <WorkCard project={PROJECTS[3]} />
          </div>
        </div>
      </div>
    </section>
  );
}
