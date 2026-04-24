
'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Layers, TrendingUp, Clock, AlertCircle, CheckCircle2, User, Building2, MoreHorizontal, MessageSquare, Shield, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function PipelineDetailPage() {
  const params = useParams();
  const router = useRouter();

  return (
    <div className="space-y-12 pb-20 bg-[#050505] min-h-screen -m-6 lg:-m-16 p-6 lg:p-16 text-white font-body">
      <div className="flex justify-between items-end border-b border-white/5 pb-10">
        <div className="flex items-center space-x-8">
           <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-14 w-14 rounded-none border border-white/5 text-slate-500 hover:text-white hover:bg-white/5">
              <ArrowLeft size={18} />
           </Button>
           <div className="space-y-1">
              <div className="flex items-center space-x-4">
                 <h1 className="text-4xl font-headline tracking-tighter">Expansion Protocol: Terminal BGC</h1>
                 <Badge className="bg-amber-500/10 text-amber-500 text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-none border border-amber-500/20">Stage: Strategic Deep-Dive</Badge>
              </div>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.4em]">Initiative ID: {params.id || 'P-4421'}</p>
           </div>
        </div>
        <div className="flex space-x-3">
           <Button variant="outline" className="h-14 rounded-none border-white/10 text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] px-8">
              Transfer Ownership
           </Button>
           <Button className="h-14 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-[0.3em] px-10">
              Advance Stage
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            {/* Visual Progress Bar */}
            <Card className="bg-white/[0.02] border-white/5 rounded-none p-10 space-y-8">
               <div className="flex justify-between items-center">
                  <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-emerald-500">Pipeline Trajectory</h3>
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest italic">65% Progress to Settlement</p>
               </div>
               <div className="flex w-full space-x-2">
                  {['Discovery', 'Qualified', 'Deep-Dive', 'Negotiation', 'Secured'].map((s, i) => (
                    <div key={i} className="flex-1 space-y-3 group cursor-pointer">
                       <div className={cn(
                         "h-2 w-full transition-all duration-500",
                         i <= 2 ? "bg-emerald-500" : "bg-white/5 group-hover:bg-white/10"
                       )} />
                       <p className={cn(
                         "text-[8px] font-bold uppercase tracking-widest",
                         i <= 2 ? "text-white" : "text-slate-700 group-hover:text-slate-500"
                       )}>{s}</p>
                    </div>
                  ))}
               </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <Card className="bg-white/[0.01] border-white/5 rounded-none p-10 space-y-10">
                  <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-500">Protocol Context</h3>
                  <p className="text-sm text-slate-300 font-light leading-relaxed">
                     This initiative involves the deployment of subterranean network nodes within the BGC sub-sector. 
                     Key hurdles include high-level stakeholder alignment and local node encryption verification.
                  </p>
                  <div className="space-y-4 pt-6 border-t border-white/[0.03]">
                     <div className="flex items-center space-x-3">
                        <Shield size={14} className="text-emerald-500" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Security Clearance: Board Only</span>
                     </div>
                     <div className="flex items-center space-x-3">
                        <DollarSign size={14} className="text-emerald-500" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Projected Liquidity: ₱84M</span>
                     </div>
                  </div>
               </Card>

               <Card className="bg-white/[0.01] border-white/5 rounded-none p-10 space-y-10">
                  <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-500">Related Stakeholders</h3>
                  <div className="space-y-6">
                     {[
                       { name: 'Alexander Wright', role: 'Primary Lead', org: 'Alpha Group' },
                       { name: 'Elena Vance', role: 'Security Ops', org: 'Black Mesa' },
                     ].map((sh, i) => (
                       <div key={i} className="flex items-center justify-between group">
                          <div className="flex items-center space-x-4">
                             <div className="h-10 w-10 bg-white/5 rounded-none border border-white/5 flex items-center justify-center text-xs font-bold text-slate-500 group-hover:text-emerald-500 group-hover:border-emerald-500/20 transition-all cursor-pointer">
                                {sh.name.split(' ').map(n=>n[0]).join('')}
                             </div>
                             <div className="space-y-0.5">
                                <p className="text-xs font-bold text-white tracking-tight">{sh.name}</p>
                                <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest leading-none">{sh.org}</p>
                             </div>
                          </div>
                          <Badge variant="outline" className="rounded-none border-none text-[7px] font-bold uppercase tracking-widest text-slate-400">{sh.role}</Badge>
                       </div>
                     ))}
                  </div>
                  <Button variant="ghost" className="w-full border border-dashed border-white/10 rounded-none h-10 text-[9px] font-bold uppercase tracking-[0.3em] text-slate-700 hover:text-white hover:border-white/20 transition-all">Link Entity</Button>
               </Card>
            </div>
         </div>

         <div className="space-y-8">
             <Card className="bg-white/[0.02] border-white/5 rounded-none p-10 space-y-10">
                <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-amber-500">Upcoming Dependencies</h3>
                <div className="space-y-8">
                   {[
                     { title: 'Liquidity Authorization Node', due: '24h', icon: Clock },
                     { title: 'BGC Regulatory Document Sync', due: '2d', icon: Clock },
                     { title: 'Personnel Deployment Check', due: 'Completed', icon: CheckCircle2 },
                   ].map((dep, i) => (
                     <div key={i} className="flex items-start justify-between group">
                        <div className="flex items-center space-x-4">
                           <dep.icon size={14} className={cn(dep.due === 'Completed' ? "text-emerald-500" : "text-amber-500")} />
                           <div className="space-y-1">
                              <p className="text-[11px] font-bold tracking-tight text-white">{dep.title}</p>
                              <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Due: {dep.due}</p>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
                <Button className="w-full h-12 rounded-none bg-white/[0.05] text-white text-[9px] font-bold uppercase tracking-[0.3em] hover:bg-white/10 transition-all">Generate Task Sequence</Button>
             </Card>

             <Card className="bg-emerald-500 p-10 flex flex-col justify-between h-48 rounded-none">
                <div className="space-y-1">
                   <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">Division Ownership</p>
                   <h3 className="text-3xl font-headline text-black tracking-tighter">Underground</h3>
                </div>
                <div className="pt-6 border-t border-black/10">
                   <p className="text-[10px] font-bold uppercase tracking-widest text-black">Network Priority: High</p>
                </div>
             </Card>
         </div>
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';
