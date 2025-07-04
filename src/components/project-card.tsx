'use client';

import type { portfolio } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';

type Project = (typeof portfolio.work)[0];

const icons: { [key: string]: React.ElementType } = {
  github: Github,
  'external-link': ExternalLink,
};

export default function ProjectCard({ project }: { project: Project | null }) {
  if (!project) return null;

  return (
    <div key={project.title} className="glass-card w-full max-w-md overflow-hidden p-0 animate-fade-in">
      <div className="p-6">
        <h3 className="text-2xl font-bold font-headline mb-2 text-glow">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 h-20 overflow-auto">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs border-accent/50 text-accent bg-accent/10 backdrop-blur-sm">{tag}</Badge>
          ))}
        </div>
        <div className="flex gap-4 items-center">
          {project.links.map((link, index) => {
            const Icon = icons[link.icon];
            if (!Icon) return null;
            return (
              <Link href={link.url} key={index} target="_blank" rel="noopener noreferrer" className="text-accent/80 hover:text-accent transition-colors flex items-center gap-2">
                <Icon className="w-5 h-5" />
                <span className="capitalize">{link.icon.replace('-', ' ')}</span>
              </Link>
            )
          })}
        </div>
      </div>
      <div className="aspect-video overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          width={450}
          height={253}
          className="w-full h-full object-cover"
          data-ai-hint={project.aiHint}
        />
      </div>
    </div>
  );
}
