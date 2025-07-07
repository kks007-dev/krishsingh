'use client';

import { useState } from 'react';
import { resume, honors } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Briefcase, GraduationCap, Award } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-5xl font-bold text-center font-headline mb-12 text-glow">{children}</h2>
);

export default function Resume() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section id="resume" className="py-20 px-4 container">
        <SectionTitle>My Professional Journey</SectionTitle>
        <div className="glass-card p-8 md:p-12 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-16">
                <div className="md:col-span-3">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-3xl flex items-center gap-3 font-bold font-headline text-glow">
                            <Briefcase className="w-8 h-8 text-accent" /> Experience
                        </h3>
                        <div className="flex items-center gap-2 text-sm">
                            <Label htmlFor="experience-toggle" className={cn("transition-colors", !showDetails ? 'text-accent' : 'text-muted-foreground')}>Simple</Label>
                            <Switch
                                id="experience-toggle"
                                checked={showDetails}
                                onCheckedChange={setShowDetails}
                                aria-label="Toggle experience details"
                            />
                            <Label htmlFor="experience-toggle" className={cn("transition-colors", showDetails ? 'text-accent' : 'text-muted-foreground')}>Detailed</Label>
                        </div>
                    </div>

                    <div className="relative border-l-2 border-accent/20 pl-10 space-y-12">
                        {resume.experience.map((job, index) => (
                            <div key={index} className="relative">
                                <div className="absolute -left-[49px] top-1 h-6 w-6 rounded-full bg-accent flex items-center justify-center ring-8 ring-background">
                                    <Briefcase className="w-3 h-3 text-accent-foreground" />
                                </div>
                                <p className="text-sm text-muted-foreground">{job.duration}</p>
                                <h4 className="font-semibold text-lg">{job.role}</h4>
                                <p className="font-medium text-accent">{job.company}</p>
                                {showDetails && (
                                    <p className="mt-2 text-sm text-muted-foreground animate-fade-in">{job.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="md:col-span-2">
                    <h3 className="text-3xl flex items-center gap-3 font-bold font-headline mb-8 text-glow"><GraduationCap className="w-8 h-8 text-secondary" /> Education</h3>
                    <div className="space-y-6">
                         {resume.education.map((edu, index) => (
                            <div key={index}>
                                <h4 className="font-semibold text-lg">{edu.institution}</h4>
                                <p className="font-medium text-secondary">{edu.degree}</p>
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

                    <h3 className="text-3xl flex items-center gap-3 font-bold font-headline mt-12 mb-8 text-glow"><Award className="w-8 h-8 text-secondary" /> Honors & Awards</h3>
                     <Accordion type="single" collapsible className="w-full">
                        {honors.map((category, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-b-white/10">
                                <AccordionTrigger className="text-lg font-semibold hover:no-underline text-left">
                                    <div className="flex items-center gap-3">
                                        <Award className="w-5 h-5 text-accent" />
                                        {category.category}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <ul className="list-disc pl-10 pt-2 space-y-2 text-muted-foreground text-sm">
                                        {category.items.map((item, itemIndex) => (
                                            <li key={itemIndex}>{item}</li>
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    </section>
  )
}
