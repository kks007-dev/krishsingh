import { contact } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail } from 'lucide-react';

export default function Contact() {
    return (
        <footer id="contact" className="bg-primary text-primary-foreground py-20">
            <div className="container text-center">
                <h2 className="text-4xl font-bold font-headline mb-4">Get In Touch</h2>
                <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
                    I'm currently open to new opportunities and collaborations. If you have a project in mind or just want to connect, feel free to reach out.
                </p>
                <div className="flex justify-center gap-4 mb-8">
                    {contact.socials.map(social => (
                        <Button asChild key={social.name} variant="outline" size="icon" className="bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-full">
                            <Link href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                                <social.icon className="w-5 h-5"/>
                            </Link>
                        </Button>
                    ))}
                </div>
                <Button asChild size="lg" className="bg-accent-gradient text-accent-foreground font-bold text-base px-8 py-6 rounded-full">
                    <a href={`mailto:${contact.email}`}>
                        <Mail className="mr-2 h-5 w-5"/>
                        Say Hello
                    </a>
                </Button>
                <p className="mt-16 text-sm text-primary-foreground/50">&copy; {new Date().getFullYear()} Cosmic Canvas. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
