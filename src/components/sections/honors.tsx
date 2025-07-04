'use client';

import { honors } from '@/lib/data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Award } from 'lucide-react';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-5xl font-bold text-center font-headline mb-12 text-glow">{children}</h2>
);

export default function Honors() {
  return (
    <section id="honors" className="py-20 px-4 container">
        <SectionTitle>Honors & Awards</SectionTitle>
        <div className="glass-card p-8 md:p-12 max-w-5xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
                {honors.map((category, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-xl font-semibold hover:no-underline text-left">
                            <div className="flex items-center gap-4">
                                <Award className="w-6 h-6 text-accent" />
                                {category.category}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="list-disc pl-10 pt-4 space-y-2 text-muted-foreground">
                                {category.items.map((item, itemIndex) => (
                                    <li key={itemIndex}>{item}</li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    </section>
  );
}
