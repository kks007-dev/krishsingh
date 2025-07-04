'use client';

import type { portfolio } from '@/lib/data';
import React from 'react';
import { cn } from '@/lib/utils';

type Project = (typeof portfolio.work)[0];

type ConstellationName = 'orion' | 'andromeda';

type ConstellationPosition = { x: string; y: string; className?: string };

const predefinedConstellations: Record<
  ConstellationName,
  { positions: ConstellationPosition[]; edges: number[][] }
> = {
  orion: {
    positions: [
      { x: '28.75%', y: '16.25%', className: 'bg-red-400' }, // Project 1 Betelgeuse -> Swapped to be a project
      { x: '71.25%', y: '22.5%' }, // Project 2 Bellatrix -> Swapped
      { x: '60%', y: '81.25%', className: 'bg-blue-300' }, // Project 3 Rigel -> Swapped
      { x: '47.5%', y: '50%' }, // Alnitak
      { x: '55%', y: '52.5%' }, // Alnilam
      { x: '62.5%', y: '55%' }, // Mintaka
      { x: '43.75%', y: '85%' }, // Saiph
      { x: '55.625%', y: '61.25%' }, // Sword1
      { x: '56.875%', y: '65%' }, // Sword2
      { x: '57.5%', y: '68.75%' }, // Sword3
      { x: '85%', y: '31.25%' }, // Bow1
      { x: '88.75%', y: '37.5%' }, // Bow2
      { x: '87.5%', y: '43.75%' }, // Bow3
      { x: '83.75%', y: '50%' }, // Bow4
      { x: '22.5%', y: '10%' }, // Club1
      { x: '15%', y: '5%' }, // Club2
    ],
    edges: [
      [0, 4], // Betelgeuse to Alnilam
      [1, 4], // Bellatrix to Alnilam
      [3, 4], // Alnitak to Alnilam
      [4, 5], // Alnilam to Mintaka
      [4, 8], // Alnilam to Sword2
      [7, 8], // Sword1 to Sword2
      [8, 9], // Sword2 to Sword3
      [3, 6], // Alnitak to Saiph
      [5, 2], // Mintaka to Rigel
      [0, 14], // Betelgeuse to Club1
      [14, 15], // Club1 to Club2
      [1, 10], // Bellatrix to Bow1
      [10, 11], // Bow1 to Bow2
      [11, 12], // Bow2 to Bow3
      [12, 13], // Bow3 to Bow4
    ],
  },
  andromeda: {
    positions: [
      { x: '25%', y: '18.75%' }, // Project 1 (Alpheratz)
      { x: '56.25%', y: '50%' }, // Project 2 (Mirach)
      { x: '37.5%', y: '31.25%' }, // DeltaAnd
      { x: '43.75%', y: '68.75%' }, // MuAnd
      { x: '81.25%', y: '62.5%' }, // Almach
      { x: '68.75%', y: '43.75%' }, // NuAnd
      { x: '18.75%', y: '31.25%' }, // Upper1
      { x: '12.5%', y: '43.75%' }, // Upper2
      { x: '31.25%', y: '12.5%' }, // Upper3
      { x: '87.5%', y: '25%' }, // Branch1
      { x: '93.75%', y: '18.75%' }, // Branch2
    ],
    edges: [
      [0, 2], // Alpheratz to DeltaAnd
      [2, 1], // DeltaAnd to Mirach
      [1, 3], // Mirach to MuAnd
      [1, 5], // Mirach to NuAnd
      [5, 4], // NuAnd to Almach
      [0, 6], // Alpheratz to Upper1
      [6, 7], // Upper1 to Upper2
      [0, 8], // Alpheratz to Upper3
      [4, 9], // Almach to Branch1
      [9, 10], // Branch1 to Branch2
    ],
  },
};

const Star = ({
  position,
  onMouseEnter,
  isActive,
}: {
  position: ConstellationPosition;
  onMouseEnter: () => void;
  isActive: boolean;
}) => (
  <div
    className="absolute transition-transform duration-300 ease-in-out"
    style={{ left: position.x, top: position.y, transform: 'translate(-50%, -50%)' }}
    onMouseEnter={onMouseEnter}
  >
    <div
      className={cn(
        "w-3 h-3 rounded-full cursor-pointer transition-all duration-300",
        isActive
          ? 'bg-accent shadow-[0_0_8px_2px_hsl(var(--accent))] scale-150'
          : 'bg-white shadow-[0_0_2px_0.5px_rgba(255,255,255,0.5)] hover:scale-125',
        position.className
      )}
    ></div>
  </div>
);

export default function ConstellationDisplay({
  projects,
  name,
  onStarHover,
  activeProject,
}: {
  projects: Project[];
  name: ConstellationName;
  onStarHover: (project: Project) => void;
  activeProject: Project | null;
}) {
  const { positions, edges } = predefinedConstellations[name];

  if (!positions || !edges) {
    return <div className="text-center text-muted-foreground">Could not find constellation data.</div>;
  }

  return (
    <div className="relative w-full max-w-lg mx-auto aspect-square">
      <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: -1 }}>
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(var(--secondary))', stopOpacity: 0.3 }} />
          </linearGradient>
        </defs>
        {edges.map(([startIdx, endIdx], i) => {
          if (!positions[startIdx] || !positions[endIdx]) return null;
          return (
            <line
              key={i}
              x1={positions[startIdx].x}
              y1={positions[startIdx].y}
              x2={positions[endIdx].x}
              y2={positions[endIdx].y}
              stroke="url(#line-gradient)"
              strokeWidth="1"
              className="animate-line-draw"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          );
        })}
      </svg>

      {/* Render interactive project stars */}
      {projects.map((project, index) => {
        if (!positions[index]) return null;
        return (
          <Star
            key={project.title}
            position={positions[index]}
            onMouseEnter={() => onStarHover(project)}
            isActive={activeProject?.title === project.title}
          />
        );
      })}

      {/* Render non-interactive background stars */}
      {positions.slice(projects.length).map((position, index) => (
        <div
          key={`bg-star-${index}`}
          className="absolute animate-star-pulse"
          style={{ left: position.x, top: position.y, transform: 'translate(-50%, -50%)' }}
        >
          <div className={cn("w-2 h-2 rounded-full bg-white/70 shadow-[0_0_4px_1px_rgba(255,255,255,0.3)]", position.className)}></div>
        </div>
      ))}
    </div>
  );
}
