"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// Mouse position in -1..1, shared by every object in the scene.
// Tracked on window so the canvas itself can ignore pointer events.
const pointer = { x: 0, y: 0 };

type ShapeProps = {
  geometry: THREE.BufferGeometry;
  position: [number, number, number];
  scale: number;
  color: string;
  wireframe?: boolean;
  speed?: number;
  depth?: number; // how strongly it follows the mouse (parallax)
};

const Shape = ({ geometry, position, scale, color, wireframe, speed = 1, depth = 0.4 }: ShapeProps) => {
  const ref = useRef<THREE.Mesh>(null);
  const seed = useMemo(() => Math.random() * 100, []);

  useFrame((state, delta) => {
    const m = ref.current;
    if (!m) return;
    const t = state.clock.elapsedTime * speed + seed;
    m.rotation.x += delta * 0.25 * speed;
    m.rotation.y += delta * 0.35 * speed;
    // Gentle float plus mouse parallax, eased so motion stays smooth
    const tx = position[0] + pointer.x * depth;
    const ty = position[1] + Math.sin(t) * 0.18 + pointer.y * depth;
    m.position.x += (tx - m.position.x) * 0.05;
    m.position.y += (ty - m.position.y) * 0.05;
  });

  return (
    <mesh ref={ref} geometry={geometry} position={position} scale={scale}>
      {wireframe ? (
        <meshBasicMaterial color={color} wireframe transparent opacity={0.55} />
      ) : (
        <meshPhysicalMaterial
          color={color}
          metalness={0.35}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent
          opacity={0.85}
        />
      )}
    </mesh>
  );
};

const Particles = ({ count }: { count: number }) => {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.02;
    ref.current.rotation.x += (pointer.y * 0.08 - ref.current.rotation.x) * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#4C7DFE" size={0.035} sizeAttenuation transparent opacity={0.7} />
    </points>
  );
};

const Shapes = () => {
  const { viewport } = useThree();
  const w = viewport.width;
  const h = viewport.height;
  const small = w < 6; // phone-sized canvas

  const geo = useMemo(
    () => ({
      torus: new THREE.TorusGeometry(0.75, 0.22, 32, 96),
      octa: new THREE.OctahedronGeometry(1, 0),
      sphere: new THREE.IcosahedronGeometry(1, 4),
    }),
    []
  );

  // Positions are relative to the visible area so shapes hug the edges
  // and never sit on top of the headline or the photo.
  const s = small ? 0.45 : 0.62;
  return (
    <>
      <Shape geometry={geo.torus} position={[w * 0.43, -h * 0.2, 0]} scale={0.8 * s} color="#1E3FAE" speed={0.9} depth={0.35} />
      <Shape geometry={geo.octa} position={[-w * 0.42, -h * 0.24, -0.5]} scale={0.7 * s} color="#001959" speed={1.1} depth={0.45} />
      <Shape geometry={geo.sphere} position={[-w * 0.3, -h * 0.42, -1.5]} scale={0.35 * s} color="#8EAAFF" speed={1.3} depth={0.6} />
      <Shape geometry={geo.octa} position={[w * 0.3, -h * 0.42, -1.5]} scale={0.4 * s} color="#4C7DFE" wireframe speed={1.5} depth={0.6} />
    </>
  );
};

export default function HeroScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [small, setSmall] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setSmall(window.innerWidth < 768);

    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // Stop rendering when the hero is scrolled out of view (saves battery/CPU)
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (wrapRef.current) io.observe(wrapRef.current);

    return () => {
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden className="pointer-events-none absolute inset-0 animate-[fade-in_1.2s_ease-out_both]">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        frameloop={reduced ? "demand" : visible ? "always" : "never"}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 6, 5]} intensity={1.6} />
        <pointLight position={[-5, -3, 3]} intensity={30} color="#4C7DFE" />
        <Shapes />
        <Particles count={small ? 180 : 450} />
      </Canvas>
    </div>
  );
}
