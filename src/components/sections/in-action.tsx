'use client';

import { Badge } from '@/components/ui/badge';
import { Bot, Camera, Code } from 'lucide-react';

const actionItems = [
    {
        title: "Robo-Colts: Precision Vision",
        description: "Utilized a Limelight camera with custom-trained models to detect April Tags from over 30 feet away, enabling high-precision autonomous routines and game-piece tracking.",
        tags: ["Java", "OpenCV", "Robotics", "AI/ML"],
        icon: Camera
    },
    {
        title: "S.T.A.R.S. Portal: Interactive Learning",
        description: "Engineered a full-stack learning platform with interactive course modules, progress tracking, and a dynamic resource hub to deliver hands-on STEM education nationwide.",
        tags: ["Next.js", "React", "Node.js", "Full Stack"],
        icon: Code
    },
    {
        title: "Portfolio: AI Constellation Generator",
        description: "Implemented a generative AI feature that takes recruiter inputs (company, role, skills) and creates a unique, symbolic constellation image representing the job opportunity.",
        tags: ["GenAI", "Image Generation", "Next.js", "TypeScript"],
        icon: Bot
    }
];

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-5xl font-bold text-center font-headline mb-12 text-glow">{children}</h2>
);

export default function InAction() {
    return (
        <section id="in-action" className="py-20 px-4 container">
            <SectionTitle>Projects In Action</SectionTitle>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {actionItems.map((item, index) => (
                    <div key={index} className="glass-card flex flex-col overflow-hidden">
                        <div className="w-full aspect-video bg-black/30 rounded-t-2xl flex items-center justify-center border-b border-white/10">
                           <item.icon className="w-16 h-16 text-white/20" />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-2xl font-bold font-headline mb-2 text-glow">{item.title}</h3>
                            <p className="text-muted-foreground text-sm mb-4 flex-grow">{item.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {item.tags.map(tag => (
                                    <Badge key={tag} variant="outline" className="text-xs border-accent/50 text-accent bg-accent/10 backdrop-blur-sm">{tag}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
