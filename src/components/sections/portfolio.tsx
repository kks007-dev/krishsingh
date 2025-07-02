import { portfolio } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';

const ProjectCard = ({ project, className }: { project: (typeof portfolio.work[0]), className?: string }) => (
    <div className={`group glass-card w-full max-w-sm shrink-0 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-cyan-500/20 hover:-translate-y-2 ${className}`}>
        <div className="p-6">
            <h3 className="text-2xl font-bold font-headline mb-2 text-glow">{project.title}</h3>
            <p className="text-muted-foreground mb-4 h-24 overflow-hidden">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => <Badge key={tag} variant="outline" className="border-accent/50 text-accent bg-accent/10 backdrop-blur-sm">{tag}</Badge>)}
            </div>
            <div className="flex gap-4">
                {project.links.map((link, index) => (
                    <Link href={link.url} key={index} target="_blank" rel="noopener noreferrer" className="text-accent/80 hover:text-accent transition-colors flex items-center gap-2">
                        <link.icon className="w-5 h-5" />
                    </Link>
                ))}
            </div>
        </div>
        <div className="aspect-video overflow-hidden">
            <Image 
                src={project.image} 
                alt={project.title} 
                width={600} 
                height={400} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                data-ai-hint={project.aiHint}
            />
        </div>
    </div>
);

const SectionTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <h2 className={`text-5xl font-bold text-center font-headline mb-20 text-glow ${className}`}>{children}</h2>
);

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 px-4 container">
      <SectionTitle>
        Work Constellation
      </SectionTitle>
      <div className="relative flex flex-wrap justify-center items-start gap-12 md:gap-16">
        {portfolio.work.map((project, index) => <ProjectCard key={project.title} project={project} className={index % 2 !== 0 ? 'md:mt-16' : ''} />)}
      </div>

      <div className="py-20" />

      <SectionTitle>
        Passion Nebula
      </SectionTitle>
      <div className="relative flex flex-wrap justify-center items-start gap-12 md:gap-16">
        {portfolio.passion.map((project, index) => <ProjectCard key={project.title} project={project} className={index % 2 !== 0 ? 'md:mt-16' : ''} />)}
      </div>
    </section>
  );
}
