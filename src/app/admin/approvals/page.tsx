
'use client';

import React from 'react';
import { ShieldCheck, Clock, Check, X, AlertCircle, User, Filter, ArrowRightLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ApprovalsPage() {
  const requests = [
    { id: 'REQ-101', type: 'Budget Authorization', entity: 'Operational Upgrade Alpha', requestor: 'Field Runner 02', priority: 'High', status: 'Pending', date: '4h ago' },
    { id: 'REQ-104', type: 'Access Protocol', entity: 'Secure Vault Node #4', requestor: 'Patty', priority: 'Urgent', status: 'In Review', date: '12m ago' },
    { id: 'REQ-107', type: 'Asset Handoff', entity: 'Case #221-B', requestor: 'Underground Ops', priority: 'Normal', status: 'Pending', date: '1d ago' },
  ];

  return (
    <div className="space-y-12 pb-20 bg-[#050505] min-h-screen -m-6 lg:-m-16 p-6 lg:p-16 text-white">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-5xl font-headline tracking-tighter">Authorization Queue</h1>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.4em]">Executive Decisioning & Protocol Validation</p>
        </div>
        <div className="flex space-x-4">
           <Badge className="bg-emerald-500/10 text-emerald-500 rounded-none border border-emerald-500/20 text-[8px] font-bold uppercase tracking-widest px-6 py-4">
              99.9% Compliance Level
           </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: 'Pending Authorizations', val: '12', color: 'text-amber-500' },
           { label: 'Average Response Time', val: '1.4h', color: 'text-emerald-500' },
           { label: 'Security Breaches', val: '0', color: 'text-slate-500' },
         ].map((stat, i) => (
           <Card key={i} className="bg-white/[0.02] border-white/5 rounded-none p-10 space-y-4">
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
              <p className={cn("text-4xl font-headline", stat.color)}>{stat.val}</p>
           </Card>
         ))}
      </div>

      <Card className="bg-white/[0.01] border-white/5 rounded-none overflow-hidden">
         <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-emerald-500">Global Pending Queue</h3>
            <Button variant="ghost" className="text-[10px] uppercase tracking-widest font-bold text-slate-500 hover:text-white">Filter Protocol</Button>
         </div>
         <div className="divide-y divide-white/[0.02]">
            {requests.map((req, i) => (
              <div key={i} className="p-12 flex flex-col md:flex-row md:items-center justify-between gap-10 hover:bg-white/[0.01] transition-all">
                 <div className="flex items-center space-x-12">
                    <div className="space-y-2">
                       <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{req.id}</p>
                       <h4 className="text-xl font-headline tracking-tight">{req.type}</h4>
                       <div className="flex items-center space-x-4">
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{req.entity}</p>
                          <span className="h-1 w-1 rounded-full bg-slate-800" />
                          <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest">Requester: {req.requestor}</p>
                       </div>
                    </div>
                 </div>

                 <div className="flex items-center space-x-12">
                    <div className="text-right space-y-2">
                       <Badge variant="outline" className={cn(
                         "rounded-none border-none text-[8px] font-bold uppercase tracking-widest px-3",
                         req.priority === 'Urgent' ? "bg-red-500 text-white" : "bg-white/10 text-slate-400"
                       )}>{req.priority} Priority</Badge>
                       <p className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">{req.date}</p>
                    </div>
                    <div className="flex space-x-2">
                       <Button className="h-14 w-14 bg-emerald-600 p-0 rounded-none shadow-xl shadow-emerald-900/20 hover:bg-emerald-500 transition-all">
                          <Check size={20} />
                       </Button>
                       <Button className="h-14 w-14 bg-white/5 border border-white/5 p-0 rounded-none text-slate-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all">
                          <X size={20} />
                       </Button>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </Card>
    </div>
  );
}

import { cn } from '@/lib/utils';
