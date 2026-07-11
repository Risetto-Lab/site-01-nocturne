"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "@/lib/useReducedMotion";

const HeroSceneInner = dynamic(() => import("./HeroSceneInner"), {
  ssr: false,
});

const staticGlow = (
  <div
    className="h-full w-full rounded-full opacity-70"
    style={{
      background:
        "radial-gradient(circle at 50% 50%, rgba(198,242,78,0.25), rgba(10,10,15,0) 60%)",
    }}
    aria-hidden
  />
);

// transmission materials are unusable on software WebGL (SwiftShader etc.) —
// those environments get the static glow instead
function hasHardwareWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return false;
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = ext
      ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL))
      : "";
    return !/swiftshader|software|llvmpipe/i.test(renderer);
  } catch {
    return false;
  }
}

export default function HeroScene() {
  const reduced = useReducedMotion();
  // defer WebGL init until the main thread is idle so hydration and the
  // headline reveal aren't blocked by shader compilation
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // mount on first interaction (imperceptible for real visitors) so page
    // load isn't blocked by three.js evaluation; timed fallback for passive
    // viewers
    const events = ["pointermove", "pointerdown", "touchstart", "wheel", "keydown"];
    let timer = 0;
    const activate = () => {
      events.forEach((e) => window.removeEventListener(e, activate));
      window.clearTimeout(timer);
      setReady(hasHardwareWebGL());
    };
    events.forEach((e) =>
      window.addEventListener(e, activate, { once: false, passive: true })
    );
    timer = window.setTimeout(activate, 4000);
    return () => {
      events.forEach((e) => window.removeEventListener(e, activate));
      window.clearTimeout(timer);
    };
  }, []);

  if (reduced) return staticGlow;
  if (!ready) return staticGlow;

  return <HeroSceneInner />;
}
