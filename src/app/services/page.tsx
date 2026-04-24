
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { PROJECTS } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Layers } from 'lucide-react';

export default function PublicProjectsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-slate-50 py-32">
        <div className="container mx-auto px-6 space-y-16">
          <div className="space-y-4 text-center max-w-2xl mx-auto">
             <h1 className="text-5xl font-headline tracking-tight text-slate-900">Project Manifest</h1>
             <p className="text-slate-500 text-[10px] tracking-[0.4em] uppercase font-bold">Public Operational Transparency Feed</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
             {PROJECTS.map(project => (
               <Card key={project.id} className="border-none shadow-sm rounded-none bg-white p-10 space-y-6">
                  <div className="flex justify-between items-start">
                     <div className="space-y-1">
                        <h3 className="text-2xl font-headline">{project.name}</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{project.id}</p>
                     </div>
                     <Badge variant="outline" className="rounded-none border-emerald-100 text-emerald-600 text-[8px] font-bold uppercase tracking-widest px-4 py-1">
                        {project.status}
                     </Badge>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed italic">{project.description}</p>
                  <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                     <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        <Layers size={14} className="mr-2 text-emerald-500" />
                        {project.departmentId}
                     </div>
                     <span className="text-[9px] text-slate-300 font-bold uppercase tracking-widest">Commenced: {project.startDate}</span>
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
