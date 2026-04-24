
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { DEPARTMENTS } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Globe } from 'lucide-react';

export default function DivisionsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-white py-32">
        <div className="container mx-auto px-6 space-y-20">
          <div className="space-y-4 text-center max-w-2xl mx-auto">
             <h1 className="text-5xl font-headline tracking-tight text-slate-900">Global Divisions</h1>
             <p className="text-slate-500 text-[10px] tracking-[0.4em] uppercase font-bold">Network Architecture & Territory Coverage</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
             {DEPARTMENTS.map(dept => (
               <Card key={dept.id} className="border-none shadow-sm rounded-none bg-slate-50 p-12 space-y-8 group hover:bg-slate-900 hover:text-white transition-all">
                  <div className="h-1 w-20 bg-emerald-500" style={{ backgroundColor: dept.color }} />
                  <div className="space-y-4">
                     <h3 className="text-3xl font-headline">{dept.name}</h3>
                     <p className="text-sm opacity-60 leading-relaxed italic">{dept.description}</p>
                  </div>
                  <div className="flex items-center space-x-6 text-[10px] font-bold uppercase tracking-widest opacity-40">
                     <div className="flex items-center">
                        <MapPin size={14} className="mr-2" />
                        Global Assets
                     </div>
                     <div className="flex items-center">
                        <Globe size={14} className="mr-2" />
                        Encrypted Feed
                     </div>
                  </div>
               </Card>
             ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
