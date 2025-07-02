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

const starPositions = [
  { x: '15%', y: '20%' },
  { x: '85%', y: '20%' },
  { x: '50%', y: '50%' },
  { x: '25%', y: '80%' },
  { x: '75%', y: '80%' },
];

const icons: { [key: string]: React.ElementType } = {
  github: Github,
  'external-link': ExternalLink,
};

const ProjectTooltipContent = ({ project }: { project: Project }) => (
  <div className="glass-card w-80 max-w-sm overflow-hidden p-0">
    <div className="p-6">
      <h3 className="text-xl font-bold font-headline mb-2 text-glow">{project.title}</h3>
      <p className="text-muted-foreground text-sm mb-4 h-20 overflow-auto">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map(tag => (
          <Badge key={tag} variant="outline" className="border-accent/50 text-accent bg-accent/10 backdrop-blur-sm">{tag}</Badge>
        ))}
      </div>
      <div className="flex gap-4 items-center">
        {project.links.map((link, index) => {
          const Icon = icons[link.icon];
          if (!Icon) return null;
          return (
            <Link href={link.url} key={index} target="_blank" rel="noopener noreferrer" className="text-accent/80 hover:text-accent transition-colors flex items-center gap-2">
              <Icon className="w-5 h-5" />
            </Link>
          )
        })}
      </div>
    </div>
    <div className="aspect-video overflow-hidden">
      <Image
        src={project.image}
        alt={project.title}
        width={320}
        height={180}
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
        <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_12px_4px_rgba(255,255,255,0.7)] cursor-pointer transition-all duration-300 hover:scale-125"></div>
      </div>
    </TooltipTrigger>
    <TooltipContent className="bg-transparent border-none p-0 shadow-none">
      <ProjectTooltipContent project={project} />
    </TooltipContent>
  </Tooltip>
);

export default function ConstellationDisplay({ projects }: { projects: Project[] }) {
  const positions = projects.slice(0, starPositions.length).map((_, i) => starPositions[i]);

  const getEdges = (numProjects: number) => {
    if (numProjects < 2) return [];
    const edges = [];
    for (let i = 0; i < numProjects - 1; i++) {
        edges.push([i, i + 1]);
    }
    if (numProjects > 2) {
        edges.push([numProjects-1, 0]);
    }
    return edges;
  };

  const edges = getEdges(projects.length);

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
