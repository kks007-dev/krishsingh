'use client';

import { useState, useRef, useEffect } from 'react';
import { portfolio } from '@/lib/data';
import dynamic from 'next/dynamic';
import ProjectCard from '@/components/project-card';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer2, X } from 'lucide-react';

const ConstellationDisplay3D = dynamic(() => import('@/components/constellation-display-3d'), {
  ssr: false,
  loading: () => <div className="w-full h-full min-h-[500px] flex items-center justify-center text-white/50">Loading 3D View...</div>
});

const SectionTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`text-5xl font-bold text-center font-headline mb-12 md:mb-20 text-glow ${className}`}>{children}</h2>
);

type Project = (typeof portfolio.work)[0];

function IOSNotification() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const portfolioSection = document.getElementById('portfolio');
      if (portfolioSection) {
        const rect = portfolioSection.getBoundingClientRect();
        // Show when section is visible and we haven't shown it yet this session
        if (rect.top < window.innerHeight / 2 && rect.bottom > 0 && !sessionStorage.getItem('starsInstructionShown')) {
          setIsVisible(true);
          sessionStorage.setItem('starsInstructionShown', 'true');

          // Auto hide after 5 seconds
          setTimeout(() => setIsVisible(false), 8000);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -20, x: "-50%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-20 left-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/20 dark:bg-black/40 backdrop-blur-xl border border-white/20 shadow-lg max-w-[90vw] md:max-w-md pointer-events-auto"
        >
          <div className="p-2 rounded-full bg-blue-500/20 text-blue-400">
            <MousePointer2 className="w-5 h-5" />
          </div>
          <div className="flex-1 text-sm text-foreground/90 font-medium leading-tight">
            Hover over a star
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 rounded-full hover:bg-white/10 text-muted-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Portfolio() {
  const [activeWorkProject, setActiveWorkProject] = useState<Project | null>(portfolio.work[0]);
  const [activePassionProject, setActivePassionProject] = useState<Project | null>(portfolio.passion[0]);

  return (
    <section id="portfolio" className="py-20 px-4 container space-y-32 relative">
      <IOSNotification />

      <div>
        <SectionTitle>
          My Experience
        </SectionTitle>
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[500px]">
          <ConstellationDisplay3D
            projects={portfolio.work}
            name="orion"
            onStarHover={setActiveWorkProject}
            activeProject={activeWorkProject}
          />
          <div className="flex justify-center md:justify-start">
            <ProjectCard project={activeWorkProject} />
          </div>
        </div>
      </div>

      <div>
        <SectionTitle>
          My Projects
        </SectionTitle>
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[500px]">
          <ConstellationDisplay3D
            projects={portfolio.passion}
            name="andromeda"
            onStarHover={setActivePassionProject}
            activeProject={activePassionProject}
          />
          <div className="flex justify-center md:justify-start">
            <ProjectCard project={activePassionProject} />
          </div>
        </div>
      </div>
    </section>
  );
}
