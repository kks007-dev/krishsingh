"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#portfolio", label: "Work" },
  { href: "#resume", label: "Resume" },
  { href: "#generator",label: "Generator" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "bg-transparent"
    )}>
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Rocket className="h-6 w-6 text-gradient-accent bg-accent-gradient" />
            <span className="font-bold font-headline text-lg">Krish Singh</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm ml-auto">
          {navLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="font-medium text-foreground/80 transition-colors hover:text-foreground hover:text-gradient-accent hover:bg-accent-gradient hover:bg-clip-text"
            >
              {label}
            </Link>
          ))}
           <Button asChild size="sm" variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-bold">
            <a href="#contact">
              Hire Me
            </a>
          </Button>
        </nav>
        <button
          className="md:hidden ml-auto p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-background/95 border-t border-border">
            <nav className="flex flex-col items-start gap-4 p-4">
                {navLinks.map(({ href, label }) => (
                    <Link
                    key={label}
                    href={href}
                    className="w-full font-medium text-foreground/80 transition-colors hover:text-foreground"
                    onClick={() => setIsOpen(false)}
                    >
                    {label}
                    </Link>
                ))}
                 <Button asChild size="sm" variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-bold">
                    <a href="#contact" onClick={() => setIsOpen(false)}>
                        Hire Me
                    </a>
                </Button>
            </nav>
        </div>
      )}
    </header>
  );
}
