
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { DEPARTMENTS } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AccessRequestPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-white py-32">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="space-y-4 mb-16 text-center">
             <h1 className="text-5xl font-headline tracking-tight">Request Access</h1>
             <p className="text-slate-500 text-[10px] tracking-[0.4em] uppercase font-bold">Authorized Entity Consultation Request</p>
          </div>

          <form className="space-y-8 border border-slate-100 p-12 bg-slate-50/50">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                   <Input className="rounded-none border-slate-200 h-12 bg-white" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Organization</label>
                   <Input className="rounded-none border-slate-200 h-12 bg-white" placeholder="Acme Corp" />
                </div>
             </div>

             <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Core Interest / Department</label>
                <Select>
                   <SelectTrigger className="rounded-none border-slate-200 h-12 bg-white">
                      <SelectValue placeholder="Select Division" />
                   </SelectTrigger>
                   <SelectContent>
                      {DEPARTMENTS.map(dept => (
                        <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                      ))}
                   </SelectContent>
                </Select>
             </div>

             <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Brief / Intent</label>
                <Textarea className="rounded-none border-slate-200 min-h-[150px] bg-white" placeholder="Describe the operational requirement..." />
             </div>

             <Button className="w-full h-16 rounded-none bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-emerald-600 transition-all">
                Submit Authorization Request
             </Button>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}
