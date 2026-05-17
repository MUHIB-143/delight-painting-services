'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const globalScrollState = {
  progress: 0,
  velocity: 0,
};

function ScrollManager() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const decayInterval = setInterval(() => {
      globalScrollState.velocity *= 0.9;
    }, 16);

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        globalScrollState.progress = self.progress;
        globalScrollState.velocity = (self.getVelocity() / 1000) * self.direction;
      }
    });

    return () => {
      st.kill();
      clearInterval(decayInterval);
    };
  }, []);
  
  return null;
}

function PaintRibbon() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const curve = useMemo(() => {
    const points = [];
    for (let i = 0; i < 80; i++) {
      const t = i / 79;
      // High frequency twists like liquid flow
      const x = Math.sin(t * Math.PI * 4) * 2.5;
      const y = (t - 0.5) * 50;
      const z = Math.cos(t * Math.PI * 3) * 1.5;
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  const geometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 300, 0.4, 32, false);
  }, [curve]);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uVelocity: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float uTime;
        uniform float uScroll;
        uniform float uVelocity;
        
        void main() {
          vUv = uv;
          vPosition = position;
          vec3 pos = position;
          
          // Ribbon moves smoothly upwards as we scroll down
          pos.y += uScroll * 25.0;
          
          float wave = sin(pos.y * 0.2 + uTime * 0.5) * 0.3;
          pos.x += wave * (1.0 + abs(uVelocity) * 2.0);
          pos.z += cos(pos.y * 0.2 + uTime * 0.3) * 0.2;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float uTime;
        uniform float uScroll;

        vec3 hsl2rgb(float h, float s, float l) {
          float c = (1.0 - abs(2.0 * l - 1.0)) * s;
          float x = c * (1.0 - abs(mod(h * 6.0, 2.0) - 1.0));
          float m = l - c * 0.5;
          vec3 rgb;
          if (h < 1.0/6.0) rgb = vec3(c, x, 0.0);
          else if (h < 2.0/6.0) rgb = vec3(x, c, 0.0);
          else if (h < 3.0/6.0) rgb = vec3(0.0, c, x);
          else if (h < 4.0/6.0) rgb = vec3(0.0, x, c);
          else if (h < 5.0/6.0) rgb = vec3(x, 0.0, c);
          else rgb = vec3(c, 0.0, x);
          return rgb + m;
        }

        void main() {
          // Looping Gradient Color
          float hue = mod(vUv.x * 0.8 + uTime * 0.15 + uScroll * 1.5, 1.0);
          vec3 finalColor = hsl2rgb(hue, 0.9, 0.6);
          
          float glow = 0.8 + 0.2 * sin(vUv.x * 20.0 + uTime * 2.0);
          
          // Fade out edges
          float edge = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
          
          gl_FragColor = vec4(finalColor * glow * edge, 0.9 * edge);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }, []);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime;
      materialRef.current.uniforms.uScroll.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uScroll.value,
        globalScrollState.progress,
        0.1
      );
      materialRef.current.uniforms.uVelocity.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uVelocity.value,
        globalScrollState.velocity,
        0.1
      );
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, -5, -2]}>
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </mesh>
  );
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 300;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;

      // Drops of Red, Yellow, Blue
      const val = Math.random();
      let color;
      if (val < 0.33) {
        color = new THREE.Color('#D32F2F');
      } else if (val < 0.66) {
        color = new THREE.Color('#ECC94B');
      } else {
        color = new THREE.Color('#3182CE');
      }
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05 + globalScrollState.progress * 1.5;
      pointsRef.current.position.y = globalScrollState.progress * 15.0; // move particles up over scroll
      
      const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < posArray.length / 3; i++) {
        posArray[i * 3 + 1] += Math.sin(clock.getElapsedTime() + i) * 0.005;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.6} sizeAttenuation blending={THREE.AdditiveBlending} />
    </points>
  );
}

function useScrollEntry(ref: React.RefObject<THREE.Group | null>, range: [number, number], startPosition: [number, number, number], endPosition: [number, number, number], defaultRotation: [number, number, number]) {
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = THREE.MathUtils.clamp((globalScrollState.progress - range[0]) / (range[1] - range[0]), 0, 1);
    const smoothT = THREE.MathUtils.smoothstep(t, 0, 1);
    
    ref.current.position.x = THREE.MathUtils.lerp(startPosition[0], endPosition[0], smoothT);
    ref.current.position.y = THREE.MathUtils.lerp(startPosition[1], endPosition[1], smoothT) + Math.sin(clock.getElapsedTime() * 0.5 + startPosition[0]) * 0.2;
    ref.current.position.z = THREE.MathUtils.lerp(startPosition[2], endPosition[2], smoothT);
    
    // Scale up smoothly
    const scale = THREE.MathUtils.lerp(0.001, 1, smoothT);
    ref.current.scale.setScalar(scale);
    
    // Rotation mapping based on globalScrollState velocity
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, defaultRotation[0] + globalScrollState.velocity * -2.0, 0.1);
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, defaultRotation[1] + globalScrollState.velocity * 3.0, 0.1);
    ref.current.rotation.z = defaultRotation[2] + Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
  });
}

