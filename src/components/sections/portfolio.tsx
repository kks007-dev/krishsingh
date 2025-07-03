import { portfolio } from '@/lib/data';
import ConstellationDisplay from '@/components/constellation-display';

const SectionTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <h2 className={`text-5xl font-bold text-center font-headline mb-12 md:mb-20 text-glow ${className}`}>{children}</h2>
);

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 px-4 container">
      <SectionTitle>
        Experience Constellation
      </SectionTitle>
      <ConstellationDisplay projects={portfolio.work} name="orion" />

      <div className="py-20" />

      <SectionTitle>
        Passion Constellation
      </SectionTitle>
      <ConstellationDisplay projects={portfolio.passion} name="andromeda" />
    </section>
  );
}
