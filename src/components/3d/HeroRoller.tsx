'use client';

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function RollerModel() {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
       group.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
       group.current.rotation.x = Math.sin(state.clock.elapsedTime * 1.3) * 0.1;
       group.current.position.y = Math.sin(state.clock.elapsedTime * 2.5) * 0.15;
    }
  });

  return (
    <group ref={group} rotation={[0.5, -0.2, 0.1]} scale={1.8}>
      {/* Fluffy Roller Cylinder */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
         <cylinderGeometry args={[0.55, 0.55, 2.4, 64]} />
         <meshStandardMaterial color="#FFFFFF" roughness={0.8} metalness={0.2} />
      </mesh>
      
      {/* DELIGHT Branding painted on Roller */}
      <Suspense fallback={null}>
        <Text
          position={[0, 0.08, 0.56]} // Slightly above massive cylinder surface
          rotation={[0, 0, 0]}
          fontSize={0.35}
          color="#D32F2F"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
          fontWeight="900"
          letterSpacing={0.05}
          anchorX="center"
          anchorY="middle"
        >
          DELIGHT
        </Text>
        <Text
          position={[0, -0.18, 0.56]}
          rotation={[0, 0, 0]}
          fontSize={0.11}
          color="#3182CE"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
          fontWeight="700"
          letterSpacing={0.2}
          anchorX="center"
          anchorY="middle"
        >
          PAINTING SERVICES
        </Text>
      </Suspense>

      {/* Metal Arm Framework */}
      <mesh position={[-1.3, -0.7, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 1.6, 32]} />
        <meshStandardMaterial color="#C0C0C0" metalness={1.0} roughness={0.1} />
      </mesh>
      <mesh position={[-1.3, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.3, 32]} />
        <meshStandardMaterial color="#C0C0C0" metalness={1.0} roughness={0.1} />
      </mesh>
      <mesh position={[-0.65, -1.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 1.4, 32]} />
        <meshStandardMaterial color="#C0C0C0" metalness={1.0} roughness={0.1} />
      </mesh>
      <mesh position={[0, -2.4, 0]}>
        <cylinderGeometry args={[0.15, 0.12, 1.8, 32]} />
        <meshStandardMaterial color="#111" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}

export default function HeroRoller() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <Canvas camera={{ position: [0, -1, 7], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={2.5} color="#00A3FF" />
        <directionalLight position={[-10, 5, 5]} intensity={2.0} color="#00F0FF" />
        <pointLight position={[0, 0, 5]} intensity={2.0} color="#fff" />
        
        <group position={[0.2, 1.2, 0]}>
          <RollerModel />
        </group>
        
        <ContactShadows position={[0, -2.8, 0]} opacity={0.6} scale={14} blur={3} far={5} />
      </Canvas>
    </div>
  );
}
