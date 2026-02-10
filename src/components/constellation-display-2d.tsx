
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
      // Interactive Project Stars (10 total)
      { x: '28.75%', y: '16.25%', className: 'bg-red-400' }, // 0: Betelgeuse (NAACH)
      { x: '71.25%', y: '22.5%' },                         // 1: Bellatrix (FTC)
      { x: '47.5%', y: '50%' },                             // 2: Alnitak (S.T.A.R.S)
      { x: '55%', y: '52.5%' },                             // 3: Alnilam (TSA)
      { x: '62.5%', y: '55%' },                             // 4: Mintaka (Harmony Dance)
      { x: '43.75%', y: '85%' },                            // 5: Saiph (CyberPatriot)
      { x: '60%', y: '81.25%', className: 'bg-blue-300' },  // 6: Rigel (U of H)
      { x: '56.875%', y: '65%' },                           // 7: Sword (FRC)
      { x: '85%', y: '31.25%' },                            // 8: Bow (RICE)
      { x: '22.5%', y: '10%' },                             // 9: Club (VentureStarters)
      
      // Non-interactive background stars
      { x: '55.625%', y: '61.25%' }, // 10: Sword BG 1
      { x: '57.5%', y: '68.75%' },   // 11: Sword BG 2
      { x: '88.75%', y: '37.5%' },   // 12: Bow BG 1
      { x: '87.5%', y: '43.75%' },   // 13: Bow BG 2
      { x: '83.75%', y: '50%' },     // 14: Bow BG 3
      { x: '15%', y: '5%' },         // 15: Club BG 1
    ],
    edges: [
      // Main Body
      [0, 3], // Betelgeuse to Alnilam
      [1, 3], // Bellatrix to Alnilam
      [6, 4], // Rigel to Mintaka
      [5, 2], // Saiph to Alnitak

      // Belt
      [2, 3], // Alnitak to Alnilam
      [3, 4], // Alnilam to Mintaka

      // Sword
      [3, 7], // Alnilam to main Sword star
      [7, 10], // Main Sword to BG Sword
      [10, 11],

      // Club
      [0, 9], // Betelgeuse to main Club star
      [9, 15], // Main Club to BG Club

      // Bow
      [1, 8], // Bellatrix to main Bow star
      [8, 12],
      [12, 13],
      [13, 14],
    ],
  },
  andromeda: {
    positions: [
      { x: '25%', y: '18.75%' }, // Project 1 (Alpheratz)
      { x: '56.25%', y: '50%' }, // Project 2 (Mirach)
      { x: '81.25%', y: '62.5%' }, // Project 3 (Almach)
      { x: '37.5%', y: '31.25%' }, // Project 4
      { x: '43.75%', y: '68.75%' }, // Project 5
      { x: '68.75%', y: '43.75%' }, // Project 6
      { x: '18.75%', y: '31.25%' }, // Project 7
      { x: '12.5%', y: '43.75%' }, // Project 8
      { x: '31.25%', y: '12.5%' },
      { x: '87.5%', y: '25%' },
      { x: '93.75%', y: '18.75%' },
    ],
    edges: [
      [0, 3],
      [3, 1],
      [1, 4],
      [1, 5],
      [5, 2],
      [0, 6],
      [6, 7],
      [0, 8],
      [2, 9],
      [9, 10],
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
      {name === 'orion' && (
        <>
          <div className="absolute top-4 left-4 text-sm text-muted-foreground font-headline">2019</div>
          <div className="absolute bottom-4 right-4 text-sm text-muted-foreground font-headline">2025 - Current</div>
        </>
      )}
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
