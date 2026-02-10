'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useScroll, ScrollControls, Line, Html, Float, Stars, Sparkles, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { resume } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';

// Reverse experience to go from recent to past
const experienceData = [...resume.experience].reverse();

const CURVE_SEGMENTS = 100;
const DISTANCE_PER_ITEM = 8;

interface ExperienceItemProps {
    item: any;
    position: THREE.Vector3;
    rotation: THREE.Euler;
    isLeft: boolean;
    opacity: number;
}

function ExperienceItem({ item, position, rotation, isLeft, opacity }: ExperienceItemProps) {
    return (
        <group position={position} rotation={rotation}>
            {/* The "Planet" Node */}
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                <mesh>
                    <sphereGeometry args={[0.4, 32, 32]} />
                    <meshStandardMaterial
                        color={isLeft ? "#60a5fa" : "#c084fc"}
                        emissive={isLeft ? "#2563eb" : "#9333ea"}
                        emissiveIntensity={2}
                        transparent
                        opacity={opacity}
                    />
                </mesh>
                <pointLight distance={3} intensity={2} color={isLeft ? "#60a5fa" : "#c084fc"} />
            </Float>

            {/* Connecting Line to Content */}
            <Line
                points={[[0, 0, 0], [isLeft ? -3 : 3, 0, 0]]}
                color={isLeft ? "#60a5fa" : "#c084fc"}
                transparent
                opacity={opacity * 0.3}
                lineWidth={1}
            />

            {/* Content Card HTML Overlay */}
            <Html
                position={[isLeft ? -3.2 : 3.2, 0, 0]}
                transform
                occlude="blending"
                distanceFactor={10}
                style={{
                    opacity: opacity,
                    transition: 'opacity 0.5s ease-out',
                    pointerEvents: opacity > 0.1 ? 'auto' : 'none',
                }}
            >
                <div className={`
                    w-[320px] md:w-[450px] p-6 rounded-2xl border backdrop-blur-md
                    transition-all duration-500 hover:scale-105 border-white/10
                    ${isLeft ? 'text-right bg-gradient-to-l from-blue-950/80 to-transparent pr-8 rounded-r-none border-r-4 border-r-blue-500' : 'text-left bg-gradient-to-r from-purple-950/80 to-transparent pl-8 rounded-l-none border-l-4 border-l-purple-500'}
                    shadow-[0_0_30px_rgba(0,0,0,0.3)]
                `}>
                    <h3 className="text-xl md:text-2xl font-bold text-white font-headline mb-1">{item.role}</h3>
                    <div className="text-xs md:text-sm font-bold text-accent mb-2 uppercase tracking-widest">{item.company}</div>
                    <p className="text-xs md:text-sm text-gray-300 leading-relaxed line-clamp-4">{item.description}</p>
                </div>
            </Html>
        </group>
    );
}

