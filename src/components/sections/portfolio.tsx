'use client';

import { useState } from 'react';
import { portfolio } from '@/lib/data';
import ConstellationDisplay from '@/components/constellation-display';
import ProjectCard from '@/components/project-card';

const SectionTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <h2 className={`text-5xl font-bold text-center font-headline mb-12 md:mb-20 text-glow ${className}`}>{children}</h2>
);

type Project = (typeof portfolio.work)[0];

export default function Portfolio() {
  const [activeWorkProject, setActiveWorkProject] = useState<Project | null>(portfolio.work[0]);
  const [activePassionProject, setActivePassionProject] = useState<Project | null>(portfolio.passion[0]);

  return (
    <section id="portfolio" className="py-20 px-4 container space-y-32">
      <div>
        <SectionTitle>
          Experience Constellation
        </SectionTitle>
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[500px]">
          <ConstellationDisplay 
            projects={portfolio.work} 
            name="orion" 
            onStarHover={setActiveWorkProject}
            activeProject={activeWorkProject}
          />
          <div className="flex justify-center md:justify-start">
            <ProjectCard project={activeWorkProject} />
          </div>
        </div>
      </div>

      <div>
        <SectionTitle>
          Passion Constellation
        </SectionTitle>
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[500px]">
          <ConstellationDisplay 
            projects={portfolio.passion} 
            name="andromeda"
            onStarHover={setActivePassionProject}
            activeProject={activePassionProject}
          />
          <div className="flex justify-center md:justify-start">
            <ProjectCard project={activePassionProject} />
          </div>
        </div>
      </div>
    </section>
  );
}