function PaintBrush({ startPosition, endPosition, rotation, color, range }: any) {
  const ref = useRef<THREE.Group>(null);
  useScrollEntry(ref, range, startPosition, endPosition, rotation);

  return (
    <group ref={ref} visible={false} onUpdate={self => self.visible = true}>
      {/* Handle */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.2, 8]} />
        <meshStandardMaterial color="#8B7355" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Ferrule */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.15, 8]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Bristles */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[0.1, 0.4, 0.06]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
    </group>
  );
}

function PaintCan({ startPosition, endPosition, range }: any) {
  const ref = useRef<THREE.Group>(null);
  useScrollEntry(ref, range, startPosition, endPosition, [0, 0, 0]);

  return (
    <group ref={ref} visible={false} onUpdate={self => self.visible = true}>
      <mesh>
        <cylinderGeometry args={[0.25, 0.25, 0.5, 16]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.85} roughness={0.15} />
      </mesh>
      {/* Lid */}
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.27, 0.27, 0.06, 16]} />
        <meshStandardMaterial color="#A0A0A0" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Paint drip */}
      <mesh position={[0.2, 0.1, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#00A3FF" emissive="#00A3FF" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function SprayGun({ startPosition, endPosition, range }: any) {
  const ref = useRef<THREE.Group>(null);
  useScrollEntry(ref, range, startPosition, endPosition, [0, 0, -0.3]);

  return (
    <group ref={ref} visible={false} onUpdate={self => self.visible = true}>
      {/* Body */}
      <mesh>
        <boxGeometry args={[0.15, 0.35, 0.12]} />
        <meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Nozzle */}
      <mesh position={[0.15, 0.15, 0]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.02, 0.04, 0.2, 8]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Handle */}
      <mesh position={[0, -0.25, 0]}>
        <boxGeometry args={[0.08, 0.2, 0.08]} />
        <meshStandardMaterial color="#555" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}

function PaintRoller({ startPosition, endPosition, range }: any) {
  const ref = useRef<THREE.Group>(null);
  useScrollEntry(ref, range, startPosition, endPosition, [0, 0, 0]);

  return (
    <group ref={ref} visible={false} onUpdate={self => self.visible = true}>
      {/* Roller cylinder */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.5, 16]} />
        <meshStandardMaterial color="#E8E0D0" roughness={0.95} />
      </mesh>
      {/* Handle trunk */}
      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.5, 8]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.85} roughness={0.15} />
      </mesh>
      {/* Handle bend */}
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.08, 8]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.85} roughness={0.15} />
      </mesh>
    </group>
  );
}

export default function Scene3D() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        background: 'linear-gradient(-45deg, #020617, #1E293B, #0F172A, #2e1065, #1e1b4b)',
        backgroundSize: '400% 400%',
        animation: 'bgGradientLoop 20s ease infinite',
      }}
    >
      <ScrollManager />
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[5, 10, 5]} intensity={2.0} color="#D32F2F" />
        <pointLight position={[-5, -5, 3]} intensity={1.5} color="#3182CE" />
        <directionalLight position={[0, 10, 0]} intensity={1.5} color="#ECC94B" castShadow />

        <PaintRibbon />
        <FloatingParticles />

        {/* Phase 1: Paintbrushes and Cans (Scroll 0 to 0.25) */}
        <PaintBrush startPosition={[-8, -5, 0]} endPosition={[-3, 2, 1]} rotation={[0.2, 0.4, 0.3]} color="#FFD700" range={[0.0, 0.2]} />
        <PaintBrush startPosition={[8, -5, 0]} endPosition={[3.5, 0, 0.5]} rotation={[-0.1, 0.5, -0.2]} color="#FF6B6B" range={[0.05, 0.25]} />
        <PaintCan startPosition={[-8, -10, -2]} endPosition={[-2.5, -1, 0]} range={[0.1, 0.3]} />
        <PaintCan startPosition={[8, -8, -1]} endPosition={[3, -2, -1]} range={[0.15, 0.35]} />

        {/* Phase 2: Spray Guns (Scroll 0.3 to 0.5) */}
        <SprayGun startPosition={[-8, -10, 0]} endPosition={[-3, 1, 1]} range={[0.3, 0.45]} />
        <SprayGun startPosition={[8, -10, 0]} endPosition={[2.5, 0, 0.5]} range={[0.35, 0.5]} />

        {/* Phase 3: Paint Rollers (Scroll 0.6 to 0.8) */}
        <PaintRoller startPosition={[-8, -10, 0]} endPosition={[-2, 0, 0.5]} range={[0.55, 0.7]} />
        <PaintRoller startPosition={[8, -10, 0]} endPosition={[2.5, 1, 1]} range={[0.65, 0.8]} />
      </Canvas>
    </div>
  );
}