function Scene({ setAstroDate }: { setAstroDate: (date: string) => void }) {
    const scroll = useScroll();
    const { width, height } = useThree((state) => state.viewport);

    // Create a smooth gentle S-curve path
    const curve = useMemo(() => {
        const points = [];
        const count = experienceData.length;

        for (let i = 0; i < count; i++) {
            const t = i / (count - 1);
            const x = Math.sin(t * Math.PI * 4) * 2; // Gentle horizontal wave
            const y = -i * (DISTANCE_PER_ITEM / 2); // Vertical descent
            const z = -i * DISTANCE_PER_ITEM; // Forward movement (or backward into screen)
            points.push(new THREE.Vector3(x, y * 0.5, z));
        }

        // Add padding points for smooth entry/exit
        const startPoint = points[0].clone().add(new THREE.Vector3(0, 5, 10));
        const endPoint = points[points.length - 1].clone().add(new THREE.Vector3(0, -5, -10));

        return new THREE.CatmullRomCurve3(
            [startPoint, ...points, endPoint],
            false,
            'catmullrom',
            0.5
        );
    }, []);

    const linePoints = useMemo(() => curve.getPoints(300), [curve]);

    useFrame((state, delta) => {
        // Scroll offset 0..1
        const t = scroll.offset;

        // Map scroll to item index for date display
        // We want strict alignment: index 0 at start, index N at end
        // There are `experienceData.length` items.
        // We map t (0..1) to index (0 .. length-1)
        const totalItems = experienceData.length;
        const exactIndex = t * (totalItems - 1);
        const currentIndex = Math.round(exactIndex);
        const safeIndex = Math.min(Math.max(currentIndex, 0), totalItems - 1);

        // Update date in parent component
        const currentItem = experienceData[safeIndex];
        if (currentItem) {
            setAstroDate(currentItem.duration);
        }

        // Camera movement along the curve
        // We look slightly ahead
        const curveT = 0.1 + (t * 0.8); // Restrict to middle 80% of curve to avoid start/end padding artifacts
        const camPos = curve.getPoint(curveT);
        const lookAtT = Math.min(curveT + 0.05, 0.99);
        const lookAtPos = curve.getPoint(lookAtT);

        // Smooth camera dampening
        state.camera.position.lerp(new THREE.Vector3(camPos.x, camPos.y + 1, camPos.z + 6), 3 * delta);
        state.camera.lookAt(lookAtPos.x, lookAtPos.y, lookAtPos.z);
    });

    return (
        <group>
            {/* Guide Line */}
            <Line points={linePoints} color="white" opacity={0.1} transparent lineWidth={1} />

            {/* Render Items */}
            {experienceData.map((item, i) => {
                // Determine position on curve
                // We mapped the curve so items sit in the "middle" valid region
                // The curve has padding start/end, so items are distributed 
                const segmentStep = 0.8 / (experienceData.length - 1);
                const t = 0.1 + (i * segmentStep);
                const pos = curve.getPoint(t);
                const tangent = curve.getTangent(t);
                const rotation = new THREE.Euler(0, 0, 0); // Simplified rotation

                // Calculate opacity based on scroll distance logic would be complex in this setup
                // simplified: just show all, fog handles the distance fade

                return (
                    <ExperienceItem
                        key={i}
                        item={item}
                        position={pos}
                        rotation={rotation}
                        isLeft={i % 2 === 0}
                        opacity={1}
                    />
                );
            })}
        </group>
    );
}

export default function DeepSpaceJourney() {
    const [astroDate, setAstroDate] = useState(experienceData[0]?.duration || "Present");

    return (
        <div className="w-full h-[600px] md:h-[800px] bg-black/40 rounded-3xl overflow-hidden border border-white/10 relative shadow-2xl group">
            {/* Status HUD */}
            <div className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-start z-10 pointer-events-none">
                <div>
                    <h4 className="text-white/40 text-[10px] md:text-xs font-mono tracking-[0.2em] mb-1">MISSION LOG</h4>
                    <div className="text-cyan-400 font-bold font-headline text-sm md:text-base drop-shadow-md opacity-80">
                        TRAJECTORY LOCKED
                    </div>
                </div>

                <div className="text-right">
                    <h4 className="text-white/40 text-[10px] md:text-xs font-mono tracking-[0.2em] mb-1">STARDATE</h4>
                    <div className="text-purple-400 font-bold font-headline text-sm md:text-lg drop-shadow-[0_0_5px_rgba(168,85,247,0.5)] transition-all duration-300 max-w-[150px] md:max-w-[300px] text-right truncate">
                        {astroDate}
                    </div>
                </div>
            </div>

            <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ antialias: true }}>
                <color attach="background" args={['#050510']} />
                <fog attach="fog" args={['#050510', 5, 25]} />

                <ambientLight intensity={0.5} />
                <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
                <Sparkles size={2} color="#fff" scale={[30, 30, 30]} count={200} opacity={0.3} />

                <ScrollControls pages={experienceData.length * 0.8} damping={0.4} distance={1}>
                    <Scene setAstroDate={setAstroDate} />
                </ScrollControls>
            </Canvas>

            {/* Scroll Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/20 text-xs font-mono animate-pulse pointer-events-none">
                SCROLL TO EXPLORE HISTORY
            </div>

            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] rounded-3xl" />
        </div>
    );
}
