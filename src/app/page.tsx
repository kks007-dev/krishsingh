'use client';

import { useState, useEffect } from 'react';
import Portfolio from '@/components/sections/portfolio';
import Resume from '@/components/sections/resume';

import Contact from '@/components/sections/contact';
import { ArrowDown, Rocket } from 'lucide-react';
import Header from '@/components/header';
import InAction from '@/components/sections/in-action';
import { cn } from '@/lib/utils';

export default function Home() {
  const [animationState, setAnimationState] = useState('typing'); // 'typing', 'done'
  const [typedName, setTypedName] = useState('');
  const fullName = 'Krish Singh';



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
        <section id="home" className="h-[calc(100vh-4rem)] w-full flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
          {animationState === 'rocket' && (
            <div className="hidden" />
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
        {/* <div className="py-20" />
        <InAction />
        <div className="py-20" /> */}

        <Contact />

        {/* Secret Trigger */}
        <div className="fixed bottom-4 right-4 z-50">
          <a href="/secret" className="block text-purple-500/50 hover:text-purple-400 transition-colors p-2" aria-label="Secret">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </main>
    </div>
  );
}
