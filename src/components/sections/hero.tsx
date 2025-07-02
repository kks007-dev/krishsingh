export default function Hero() {
  return (
    <section id="home" className="relative h-[calc(100dvh-4rem)] w-full flex items-center justify-center overflow-hidden bg-primary text-primary-foreground">
      {/* Starry background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] [background-size:40px_40px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_1px,_transparent_1px)] [background-size:80px_80px] [background-position:20px_20px]"></div>
      </div>
      <div className="text-center z-10 p-4 animate-fade-in-up">
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
          Cosmic Canvas
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Forging digital constellations from code. A universe of projects, skills, and experience, ready to be explored.
        </p>
      </div>
    </section>
  );
};
