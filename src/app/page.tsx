import Portfolio from '@/components/sections/portfolio';
import Resume from '@/components/sections/resume';
import ConstellationGenerator from '@/components/sections/constellation-generator';
import Contact from '@/components/sections/contact';
import { ArrowDown } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        <section id="home" className="h-screen w-full flex items-center justify-center text-center p-4">
          <div className="z-10 animate-fade-in-up">
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 text-glow">
              Cosmic Canvas
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto" style={{ animationDelay: '0.2s' }}>
              A universe of projects, skills, and experience, forged in code and ready to be explored.
            </p>
            <a href="#portfolio" className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-accent animate-bounce">
              <span className="text-sm font-medium">Scroll to explore</span>
              <ArrowDown className="w-5 h-5" />
            </a>
          </div>
        </section>

        <div className="py-20" />
        <Portfolio />
        <div className="py-20" />
        <Resume />
        <div className="py-20" />
        <ConstellationGenerator />
        <div className="py-20" />
        <Contact />
      </main>
    </div>
  );
}
