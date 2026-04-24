
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DEPARTMENTS, PROJECTS } from '@/lib/data';
import { ArrowRight, Check, ShieldCheck, Sparkles, Layers, Briefcase, Globe } from 'lucide-react';

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
          <div className="max-w-3xl space-y-10">
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
      <section className="py-12 bg-slate-900 border-y border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-70">
            <span className="font-headline text-sm tracking-[0.3em] uppercase italic text-center text-slate-500">Underground Ops</span>
            <span className="font-headline text-sm tracking-[0.3em] uppercase italic text-center text-slate-500">Entertainment Elite</span>
            <span className="font-headline text-sm tracking-[0.3em] uppercase italic text-center text-slate-500">Corporate HQ</span>
            <span className="font-headline text-sm tracking-[0.3em] uppercase italic text-center text-slate-500">88 Department</span>
          </div>
        </div>
      </section>

      {/* Featured Departments */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div className="space-y-4 max-w-xl">
              <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-emerald-600">The Ecosystem</h2>
              <p className="text-4xl md:text-5xl font-headline leading-tight">Operational Divisions</p>
            </div>
            <Link href="/admin/departments" className="mt-8 md:mt-0 flex items-center space-x-2 text-slate-900 font-bold tracking-widest uppercase text-sm border-b border-slate-900/20 pb-1 hover:border-emerald-500 transition-all group">
              <span>View Departmental View</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {DEPARTMENTS.map((dept) => (
              <div key={dept.id} className="group cursor-pointer p-10 border border-slate-100 hover:border-emerald-500 transition-all">
                <div className="h-2 w-12 bg-emerald-500 mb-8" style={{ backgroundColor: dept.color }} />
                <div className="space-y-6">
                   <h3 className="text-2xl font-headline group-hover:text-emerald-600 transition-colors">{dept.name}</h3>
                   <p className="text-slate-500 text-sm leading-relaxed">{dept.description}</p>
                   <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      <Layers size={14} className="mr-2" />
                      Protocol Established
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Harmony OS */}
      <section className="py-32 bg-slate-950 text-white">
        <div className="container mx-auto px-6 text-center max-w-4xl space-y-16">
          <div className="space-y-6">
            <h2 className="text-sm font-bold tracking-[0.4em] uppercase text-emerald-500">The Protocol</h2>
            <p className="text-4xl md:text-6xl font-headline leading-tight">Engineered for Absolute Sovereignty</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div className="space-y-4">
              <ShieldCheck className="text-emerald-500 h-10 w-10" />
              <h4 className="text-xl font-headline">End-to-End Encryption</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Strategic data stays consolidated and protected behind elite-grade security protocols.</p>
            </div>
            <div className="space-y-4">
              <Globe className="text-emerald-500 h-10 w-10" />
              <h4 className="text-xl font-headline">Global Scalability</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Scale across divisions, territories, and industries with no operational friction.</p>
            </div>
            <div className="space-y-4">
              <Briefcase className="text-emerald-500 h-10 w-10" />
              <h4 className="text-xl font-headline">Quiet Efficiency</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Automation handles the noise so the leadership can focus on high-stakes execution.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Command Center CTA */}
      <section className="py-40 relative overflow-hidden bg-slate-50">
        <div className="container mx-auto px-6 relative z-10 text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-headline max-w-4xl mx-auto leading-tight">Ready for <span className="italic text-emerald-600">Harmony</span></h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto uppercase tracking-widest text-[10px] font-bold">Authorized Personnel Only - Biometric Access Active</p>
          </div>
          <Button asChild size="lg" className="rounded-none px-16 h-16 text-[10px] tracking-[0.3em] font-bold uppercase bg-slate-900 hover:bg-slate-800 text-white shadow-2xl">
            <Link href="/admin/dashboard">Initial Login Sequence</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
