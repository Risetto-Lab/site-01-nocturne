"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Project = {
  title: string;
  category: string;
  year: string;
  gradient: string;
};

const PROJECTS: Project[] = [
  {
    title: "Vantablack Radio",
    category: "Brand & Sound Identity",
    year: "2025",
    gradient: "linear-gradient(135deg, #1c1c26 0%, #0a0a0f 55%, #2a3a1a 100%)",
  },
  {
    title: "Hollow Moon",
    category: "Spatial Design",
    year: "2025",
    gradient: "linear-gradient(160deg, #12121a 0%, #1c1c26 40%, #c6f24e1a 100%)",
  },
  {
    title: "Afterglow Atlas",
    category: "Editorial & Motion",
    year: "2024",
    gradient: "linear-gradient(140deg, #0a0a0f 0%, #232030 50%, #1c1c26 100%)",
  },
  {
    title: "Static Bloom",
    category: "Digital Product",
    year: "2024",
    gradient: "linear-gradient(150deg, #1c1c26 0%, #0a0a0f 60%, #4a5a2a 100%)",
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
      className="group relative cursor-none"
      style={{ perspective: "800px" }}
      data-cursor="grow"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/5 transition-transform duration-300 will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
          style={{ background: project.gradient }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
        <div className="relative z-10 flex h-full flex-col justify-end p-6">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">
            {project.category} — {project.year}
          </span>
          <h3 className="font-display mt-2 text-2xl font-semibold text-ink sm:text-3xl">
            {project.title}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default function SelectedWork() {
  return (
    <section id="work" className="w-full bg-bg px-6 py-32 sm:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex items-end justify-between">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Selected Work
          </h2>
          <span className="hidden text-sm text-muted sm:block">04 projects</span>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <WorkCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
