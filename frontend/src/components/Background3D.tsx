import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(3000 * 3);
    
    for (let i = 0; i < 3000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
      ref.current.position.z = Math.sin(state.clock.elapsedTime * 0.05) * 2;
    }
  });

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#60a5fa"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const FloatingCube: React.FC<{ position: [number, number, number]; scale?: number; color?: string }> = ({ 
  position, 
  scale = 1, 
  color = "#3b82f6" 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4 + position[0]) * 0.8;
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.2 + position[1]) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[0.6, 0.6, 0.6]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.15}
        wireframe
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

const FloatingSphere: React.FC<{ position: [number, number, number]; scale?: number; color?: string }> = ({ 
  position, 
  scale = 1, 
  color = "#8b5cf6" 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.2 + position[2]) * 0.4;
      meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 0.3 + position[0]) * 0.6;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[0.4, 16, 16]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.2}
        wireframe
        emissive={color}
        emissiveIntensity={0.15}
      />
    </mesh>
  );
};

const FloatingTorus: React.FC<{ position: [number, number, number]; scale?: number; color?: string }> = ({ 
  position, 
  scale = 1, 
  color = "#06b6d4" 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.7;
      meshRef.current.position.z = position[2] + Math.cos(state.clock.elapsedTime * 0.3) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[0.5, 0.2, 8, 16]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.25}
        wireframe
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

const FloatingOctahedron: React.FC<{ position: [number, number, number]; scale?: number; color?: string }> = ({ 
  position, 
  scale = 1, 
  color = "#f59e0b" 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.6;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.25) * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.35 + position[2]) * 0.8;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <octahedronGeometry args={[0.4]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.18}
        wireframe
        emissive={color}
        emissiveIntensity={0.12}
      />
    </mesh>
  );
};

const WaveGrid: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.5 - 8;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -8, -5]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20, 32, 32]} />
      <meshStandardMaterial
        color="#1e40af"
        transparent
        opacity={0.1}
        wireframe
        emissive="#1e40af"
        emissiveIntensity={0.05}
      />
    </mesh>
  );
};

const Background3D: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 75 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#60a5fa" />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#8b5cf6" />
        <pointLight position={[0, 10, -10]} intensity={0.4} color="#06b6d4" />
        <spotLight position={[5, 5, 5]} intensity={0.5} color="#f59e0b" angle={0.3} />
        
        <ParticleField />
        <WaveGrid />
        
        {/* Floating Cubes */}
        <FloatingCube position={[-4, 3, -3]} scale={0.8} color="#3b82f6" />
        <FloatingCube position={[5, -2, -4]} scale={1.2} color="#1e40af" />
        <FloatingCube position={[-3, -4, -2]} scale={0.6} color="#60a5fa" />
        <FloatingCube position={[2, 4, -5]} scale={1} color="#2563eb" />
        
        {/* Floating Spheres */}
        <FloatingSphere position={[4, 4, -3]} scale={0.9} color="#8b5cf6" />
        <FloatingSphere position={[-5, 2, -5]} scale={1.1} color="#a855f7" />
        <FloatingSphere position={[3, -3, -2]} scale={0.7} color="#c084fc" />
        <FloatingSphere position={[-2, -2, -4]} scale={1.3} color="#7c3aed" />
        
        {/* Floating Torus */}
        <FloatingTorus position={[0, 2, -6]} scale={0.8} color="#06b6d4" />
        <FloatingTorus position={[-6, -1, -3]} scale={1} color="#0891b2" />
        <FloatingTorus position={[6, 1, -4]} scale={0.6} color="#22d3ee" />
        
        {/* Floating Octahedrons */}
        <FloatingOctahedron position={[2, -5, -3]} scale={0.9} color="#f59e0b" />
        <FloatingOctahedron position={[-4, 5, -4]} scale={0.7} color="#d97706" />
        <FloatingOctahedron position={[5, 3, -6]} scale={1.1} color="#fbbf24" />
      </Canvas>
    </div>
  );
};

export default Background3D;