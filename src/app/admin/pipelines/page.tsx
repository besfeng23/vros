
'use client';

import React from 'react';
import { Layers, Search, Filter, Plus, Clock, TrendingUp, AlertCircle, MoreVertical } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function PipelinesPage() {
  const divisions = [
    { name: 'Underground', health: 94, deals: 8, value: '₱42.5M' },
    { name: 'Entertainment', health: 88, deals: 12, value: '₱28.2M' },
    { name: 'Corporate', health: 98, deals: 6, value: '₱65.1M' },
    { name: '88 Dept', health: 92, deals: 4, value: 'Confidential' },
  ];

  const stages = [
    { name: 'Prospecting', count: 12, value: '₱120M' },
    { name: 'Qualified', count: 8, value: '₱85M' },
    { name: 'Strategic Deep-Dive', count: 5, value: '₱42M' },
    { name: 'Negotiation', count: 3, value: '₱18M' },
    { name: 'Closed-Secured', count: 24, value: '₱1.2B' },
  ];

  return (
    <div className="space-y-12 pb-20 bg-[#050505] min-h-screen -m-6 lg:-m-16 p-6 lg:p-16 text-white">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-5xl font-headline tracking-tighter">Operations Pipelines</h1>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.4em]">Multi-Division Deal & Initiative Velocity</p>
        </div>
        <div className="flex space-x-4">
           <Button variant="outline" className="h-14 rounded-none border-white/10 text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] px-8">
              Configure Stages
           </Button>
           <Button className="h-14 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-[0.3em] px-10 transition-all shadow-xl shadow-emerald-900/20">
              <Plus size={16} className="mr-2" />
              New Stream
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         {divisions.map(div => (
           <Card key={div.name} className="bg-white/[0.02] border-white/5 rounded-none p-10 space-y-8 hover:bg-white/[0.04] transition-all group">
              <div className="flex justify-between items-start">
                 <div className="space-y-1">
                    <h3 className="text-2xl font-headline group-hover:text-emerald-500 transition-colors">{div.name}</h3>
                    <p className="text-[9px] text-slate-500 font-bold tracking-widest uppercase italic">Division Status</p>
                 </div>
                 <div className="p-3 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] font-bold">
                    {div.health}%
                 </div>
              </div>
              <div className="space-y-4 pt-6 border-t border-white/5">
                 <div className="flex justify-between">
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Active Deals</span>
                    <span className="text-[10px] font-bold text-white">{div.deals}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Pipeline Value</span>
                    <span className="text-[10px] font-bold text-emerald-500">{div.value}</span>
                 </div>
              </div>
           </Card>
         ))}
      </div>

      {/* Kanban-ish Stage Overview */}
      <div className="flex space-x-6 overflow-x-auto pb-10 custom-scrollbar">
         {stages.map(stage => (
           <div key={stage.name} className="flex-shrink-0 w-80 space-y-6">
              <div className="flex items-center justify-between px-4">
                 <div className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">{stage.name}</h4>
                 </div>
                 <Badge className="bg-white/5 text-slate-500 rounded-none border-none text-[8px] font-bold">{stage.count}</Badge>
              </div>
              <div className="space-y-4">
                 <div className="p-8 bg-white/[0.01] border border-dashed border-white/5 flex flex-col items-center justify-center space-y-4 hover:border-white/20 transition-all cursor-pointer group">
                    <Plus size={20} className="text-slate-800 group-hover:text-emerald-500 transition-colors" />
                    <span className="text-[8px] font-bold uppercase tracking-widest text-slate-700">Add Initiative</span>
                 </div>
                 {[...Array(2)].map((_, i) => (
                   <Card key={i} className="bg-white/[0.03] border-white/5 rounded-none p-6 space-y-6 hover:bg-white/[0.05] transition-all cursor-pointer">
                      <div className="flex justify-between">
                         <Badge className="bg-white/5 text-slate-500 rounded-none border-none text-[7px] font-bold uppercase tracking-widest">P1 Initiative</Badge>
                         <MoreVertical size={14} className="text-slate-700 hover:text-white" />
                      </div>
                      <p className="text-xs font-bold leading-relaxed tracking-tight">Expansion Protocol: Terminal BGC Sub-Node</p>
                      <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-slate-600">
                         <div className="flex items-center">
                            <Clock size={12} className="mr-2" />
                            3d Left
                         </div>
                         <TrendingUp size={12} />
                      </div>
                   </Card>
                 ))}
                 <div className="pt-4 border-t border-white/[0.02] text-center">
                    <p className="text-[8px] font-bold text-slate-700 uppercase tracking-widest">Stage Liquidity: {stage.value}</p>
                 </div>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}
