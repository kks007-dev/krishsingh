'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, Text, Float, Sparkles, Html } from '@react-three/drei';
import * as THREE from 'three';

// Skills Data with simple-icons slugs
// We can use the simple-icons CDN to get clean SVGs
const skills = [
    { name: "JavaScript", slug: "javascript", color: "#F7DF1E" },
    { name: "TypeScript", slug: "typescript", color: "#3178C6" },
    { name: "React", slug: "react", color: "#61DAFB" },
    { name: "Next.js", slug: "nextdotjs", color: "#ffffff" },
    { name: "Node.js", slug: "nodedotjs", color: "#339933" },
    { name: "GraphQL", slug: "graphql", color: "#E10098" },
    { name: "PostgreSQL", slug: "postgresql", color: "#4169E1" },
    { name: "MongoDB", slug: "mongodb", color: "#47A248" },
    { name: "Docker", slug: "docker", color: "#2496ED" },
    { name: "Git", slug: "git", color: "#F05032" },
    { name: "Figma", slug: "figma", color: "#F24E1E" },
    { name: "Python", slug: "python", color: "#3776AB" },
    { name: "Java", slug: "openjdk", color: "#007396" }, // openjdk often works better
    { name: "CSS", slug: "css", color: "#1572B6" },
    { name: "HTML", slug: "html5", color: "#E34F26" },
    { name: "C++", slug: "cplusplus", color: "#00599C" },
    { name: "Flutter", slug: "flutter", color: "#02569B" },
];

function SkillItem({ item, index, total }: { item: any, index: number, total: number }) {
    const ref = useRef<THREE.Group>(null);
    const radius = 7;
    const angle = (index / total) * Math.PI * 2;

    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    useFrame(() => {
        if (ref.current) {
            ref.current.lookAt(0, 0, 0);
            ref.current.rotation.y += Math.PI;
        }
    });

    return (
        <group ref={ref} position={[x, 0, z]}>
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
                <Html transform distanceFactor={5} style={{ pointerEvents: 'none' }}>
                    <div className={`
                relative flex flex-col items-center justify-center p-6 w-40 h-40 
                rounded-[2rem] border-2 backdrop-blur-md
                bg-black/60 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.3)]
                transition-all duration-300 group-hover:border-blue-400 group-hover:scale-105
            `}
                    >
                        <img
                            src={`https://cdn.simpleicons.org/${item.slug}/${item.color.replace('#', '')}`}
                            alt={item.name}
                            className="w-16 h-16 mb-3 drop-shadow-md"
                            onError={(e) => {
                                // Fallback if image fails
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                        <span className="text-white font-bold text-sm uppercase tracking-wider text-center">{item.name}</span>
                    </div>
                </Html>
            </Float>
        </group>
    );
}

function RotatingGroup() {
    const group = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (group.current) {
            group.current.rotation.y += delta * 0.15;
        }
    });

    return (
        <group ref={group} rotation={[0.05, 0, 0]}>
            {skills.map((skill, i) => (
                <SkillItem key={i} item={skill} index={i} total={skills.length} />
            ))}
        </group>
    );
}

export default function SkillsBelt3D() {
    return (
        <div className="w-full h-[280px] md:h-[350px] relative mt-2 mb-8 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
                <Canvas camera={{ position: [0, 0, 14], fov: 45 }}>
                    <ambientLight intensity={1} />
                    <Sparkles count={40} scale={12} size={2} speed={0.4} opacity={0.2} color="#ffffff" />
                    <RotatingGroup />
                </Canvas>
            </div>
        </div>
    );
}
