import Header from '@/components/header';
import Hero from '@/components/sections/hero';
import Portfolio from '@/components/sections/portfolio';
import Resume from '@/components/sections/resume';
import ConstellationGenerator from '@/components/sections/constellation-generator';
import Contact from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Portfolio />
        <Resume />
        <ConstellationGenerator />
        <Contact />
      </main>
    </div>
  );
}
