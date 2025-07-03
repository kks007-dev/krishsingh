'use client';

import { portfolio } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

type Project = (typeof portfolio.work)[0];

const icons: { [key: string]: React.ElementType } = {
  github: Github,
  'external-link': ExternalLink,
};

const constellationLayouts: { [key: number]: { positions: { x: string; y: string }[], edges: number[][] } } = {
  2: { 
    positions: [
      { x: '30%', y: '50%' },
      { x: '70%', y: '50%' },
    ],
    edges: [[0, 1]],
  },
  3: {
    positions: [
      { x: '50%', y: '25%' },
      { x: '25%', y: '75%' },
      { x: '75%', y: '75%' },
    ],
    edges: [[0, 1], [1, 2], [2, 0]],
  },
  4: {
    positions: [
      { x: '50%', y: '15%' },
      { x: '20%', y: '45%' },
      { x: '80%', y: '45%' },
      { x: '50%', y: '85%' },
    ],
    edges: [[0, 1], [0, 2], [1, 3], [2, 3]],
  },
  5: {
    positions: [
      { x: '15%', y: '30%' },
      { x: '35%', y: '60%' },
      { x: '55%', y: '35%' },
      { x: '75%', y: '65%' },
      { x: '95%', y: '30%' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4]],
  },
};

const getConstellationLayout = (numProjects: number) => {
    const key = Math.min(numProjects, 5);
    if (key < 2) return { positions: [], edges: [] };
    
    let layout = constellationLayouts[key];
    
    return layout;
}


const ProjectTooltipContent = ({ project }: { project: Project }) => (
  <div className="glass-card w-64 max-w-xs overflow-hidden p-0">
    <div className="p-4">
      <h3 className="text-lg font-bold font-headline mb-1 text-glow">{project.title}</h3>
      <p className="text-muted-foreground text-xs mb-3 h-16 overflow-auto">{project.description}</p>
      <div className="flex flex-wrap gap-1 mb-3">
        {project.tags.map(tag => (
          <Badge key={tag} variant="outline" className="text-xs border-accent/50 text-accent bg-accent/10 backdrop-blur-sm">{tag}</Badge>
        ))}
      </div>
      <div className="flex gap-3 items-center">
        {project.links.map((link, index) => {
          const Icon = icons[link.icon];
          if (!Icon) return null;
          return (
            <Link href={link.url} key={index} target="_blank" rel="noopener noreferrer" className="text-accent/80 hover:text-accent transition-colors flex items-center gap-2">
              <Icon className="w-4 h-4" />
            </Link>
          )
        })}
      </div>
    </div>
    <div className="aspect-video overflow-hidden">
      <Image
        src={project.image}
        alt={project.title}
        width={256}
        height={144}
        className="w-full h-full object-cover"
        data-ai-hint={project.aiHint}
      />
    </div>
  </div>
);

const Star = ({ project, position }: { project: Project; position: { x: string; y: string } }) => (
  <Tooltip delayDuration={100}>
    <TooltipTrigger asChild>
      <div
        className="absolute animate-star-pulse"
        style={{ left: position.x, top: position.y, transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.6)] cursor-pointer transition-all duration-300 hover:scale-125"></div>
      </div>
    </TooltipTrigger>
    <TooltipContent className="bg-transparent border-none p-0 shadow-none">
      <ProjectTooltipContent project={project} />
    </TooltipContent>
  </Tooltip>
);

export default function ConstellationDisplay({ projects }: { projects: Project[] }) {
  const { positions, edges } = getConstellationLayout(projects.length);
  
  if (!positions || !edges) {
    return <div className="text-center text-muted-foreground">Not enough projects to form a constellation.</div>
  }

  return (
    <TooltipProvider>
      <div className="relative w-full max-w-3xl mx-auto h-[400px] md:h-[500px]">
        <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: -1 }}>
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.5 }} />
              <stop offset="100%" style={{ stopColor: 'hsl(var(--secondary))', stopOpacity: 0.5 }} />
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
                  strokeWidth="1.5"
                  className="animate-line-draw"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
             )
          })}
        </svg>
        {projects.slice(0, positions.length).map((project, index) => (
          <Star key={index} project={project} position={positions[index]} />
        ))}
      </div>
    </TooltipProvider>
  );
}
