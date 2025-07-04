'use client';

import { useState, useEffect } from 'react';
import Portfolio from '@/components/sections/portfolio';
import Resume from '@/components/sections/resume';
import ConstellationGenerator from '@/components/sections/constellation-generator';
import Contact from '@/components/sections/contact';
import { ArrowDown, Rocket } from 'lucide-react';
import Header from '@/components/header';
import Honors from '@/components/sections/honors';
import { cn } from '@/lib/utils';

export default function Home() {
  const [animationState, setAnimationState] = useState('rocket'); // 'rocket', 'typing', 'done'
  const [typedName, setTypedName] = useState('');
  const fullName = 'Krish Singh';

  useEffect(() => {
    // Rocket animation ends, start typing
    const rocketTimer = setTimeout(() => {
      setAnimationState('typing');
    }, 2800); // Animation is 3s, start typing just before it's gone

    return () => clearTimeout(rocketTimer);
  }, []);

  useEffect(() => {
    if (animationState === 'typing') {
      if (typedName.length < fullName.length) {
        const typingTimer = setTimeout(() => {
          setTypedName(fullName.slice(0, typedName.length + 1));
        }, 150);
        return () => clearTimeout(typingTimer);
      } else {
        // Typing finished, wait a bit then show the rest
        const doneTimer = setTimeout(() => {
          setAnimationState('done');
        }, 500);
        return () => clearTimeout(doneTimer);
      }
    }
  }, [animationState, typedName, fullName]);

  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1">
        <section id="home" className="h-screen w-full flex flex-col items-center justify-center text-center p-4 -mt-16 relative overflow-hidden">
          {animationState === 'rocket' && (
            <div className="absolute inset-0 flex items-center justify-center z-20 bg-background">
               <div className="animate-rocket-blast-off">
                <div className="relative">
                  <Rocket className="w-24 h-24 text-accent -rotate-45" />
                  {/* Fire element */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-12">
                     <div className="w-6 h-20 mx-auto bg-gradient-to-t from-orange-500 via-yellow-400 to-transparent blur-md animate-fire-flicker" />
                     <div className="w-4 h-16 mx-auto bg-gradient-to-t from-red-600 via-orange-500 to-transparent blur-lg absolute top-0 left-1/2 -translate-x-1/2 animate-fire-flicker" style={{animationDelay: '0.05s'}} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex-grow flex items-center justify-center">
            <div className={cn(
              "z-10 flex flex-col items-center",
              animationState === 'rocket' ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'
            )}>
              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 text-glow h-24 lg:h-32 flex items-center justify-center">
                <span>{typedName}</span>
                <span className={cn(
                  "inline-block w-1 md:w-2 bg-foreground ml-2 transition-opacity duration-150",
                  "h-20 md:h-24 lg:h-28",
                  animationState === 'done' ? 'opacity-0' : 'opacity-100 animate-blink'
                )}></span>
              </h1>
              <div className={cn(
                "transition-opacity duration-500",
                animationState === 'done' ? 'opacity-100' : 'opacity-0'
              )}>
                <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                  A universe of projects, skills, and experience, forged in code and ready to be explored.
                </p>
              </div>
            </div>
          </div>
          <div className={cn(
            "w-full flex justify-center transition-opacity duration-500",
            animationState === 'done' ? 'opacity-100' : 'opacity-0'
          )}>
            <a href="#portfolio" className="flex flex-col items-center gap-2 text-accent animate-bounce pb-10">
              <span className="text-sm font-medium">Scroll to explore</span>
              <ArrowDown className="w-5 h-5" />
            </a>
          </div>
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
