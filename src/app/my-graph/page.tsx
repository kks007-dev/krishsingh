'use client';

import Header from '@/components/header';
import KnowledgeGraph from '@/components/knowledge-graph';
import { Waypoints } from 'lucide-react';

export default function MyGraphPage() {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1">
        <section className="pt-14 pb-8 px-4 text-center">
          <div className="container max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-5">
              <Waypoints className="w-7 h-7 text-accent" />
            </div>
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-glow">
              My Graph
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Everything connected — experience, projects, leadership, and the skills that tie them together.
            </p>
          </div>
        </section>

        <section className="px-4 pb-20">
          <div className="container max-w-6xl mx-auto">
            <KnowledgeGraph />
          </div>
        </section>
      </main>
    </div>
  );
}
