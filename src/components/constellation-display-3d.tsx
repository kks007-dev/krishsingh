'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float, Line } from '@react-three/drei';
import * as THREE from 'three';
import { portfolio } from '@/lib/data';

type Project = (typeof portfolio.work)[0];
type ConstellationName = 'orion' | 'andromeda';

// -----------------------------------------------------------------------------
// Helper: Map percentage strings (e.g. "28.75%") to 3D coordinates.
// -----------------------------------------------------------------------------
function parsePercentage(p: string, range: number) {
    const val = parseFloat(p);
    return (val / 100) * range - range / 2;
}

type ConstellationPosition2D = { x: string; y: string; className?: string };

const predefinedConstellations: Record<
    ConstellationName,
    { positions: ConstellationPosition2D[]; edges: number[][] }
> = {
    orion: {
        positions: [
            { x: '28.75%', y: '16.25%', className: 'bg-red-400' }, // 0
            { x: '71.25%', y: '22.5%' },                         // 1
            { x: '47.5%', y: '50%' },                             // 2
            { x: '55%', y: '52.5%' },                             // 3
            { x: '62.5%', y: '55%' },                             // 4
            { x: '43.75%', y: '85%' },                            // 5
            { x: '60%', y: '81.25%', className: 'bg-blue-300' },  // 6
            { x: '56.875%', y: '65%' },                           // 7
            { x: '85%', y: '31.25%' },                            // 8
            { x: '22.5%', y: '10%' },                             // 9
            { x: '55.625%', y: '61.25%' }, // 10
            { x: '57.5%', y: '68.75%' },   // 11
        ],
        edges: [
            [0, 3], [1, 3], [6, 4], [5, 2],
            [2, 3], [3, 4],
            [3, 7], [7, 10], [10, 11],
            [0, 9],
            [1, 8],
        ],
    },
    andromeda: {
        positions: [
            { x: '25%', y: '18.75%' },
            { x: '56.25%', y: '50%' },
            { x: '81.25%', y: '62.5%' },
            { x: '37.5%', y: '31.25%' },
            { x: '43.75%', y: '68.75%' },
            { x: '68.75%', y: '43.75%' },
            { x: '18.75%', y: '31.25%' },
            { x: '12.5%', y: '43.75%' },
            { x: '31.25%', y: '12.5%' },
            { x: '87.5%', y: '25%' },
            { x: '93.75%', y: '18.75%' },
            { x: '45%', y: '80%' }, // 11
            { x: '55%', y: '85%' }, // 12
        ],
        edges: [
            [0, 3], [3, 1], [1, 4], [1, 5], [5, 2],
            [0, 6], [6, 7], [0, 8], [2, 9], [9, 10],
            [4, 11], [11, 12],
        ],
    },
};

function StarNode({
    position,
    project,
    isActive,
    onHover,
}: {
    position: [number, number, number];
    project?: Project;
    isActive: boolean;
    onHover: (p: Project) => void;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            const scaleBase = hovered || isActive ? 2.2 : 1.4; // Slightly larger
            const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.15 + 1;
            meshRef.current.scale.setScalar(scaleBase * pulse);
        }
    });

    return (
        <mesh
            ref={meshRef}
            position={position}
            onClick={(e) => {
                e.stopPropagation();
                if (project) {
                    onHover(project);
                }
            }}
            onPointerOver={(e) => {
                if (e.pointerType === 'touch') return; // Disable hover for mobile
                e.stopPropagation();
                setHovered(true);
                if (project) {
                    document.body.style.cursor = 'pointer';
                    onHover(project);
                }
            }}
            onPointerOut={(e) => {
                if (e.pointerType === 'touch') return; // Disable hover for mobile
                setHovered(false);
                if (project) {
                    document.body.style.cursor = 'auto';
                }
            }}
        >
            <sphereGeometry args={[0.12, 32, 32]} />
            <meshStandardMaterial
                color={isActive || hovered ? '#3b82f6' : '#a5f3fc'}
                emissive={isActive || hovered ? '#2563eb' : '#67e8f9'}
                emissiveIntensity={isActive || hovered ? 3 : 1.5} // More vibrant default
                roughness={0.1}
                metalness={0.5}
            />
        </mesh>
    );
}

function ConstellationLines({
    positions,
    edges,
}: {
    positions: [number, number, number][];
    edges: number[][];
}) {
    return (
        <group>
            {edges.map(([start, end], i) => {
                if (!positions[start] || !positions[end]) return null;
                return (
                    <Line
                        key={i}
                        points={[positions[start], positions[end]]}
                        color="white"
                        opacity={0.3} // Slightly more visible lines
                        transparent
                        lineWidth={2.5} // Slightly bolder
                    />
                );
            })}
        </group>
    );
}

function ConstellationGroup({
    positions,
    edges,
    projects,
    onStarHover,
    activeProject
}: {
    positions: [number, number, number][];
    edges: number[][];
    projects: Project[];
    onStarHover: (project: Project | null) => void;
    activeProject: Project | null;
}) {
    // Find 3D position of active project for tooltip
    const activeIndex = useMemo(() => {
        if (!activeProject) return -1;
        return projects.findIndex(p => p.title === activeProject.title);
    }, [activeProject, projects]);

    const activePosition = activeIndex !== -1 ? positions[activeIndex] : null;

    return (
        <group
            rotation={[0, 0, 0]}
            scale={0.9}
        >
            {/* Lines */}
            <ConstellationLines positions={positions} edges={edges} />

            {/* Stars */}
            {positions.map((pos, idx) => {
                const project = idx < projects.length ? projects[idx] : undefined;
                return (
                    <StarNode
                        key={idx}
                        position={pos}
                        project={project}
                        isActive={activeProject?.title === project?.title}
                        onHover={onStarHover}
                    />
                );
            })}

            {/* Single Instance Tooltip */}
            {activeProject && activePosition && (
                <Html
                    position={activePosition}
                    distanceFactor={10}
                    style={{
                        pointerEvents: 'none',
                        transition: 'all 0.2s',
                    }}
                >
                    <div className="select-none px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium border border-white/20 whitespace-nowrap shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                        {activeProject.title}
                    </div>
                </Html>
            )}
        </group>
    );
}

export default function ConstellationDisplay3D({
    projects,
    name,
    onStarHover,
    activeProject,
}: {
    projects: Project[];
    name: ConstellationName;
    onStarHover: (project: Project | null) => void;
    activeProject: Project | null;
}) {
    const data = predefinedConstellations[name];

    // Convert 2D percentages to 3D positions
    const positions3D = useMemo(() => {
        if (!data) return [];
        return data.positions.map((p, idx) => {
            const x = parsePercentage(p.x, 10);
            const y = -parsePercentage(p.y, 10);
            const z = (Math.sin(idx * 123.45) * 2);
            return [x, y, z] as [number, number, number];
        });
    }, [name, data]);

    if (!data) return <div className="text-center">Constellation data not found</div>;

    return (
        <div className="relative w-full h-[500px] md:h-[600px] bg-transparent">
            <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
                {/* Lights */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={2} />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#a5f3fc" />

                {/* Controls */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 1.5}
                    minPolarAngle={Math.PI / 3}
                />

                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                    <ConstellationGroup
                        positions={positions3D}
                        edges={data.edges}
                        projects={projects}
                        onStarHover={onStarHover}
                        activeProject={activeProject}
                    />
                </Float>
            </Canvas>
        </div>
    );
}
