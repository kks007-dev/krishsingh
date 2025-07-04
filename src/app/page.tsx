import Portfolio from '@/components/sections/portfolio';
import Resume from '@/components/sections/resume';
import ConstellationGenerator from '@/components/sections/constellation-generator';
import Contact from '@/components/sections/contact';
import { ArrowDown } from 'lucide-react';
import Header from '@/components/header';
import Honors from '@/components/sections/honors';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1">
        <section id="home" className="h-screen w-full flex flex-col items-center justify-center text-center p-4 -mt-16">
          <div className="flex-grow flex items-center justify-center">
            <div className="z-10 animate-fade-in-up flex flex-col items-center">
              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 text-glow">
                Krish Singh
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto" style={{ animationDelay: '0.2s' }}>
                A universe of projects, skills, and experience, forged in code and ready to be explored.
              </p>
            </div>
          </div>
          <a href="#portfolio" className="flex flex-col items-center gap-2 text-accent animate-bounce pb-10">
            <span className="text-sm font-medium">Scroll to explore</span>
            <ArrowDown className="w-5 h-5" />
          </a>
        </section>

        <Portfolio />
        <div className="py-20" />
        <Resume />
        <div className="py-20" />
        <Honors />
        <div className="py-20" />
        <ConstellationGenerator />
        <div className="py-20" />
        <Contact />
      </main>
    </div>
  );
}
