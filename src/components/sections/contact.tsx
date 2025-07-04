
'use client';

import { contact } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, Github, Linkedin } from 'lucide-react';

const icons: { [key: string]: React.ElementType } = {
    github: Github,
    linkedin: Linkedin,
};

export default function Contact() {
    return (
        <section id="contact" className="py-20">
            <div className="container text-center">
                <h2 className="text-5xl font-bold font-headline mb-4 text-glow">Get In Touch</h2>
                <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
                    I'm currently open to new opportunities and collaborations. If you have a project in mind or just want to connect, feel free to reach out.
                </p>
                <div className="flex justify-center gap-4 mb-8">
                    {contact.socials.map(social => {
                        const Icon = icons[social.icon];
                        if (!Icon) return null;
                        return (
                            <Button asChild key={social.name} variant="outline" size="icon" className="bg-transparent border-white/20 hover:bg-white/10 hover:text-white rounded-full">
                                <Link href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                                    <Icon className="w-5 h-5"/>
                                </Link>
                            </Button>
                        )
                    })}
                </div>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base px-8 py-6 rounded-full">
                    <a href={`mailto:${contact.email}`}>
                        <Mail className="mr-2 h-5 w-5"/>
                        Say Hello
                    </a>
                </Button>
                <p className="mt-16 text-sm text-primary-foreground/50">&copy; {new Date().getFullYear()} Krish Singh. All Rights Reserved.</p>
            </div>
        </section>
    );
}
