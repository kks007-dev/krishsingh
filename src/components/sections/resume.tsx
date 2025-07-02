import { resume } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Briefcase, GraduationCap } from 'lucide-react';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-5xl font-bold text-center font-headline mb-12 text-glow">{children}</h2>
);

export default function Resume() {
  return (
    <section id="resume" className="py-20 px-4 container">
        <SectionTitle>My Professional Journey</SectionTitle>
        <div className="glass-card p-8 md:p-12 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-16">
                <div className="md:col-span-3">
                    <h3 className="text-3xl flex items-center gap-3 font-bold font-headline mb-8 text-glow"><Briefcase className="w-8 h-8 text-accent" /> Experience</h3>
                    <div className="relative border-l-2 border-accent/20 pl-10 space-y-12">
                        {resume.experience.map((job, index) => (
                            <div key={index} className="relative">
                                <div className="absolute -left-[49px] top-1 h-6 w-6 rounded-full bg-accent flex items-center justify-center ring-8 ring-background">
                                    <Briefcase className="w-3 h-3 text-accent-foreground" />
                                </div>
                                <p className="text-sm text-muted-foreground">{job.duration}</p>
                                <h4 className="font-semibold text-lg">{job.role}</h4>
                                <p className="font-medium text-accent">{job.company}</p>
                                <p className="mt-2 text-sm text-muted-foreground">{job.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="md:col-span-2">
                    <h3 className="text-3xl flex items-center gap-3 font-bold font-headline mb-8 text-glow"><GraduationCap className="w-8 h-8 text-secondary" /> Education</h3>
                    <div className="space-y-6">
                         {resume.education.map((edu, index) => (
                            <div key={index}>
                                <h4 className="font-semibold text-lg">{edu.degree}</h4>
                                <p className="font-medium text-secondary">{edu.institution}</p>
                                <p className="text-sm text-muted-foreground">{edu.duration}</p>
                            </div>
                        ))}
                    </div>
                    <h3 className="text-3xl font-bold font-headline mt-12 mb-6 text-glow">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {resume.skills.map(skill => (
                            <Badge key={skill} variant="outline" className="text-sm font-medium border-accent/50 text-accent bg-accent/10">{skill}</Badge>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
