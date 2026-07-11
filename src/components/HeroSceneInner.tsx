"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { useIsCoarsePointer } from "@/lib/useIsCoarsePointer";
import { heroScrollState } from "@/lib/heroScrollState";

function TorusKnot({ detail }: { detail: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useThree(({ gl }) => {
    gl.setClearColor(0x000000, 0);
  });

  useFrame((state, delta) => {
    const progress = heroScrollState.progress;

    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.12;
      meshRef.current.rotation.y += delta * (0.18 + progress * 0.6);
    }
    mouse.current.x = state.pointer.x;
    mouse.current.y = state.pointer.y;
    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        mouse.current.x * 0.6,
        0.03
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        mouse.current.y * 0.3,
        0.03
      );
      const scale = 1 - progress * 0.45;
      groupRef.current.scale.setScalar(scale);
    }
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={groupRef} name="hero-torus-group">
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.1, 0.34, Math.max(detail, 32) * 4, Math.max(detail, 8)]} />
        <MeshTransmissionMaterial
          samples={detail > 64 ? 4 : 1}
          resolution={detail > 64 ? 256 : 128}
          thickness={0.6}
          roughness={0.05}
          transmission={1}
          ior={1.2}
          chromaticAberration={0.06}
          anisotropy={0.2}
          distortion={0.15}
          distortionScale={0.3}
          temporalDistortion={0.1}
          clearcoat={1}
          attenuationColor="#C6F24E"
          attenuationDistance={1.2}
          color="#0A0A0F"
        />
      </mesh>
      {/* lime rim light */}
      <pointLight position={[-2.5, 1.5, -2]} intensity={14} color="#C6F24E" distance={9} />
      <pointLight position={[2, -1.5, 2]} intensity={3} color="#8A8A96" distance={8} />
    </group>
  );
}

export default function HeroSceneInner() {
  const coarse = useIsCoarsePointer();
  const detail = coarse ? 16 : 96;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // pause the render loop entirely once the hero has scrolled out of view
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="h-full w-full">
      <Canvas
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        dpr={coarse ? 1 : [1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 2, 4]} intensity={0.6} color="#F2F0EB" />
      <TorusKnot detail={detail} />
      <Environment resolution={detail > 64 ? 128 : 32} frames={1}>
        <Lightformer
          intensity={6}
          color="#C6F24E"
          position={[-3, 1.5, -2]}
          scale={[6, 3, 1]}
          form="rect"
        />
        <Lightformer
          intensity={1.5}
          color="#8A8A96"
          position={[3, -2, 2]}
          scale={[4, 4, 1]}
          form="rect"
        />
        <Lightformer
          intensity={0.6}
          color="#F2F0EB"
          position={[0, 3, 3]}
          scale={[5, 5, 1]}
          form="ring"
        />
      </Environment>
      </Canvas>
    </div>
  );
}
