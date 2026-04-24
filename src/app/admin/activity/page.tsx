
'use client';

import React from 'react';
import { History, Eye, Search, Filter, Shield, Terminal, ArrowRight, Share2, MoreHorizontal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function ActivityPage() {
  const activities = [
    { id: 'ACT-991', user: 'Admin', type: 'Security', action: 'Authorized Global Vault Access Level 4 for Patty', date: '2m ago', icon: Shield },
    { id: 'ACT-988', user: 'Joven', type: 'Financial', action: 'Initiated Liquidity Pool Rebalancing for Underground Ops', date: '14m ago', icon: History },
    { id: 'ACT-985', user: 'Patty', type: 'Operation', action: 'Deactivated Talent Node #24 due to contract breach', date: '42m ago', icon: Eye },
    { id: 'ACT-982', user: 'System', type: 'Technical', action: 'Automated Backup Cycle Completed: 4 Nodes Sync', date: '1h ago', icon: Terminal },
  ];

  return (
    <div className="space-y-12 pb-20 bg-[#050505] min-h-screen -m-6 lg:-m-16 p-6 lg:p-16 text-white font-body">
      <div className="flex justify-between items-end border-b border-white/5 pb-12">
        <div className="space-y-2">
          <h1 className="text-5xl font-headline tracking-tighter">Global Activity Feed</h1>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.4em]">Real-time Transactional & Operational Intelligence Feed</p>
        </div>
        <div className="flex space-x-4">
           <Button variant="outline" className="h-14 rounded-none border-white/10 text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] px-8">
              Live Stream
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <div className="lg:col-span-3 space-y-4">
            {activities.map((act, i) => (
              <Card key={i} className="bg-white/[0.01] border-white/5 rounded-none p-10 flex items-center justify-between group hover:bg-white/[0.03] transition-all">
                 <div className="flex items-center space-x-12">
                    <div className="h-14 w-14 bg-white/5 border border-white/5 flex items-center justify-center text-slate-800 group-hover:text-emerald-500 transition-colors">
                       <act.icon size={22} />
                    </div>
                    <div className="space-y-2">
                       <div className="flex items-center space-x-4">
                          <p className="text-sm font-bold text-white tracking-tight">{act.user}</p>
                          <span className="h-4 w-[1px] bg-white/10" />
                          <Badge variant="outline" className="rounded-none border-none text-[8px] font-bold uppercase tracking-widest bg-white/10 text-slate-400 px-3">{act.type}</Badge>
                       </div>
                       <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-xl">{act.action}</p>
                       <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest italic pt-2">{act.id} • Verified Protocol</p>
                    </div>
                 </div>

                 <div className="text-right space-y-4 flex flex-col items-end">
                    <p className="text-[10px] text-slate-700 font-bold uppercase tracking-widest">{act.date}</p>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-700 hover:text-white"><Eye size={16} /></Button>
                       <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-700 hover:text-white"><Share2 size={16} /></Button>
                       <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-700 hover:text-white"><ArrowRight size={16} /></Button>
                    </div>
                 </div>
              </Card>
            ))}
            <div className="pt-10 text-center">
               <Button variant="ghost" className="text-[10px] uppercase font-bold tracking-[0.4em] text-slate-700 hover:text-emerald-500">Decipher Historical Logs</Button>
            </div>
         </div>

         <div className="space-y-10">
            <Card className="bg-white/[0.02] border-white/5 rounded-none p-10 space-y-8">
               <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-emerald-500">Activity Health</h3>
               <div className="space-y-6">
                  {['Financial', 'Operational', 'Security', 'Stakeholder'].map((type, i) => (
                    <div key={i} className="space-y-3">
                       <div className="flex justify-between items-end">
                          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{type}</p>
                          <p className="text-[9px] font-bold text-white uppercase tracking-widest">{90 - (i*10)}%</p>
                       </div>
                       <div className="h-[2px] w-full bg-white/5 overflow-hidden">
                          <div className="h-full bg-emerald-500 shadow-[0_0_8px_#10b981]" style={{ width: `${90 - (i*10)}%` }} />
                       </div>
                    </div>
                  ))}
               </div>
            </Card>

            <div className="p-10 border border-white/10 text-center space-y-4 bg-emerald-500/5 group cursor-pointer hover:bg-emerald-500/10 transition-all">
               <Share2 size={24} className="mx-auto text-emerald-500/40 group-hover:text-emerald-500 transition-all" />
               <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-500">Live External Sync</p>
            </div>
         </div>
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';
