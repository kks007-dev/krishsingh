import { portfolio } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';

const ProjectCard = ({ project }: { project: (typeof portfolio.work[0]) }) => (
    <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 border-transparent hover:border-accent">
        <CardHeader className="p-0">
            <div className="aspect-video overflow-hidden">
                <Image 
                    src={project.image} 
                    alt={project.title} 
                    width={600} 
                    height={400} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    data-ai-hint={project.aiHint}
                />
            </div>
            <div className="p-6">
                <CardTitle className="pt-2 font-headline">{project.title}</CardTitle>
                <CardDescription className="pt-2">{project.description}</CardDescription>
            </div>
        </CardHeader>
        <CardContent className="p-6 pt-0">
            <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => <Badge key={tag} variant="secondary" className="bg-secondary/10 text-secondary-foreground border-secondary/20">{tag}</Badge>)}
            </div>
            <div className="flex gap-4">
                {project.links.map((link, index) => (
                    <Link href={link.url} key={index} target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-accent transition-colors">
                        <link.icon className="w-5 h-5" />
                    </Link>
                ))}
            </div>
        </CardContent>
    </Card>
);

const SectionTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <h2 className={`text-4xl font-bold text-center font-headline mb-12 ${className}`}>{children}</h2>
);

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 px-4 container">
      <SectionTitle>
        My <span className="text-gradient-accent bg-accent-gradient">Work</span>
      </SectionTitle>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {portfolio.work.map(project => <ProjectCard key={project.title} project={project} />)}
      </div>

      <SectionTitle>
        Passion <span className="text-gradient-secondary bg-secondary-gradient">Projects</span>
      </SectionTitle>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
        {portfolio.passion.map(project => <ProjectCard key={project.title} project={project} />)}
      </div>
    </section>
  );
}
