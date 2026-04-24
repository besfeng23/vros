
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Branches', href: '/branches' },
    { name: 'Promos', href: '/promos' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "bg-background/80 backdrop-blur-md py-3 shadow-sm border-b" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-headline text-2xl font-semibold tracking-widest uppercase">
            Harmony <span className="text-emerald-500">OS</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium tracking-wide uppercase hover:text-accent transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Button asChild variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-8 font-medium tracking-wide">
            <Link href="/book">Book Now</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-background z-40 md:hidden flex flex-col pt-24 px-8 transition-transform duration-500 ease-in-out",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col space-y-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-headline tracking-tight border-b border-muted pb-4 flex items-center justify-between"
            >
              {link.name}
              <ChevronRight size={20} className="text-accent" />
            </Link>
          ))}
          <Button asChild size="lg" className="w-full mt-4">
            <Link href="/book" onClick={() => setIsMobileMenuOpen(false)}>Book Appointment</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
