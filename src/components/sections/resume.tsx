'use client';

import { useState } from 'react';
import { resume, honors } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Briefcase, GraduationCap, Award, Download } from 'lucide-react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const SkillsBelt3D = dynamic(() => import('@/components/skills-belt-3d'), {
    ssr: false,
    loading: () => <div className="h-[200px] w-full flex items-center justify-center text-white/20">Loading Skills System...</div>
});

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-5xl font-bold text-center font-headline mb-8 text-glow">{children}</h2>
);

export default function Resume() {
    const [showDetails, setShowDetails] = useState(false);
    // Reverse experience to show newest first
    const education = [...resume.education]; // Education order seems fine (Newest first in data.ts? No, data.ts usually has oldest first? Let's check.)
    // data.ts education: [TAMU 2025-2029 (Future/Current), High School 2021-2025]. This is Newest First. Good.

    // Experience in data.ts is Oldest First. So reverse it.
    // Manually add the AI Automation Engineer role to sync with constellation
    const experience = [
        {
            role: "AI Automation Engineer",
            company: "Chai",
            duration: "Present",
            description: "Developing AI automation solutions and engineering workflows at Chai, leveraging advanced AI technologies to optimize business processes."
        },
        ...[...resume.experience].reverse()
    ];

    const handleDownloadResume = () => {
        window.open('https://drive.google.com/file/d/13AJTKKQ0BEZURug2vcyCAF3XAzwiufBJ/view?usp=sharing', '_blank');
    };

    return (
        <section id="resume" className="py-20 px-4 container">
            <SectionTitle>My Professional Journey</SectionTitle>

            <div className="flex justify-center mb-12">
                <Button
                    onClick={handleDownloadResume}
                    variant="outline"
                    size="lg"
                    className="gap-2 border-blue-500/50 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-300 backdrop-blur-sm bg-black/20 rounded-full px-8"
                >
                    <Download className="w-4 h-4" />
                    Resume
                </Button>
            </div>

            <div className="glass-card p-8 md:p-12 max-w-7xl mx-auto">
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
                            {experience.map((job, index) => (
                                <div key={index} className="relative group">
                                    <div className="absolute -left-[49px] top-1 h-6 w-6 rounded-full bg-black border-4 border-accent flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                                    </div>
                                    <p className="text-xs font-mono text-accent mb-1">{job.duration}</p>
                                    <h4 className="font-semibold text-lg text-white group-hover:text-blue-300 transition-colors">{job.role}</h4>
                                    <p className="font-medium text-muted-foreground mb-2">{job.company}</p>

                                    <div className={cn("grid transition-all duration-500 ease-in-out overflow-hidden", showDetails ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                                        <div className="min-h-0">
                                            <p className="text-sm text-gray-400 leading-relaxed border-l-2 border-white/10 pl-4 py-2">
                                                {job.description}
                                            </p>
                                        </div>
                                    </div>
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

                        <h3 className="text-3xl font-bold font-headline mt-12 mb-2 text-glow">Skills</h3>
                        <div className="relative -mx-8 md:-mx-12">
                            <SkillsBelt3D />
                        </div>

                        <h3 className="text-3xl flex items-center gap-3 font-bold font-headline mt-4 mb-8 text-glow"><Award className="w-8 h-8 text-secondary" /> Honors & Awards</h3>
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
                </div >
            </div >
        </section >
    )
}
