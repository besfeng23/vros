
'use client';

import React from 'react';
import { History, Shield, Terminal, Search, Filter, HardDrive, Cpu, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function AuditPage() {
  const logs = [
    { id: 'LOG-8821', user: 'Admin', action: 'Global Liquidity Transfer Authorized', scope: 'Finance', target: 'Division: Underground', status: 'Success', date: '2026-04-24 10:41:35Z' },
    { id: 'LOG-8819', user: 'Patty', action: 'Client Engagement Record Updated', scope: 'CRM', target: 'Stakeholder: Alpha Group', status: 'Success', date: '2026-04-24 10:30:12Z' },
    { id: 'LOG-8817', user: 'System', action: 'Automated Encryption Rotation', scope: 'Security', target: 'Core Vault', status: 'Success', date: '2026-04-24 10:00:00Z' },
    { id: 'LOG-8815', user: 'Unknown', action: 'Failed Authentication Attempt', scope: 'Access', target: 'Node: Manila_HQ', status: 'Warning', date: '2026-04-24 09:45:22Z' },
  ];

  return (
    <div className="space-y-12 pb-20 bg-[#050505] min-h-screen -m-6 lg:-m-16 p-6 lg:p-16 text-white font-body">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-5xl font-headline tracking-tighter">System Audit</h1>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.4em]">Irrefutable Immutable Ledger of Global Events</p>
        </div>
        <div className="flex space-x-4">
           <Button variant="outline" className="h-14 rounded-none border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-[0.3em] px-8 bg-emerald-500/5">
              Secure Export
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         {[
           { label: 'Integrity Status', val: 'Compromise Free', color: 'text-emerald-500', icon: Shield },
           { label: 'Event Logging', val: 'Active', color: 'text-emerald-500', icon: Terminal },
           { label: 'Storage Node', val: 'Distributed', color: 'text-white', icon: HardDrive },
           { label: 'Encryption Level', val: 'Elite', color: 'text-white', icon: Cpu },
         ].map((stat, i) => (
           <Card key={i} className="bg-white/[0.02] border-white/5 rounded-none p-8 flex items-center justify-between group">
              <div className="space-y-2">
                 <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{stat.label}</p>
                 <p className={cn("text-lg font-headline", stat.color)}>{stat.val}</p>
              </div>
              <stat.icon size={20} className="text-slate-800 group-hover:text-emerald-500 transition-colors" />
           </Card>
         ))}
      </div>

      <Card className="bg-white/[0.01] border-white/5 rounded-none overflow-hidden">
         <div className="p-8 border-b border-white/5 flex gap-8 items-center bg-white/[0.02]">
            <div className="flex-1 relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" size={14} />
               <Input placeholder="Enter Scan Query..." className="pl-12 h-12 bg-transparent border-none rounded-none text-[10px] font-bold uppercase tracking-widest text-emerald-500 placeholder:text-slate-800" />
            </div>
            <Button variant="ghost" className="text-[10px] uppercase tracking-widest font-bold text-slate-500 hover:text-white">Time Series</Button>
            <Button variant="ghost" className="text-[10px] uppercase tracking-widest font-bold text-slate-500 hover:text-white">Security Scope</Button>
         </div>
         <div className="flex flex-col">
            {logs.map((log, i) => (
              <div key={i} className="p-10 border-b border-white/[0.02] flex flex-col md:flex-row md:items-center justify-between gap-10 hover:bg-white/[0.01] transition-all group">
                 <div className="flex items-center space-x-12">
                    <div className="h-12 w-12 bg-white/5 border border-white/5 flex items-center justify-center text-slate-600 group-hover:text-emerald-500 transition-colors">
                       <Terminal size={18} />
                    </div>
                    <div className="space-y-2">
                       <div className="flex items-center space-x-4">
                          <p className="text-[10px] font-bold text-white uppercase tracking-widest">{log.user}</p>
                          <span className="h-4 w-[1px] bg-white/10" />
                          <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest">{log.scope}</p>
                       </div>
                       <p className="text-sm font-medium text-slate-300 tracking-tight">{log.action}</p>
                       <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest italic">{log.target}</p>
                    </div>
                 </div>

                 <div className="text-right space-y-3">
                    <Badge variant="outline" className={cn(
                      "rounded-none border-none text-[8px] font-bold uppercase tracking-widest px-4",
                      log.status === 'Warning' ? "bg-amber-500 text-white" : "bg-white/10 text-slate-400"
                    )}>{log.status}</Badge>
                    <p className="text-[9px] text-slate-700 font-bold uppercase tracking-widest">{log.date}</p>
                 </div>
              </div>
            ))}
         </div>
      </Card>
    </div>
  );
}

import { cn } from '@/lib/utils';
