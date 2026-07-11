"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "@/lib/useReducedMotion";

const HeroSceneInner = dynamic(() => import("./HeroSceneInner"), {
  ssr: false,
});

export default function HeroScene() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div
        className="h-full w-full rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(198,242,78,0.25), rgba(10,10,15,0) 60%)",
        }}
        aria-hidden
      />
    );
  }

  return <HeroSceneInner />;
}
