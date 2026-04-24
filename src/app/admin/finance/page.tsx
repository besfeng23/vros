
'use client';

import React from 'react';
import { CreditCard, ArrowUpRight, ArrowDownRight, Search, Filter, Plus, PieChart, Activity, DollarSign, Terminal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function FinancePage() {
  return (
    <div className="space-y-12 pb-20 bg-[#050505] min-h-screen -m-6 lg:-m-16 p-6 lg:p-16 text-white font-body">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-5xl font-headline tracking-tighter">Finance Ledger</h1>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.4em]">Global Liquidity & Transactional Integrity</p>
        </div>
        <div className="flex space-x-4">
           <Button variant="outline" className="h-14 rounded-none border-white/10 text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] px-8">
              Audit Logs
           </Button>
           <Button className="h-14 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-[0.3em] px-10 transition-all shadow-xl shadow-emerald-900/20">
              <Plus size={16} className="mr-2" />
              New Entry
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { label: 'Global Liquidity', value: '₱142.8M', change: '+₱1.2M', icon: DollarSign, color: 'text-emerald-500' },
           { label: 'Outbound Flow', value: '₱18.4M', change: '-4.2%', icon: ArrowUpRight, color: 'text-red-400' },
           { label: 'Pending Settlement', value: '₱4.2M', change: '8 Items', icon: Activity, color: 'text-amber-500' },
           { label: 'Projected Q4', value: '₱250M', change: 'Target 92%', icon: PieChart, color: 'text-emerald-500' },
         ].map((stat, i) => (
           <Card key={i} className="bg-white/[0.02] border-white/5 rounded-none p-8 space-y-6 group">
              <div className="flex justify-between items-start">
                 <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                 <stat.icon size={16} className={stat.color} />
              </div>
              <div className="space-y-1">
                 <h3 className="text-3xl font-headline">{stat.value}</h3>
                 <p className={cn("text-[9px] font-bold uppercase tracking-widest", stat.color)}>{stat.change}</p>
              </div>
           </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <Card className="lg:col-span-2 bg-white/[0.02] border-white/5 rounded-none p-0 overflow-hidden">
            <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
               <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-emerald-500">Transaction Feed</h3>
               <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Real-time Verification Active</span>
               </div>
            </div>
            <div className="divide-y divide-white/[0.02]">
               {[
                 { id: 'TX-9921', title: 'Asset Deployment: Division C', amount: '-₱1.2M', status: 'Verified', date: '2m ago', color: 'text-red-400' },
                 { id: 'TX-9918', title: 'Contract Settlement: Stakeholder A', amount: '+₱4.5M', status: 'Settled', date: '45m ago', color: 'text-emerald-500' },
                 { id: 'TX-9915', title: 'Internal Transfer: HQ to Underground', amount: '₱500K', status: 'Pending', date: '1h ago', color: 'text-amber-500' },
                 { id: 'TX-9912', title: 'Service Dividend: Special Ops', amount: '+₱1.1M', status: 'Verified', date: '4h ago', color: 'text-emerald-500' },
               ].map((tx, i) => (
                 <div key={i} className="p-10 flex items-center justify-between hover:bg-white/[0.01] transition-all">
                    <div className="flex items-center space-x-10">
                       <div className="h-10 w-10 bg-white/5 flex items-center justify-center text-slate-600">
                          <Terminal size={16} />
                       </div>
                       <div className="space-y-1">
                          <p className="text-sm font-bold tracking-tight">{tx.title}</p>
                          <div className="flex items-center space-x-3 text-[9px] font-bold uppercase tracking-widest text-slate-600">
                             <span>{tx.id}</span>
                             <span>•</span>
                             <span>{tx.date}</span>
                          </div>
                       </div>
                    </div>
                    <div className="text-right space-y-1">
                       <p className={cn("text-sm font-bold tracking-tight", tx.color)}>{tx.amount}</p>
                       <Badge variant="outline" className="rounded-none text-[8px] font-bold uppercase tracking-widest border-none p-0">{tx.status}</Badge>
                    </div>
                 </div>
               ))}
            </div>
         </Card>

         <Card className="bg-white/[0.02] border-white/5 rounded-none flex flex-col">
            <CardHeader className="p-10 border-b border-white/5">
                <CardTitle className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-500">Allocation Distribution</CardTitle>
            </CardHeader>
            <CardContent className="p-10 space-y-10">
               {[
                 { name: 'Underground Operations', val: 45, color: 'bg-emerald-500' },
                 { name: 'Corporate Infrastructure', val: 25, color: 'bg-white/40' },
                 { name: 'Entertainment & Media', val: 20, color: 'bg-white/20' },
                 { name: 'Strategic Reserve', val: 10, color: 'bg-white/5' },
               ].map((item, i) => (
                 <div key={i} className="space-y-4">
                    <div className="flex justify-between items-end">
                       <p className="text-[10px] font-bold uppercase tracking-widest text-white">{item.name}</p>
                       <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">{item.val}%</p>
                    </div>
                    <div className="h-[2px] w-full bg-white/5 overflow-hidden">
                       <div className={cn("h-full transition-all duration-1000", item.color)} style={{ width: `${item.val}%` }} />
                    </div>
                 </div>
               ))}
            </CardContent>
            <div className="mt-auto p-10 border-t border-white/5 text-center">
               <p className="text-[8px] font-bold text-slate-700 uppercase tracking-[0.3em]">Authorized Views Only</p>
            </div>
         </Card>
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';
