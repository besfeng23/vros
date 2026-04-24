
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SERVICES, BRANCHES, TESTIMONIALS } from '@/lib/data';
import { ArrowRight, Check, Star, MapPin, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://picsum.photos/seed/harmonyhq/1920/1080"
            alt="Premium Operations HQ"
            fill
            className="object-cover opacity-40 blur-sm"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl space-y-10 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold tracking-[0.4em] uppercase">
              <Sparkles size={14} />
              <span>Next-Gen Enterprise OS</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-headline leading-tight text-white">
              Harmony <span className="italic text-emerald-500">OS</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-xl font-light">
              The definitive operating system for premium business ecosystems. 
              Engineered for absolute control, flawless execution, and quiet luxury in management.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 pt-6">
              <Button asChild size="lg" className="rounded-none px-12 h-16 text-[10px] font-bold uppercase tracking-[0.3em] bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-xl shadow-emerald-900/20">
                <Link href="/admin/dashboard">Access Command Center</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-none px-12 h-16 text-[10px] font-bold uppercase tracking-[0.3em] border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
                <Link href="/login">Secure Authentication</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-12 bg-secondary/20 border-y border-secondary">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-70">
            <span className="font-headline text-xl tracking-widest uppercase italic text-center">Medically Credible</span>
            <span className="font-headline text-xl tracking-widest uppercase italic text-center">FDA Approved</span>
            <span className="font-headline text-xl tracking-widest uppercase italic text-center">Luxury Experience</span>
            <span className="font-headline text-xl tracking-widest uppercase italic text-center">Board Certified</span>
          </div>
        </div>
      </section>

      {/* Featured Treatments */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div className="space-y-4 max-w-xl">
              <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-accent">Signature Portfolio</h2>
              <p className="text-4xl md:text-5xl font-headline leading-tight">Featured Treatments for Refined Results</p>
            </div>
            <Link href="/services" className="mt-8 md:mt-0 flex items-center space-x-2 text-primary font-bold tracking-widest uppercase text-sm border-b border-primary/20 pb-1 hover:border-accent transition-all group">
              <span>View All Services</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {SERVICES.filter(s => s.isFeatured).map((service) => (
              <div key={service.id} className="group cursor-pointer">
                <div className="relative h-[450px] overflow-hidden mb-8">
                  <Image 
                    src={service.imageUrl}
                    alt={service.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="space-y-3">
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-berry">{service.category}</span>
                  <h3 className="text-2xl font-headline">{service.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Branch Finder */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative h-[600px] w-full">
              <Image 
                src="https://picsum.photos/seed/branchmap/800/1000"
                alt="Clinic Interior"
                fill
                className="object-cover"
                data-ai-hint="clinic interior"
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-12 shadow-2xl hidden md:block">
                <div className="space-y-4">
                  <p className="text-sm font-bold tracking-widest uppercase text-accent">Our Presence</p>
                  <p className="text-2xl font-headline">Visit an Ortiz Clinic near you</p>
                  <Button variant="link" className="p-0 h-auto font-bold uppercase tracking-widest text-xs">
                    Locate Branches <ArrowRight size={14} className="ml-2" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-accent">Strategic Locations</h2>
                <p className="text-4xl md:text-5xl font-headline leading-tight">Accessible Luxury Across Metro Manila</p>
              </div>
              <div className="space-y-8">
                {BRANCHES.map(branch => (
                  <div key={branch.id} className="group border-b border-muted pb-8 hover:border-accent transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h4 className="text-xl font-headline group-hover:text-accent transition-colors">{branch.name}</h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin size={14} className="mr-2" />
                          {branch.address}
                        </div>
                      </div>
                      <Button asChild variant="outline" size="sm" className="rounded-none border-primary">
                        <Link href={`/branches/${branch.slug}`}>Details</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Ortiz / Doctor Credibility */}
      <section className="py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center max-w-4xl mx-auto space-y-16">
          <div className="space-y-6">
            <h2 className="text-sm font-bold tracking-[0.4em] uppercase text-accent">The Ortiz Standard</h2>
            <p className="text-4xl md:text-6xl font-headline leading-tight">Where Science Meets Artistry</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div className="space-y-4">
              <ShieldCheck className="text-accent h-10 w-10" />
              <h4 className="text-xl font-headline">Medical Credibility</h4>
              <p className="text-sm text-primary-foreground/60 leading-relaxed">Every treatment is overseen by board-certified dermatologists and medical professionals.</p>
            </div>
            <div className="space-y-4">
              <Sparkles className="text-accent h-10 w-10" />
              <h4 className="text-xl font-headline">Quiet Luxury</h4>
              <p className="text-sm text-primary-foreground/60 leading-relaxed">Our clinics are designed as havens of calm, prioritizing privacy and premium comfort.</p>
            </div>
            <div className="space-y-4">
              <Heart className="text-accent h-10 w-10" />
              <h4 className="text-xl font-headline">Bespoke Care</h4>
              <p className="text-sm text-primary-foreground/60 leading-relaxed">No generic templates. Every patient journey is tailored to individual skin DNA and goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-background overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-accent mb-4">Patient Voices</h2>
            <p className="text-4xl md:text-5xl font-headline">The Proof is in the Results</p>
          </div>
          <div className="flex justify-center">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="max-w-2xl bg-white p-16 shadow-lg text-center space-y-8">
                <div className="flex justify-center space-x-1">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="#D8BC78" className="text-accent" />)}
                </div>
                <p className="text-2xl font-headline italic leading-relaxed text-muted-foreground">
                  "{t.content}"
                </p>
                <div className="pt-4">
                  <p className="font-bold tracking-widest uppercase text-sm">{t.patientName}</p>
                  <p className="text-accent text-xs tracking-widest uppercase mt-1">{t.treatment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Now CTA */}
      <section className="py-40 relative overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://picsum.photos/seed/ctabg/1920/1080"
            alt="Clinic Detail"
            fill
            className="object-cover opacity-10"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-headline max-w-4xl mx-auto leading-tight">Begin Your Journey to <span className="italic">Radiance</span></h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">Appointments are available at all our branches. Select your preferred location to begin.</p>
          </div>
          <Button asChild size="lg" className="rounded-none px-16 h-16 text-lg tracking-widest uppercase bg-primary hover:bg-primary/90">
            <Link href="/book">Reserve Now</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
