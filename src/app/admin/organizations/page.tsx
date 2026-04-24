
'use client';

import React from 'react';
import { Store, MapPin, Globe, Users, TrendingUp, Shield, MoreHorizontal, Plus, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function OrganizationsPage() {
  const departments = [
    { name: 'Underground', head: 'Executive Board', assets: 'Global', health: 94, color: '#10b981', desc: 'Strategic operations in unregulated and high-security sectors.' },
    { name: 'Entertainment', head: 'Patty', assets: 'Regional', health: 88, color: '#ec4899', desc: 'Tier-1 talent management and media ecosystem orchestration.' },
    { name: 'Corporate', head: 'Joven', assets: 'Centralized', health: 98, color: '#3b82f6', desc: 'Institutional partnerships and high-liquidity financial instruments.' },
    { name: '88 Department', head: 'Patty/Board', assets: 'Classified', health: 92, color: '#8b5cf6', desc: 'Confidential administrative oversight and deep-network integrity.' },
  ];

  return (
    <div className="space-y-12 pb-20 bg-[#050505] min-h-screen -m-6 lg:-m-16 p-6 lg:p-16 text-white font-body">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-5xl font-headline tracking-tighter">Organizations</h1>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.4em]">Multi-Division Architecture & Resource Control</p>
        </div>
        <Button className="h-14 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-[0.3em] px-10 transition-all shadow-xl shadow-emerald-900/20">
          <Plus size={16} className="mr-2" />
          Initialize Division
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {departments.map((dept, i) => (
           <Card key={i} className="bg-white/[0.02] border-white/5 rounded-none p-12 space-y-10 group hover:bg-white/[0.04] transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 h-full flex flex-col justify-between items-end pointer-events-none opacity-5">
                 <Store size={180} />
              </div>
              
              <div className="space-y-4 relative z-10">
                 <div className="h-1 w-20" style={{ backgroundColor: dept.color }} />
                 <div className="flex justify-between items-start">
                    <div className="space-y-1">
                       <h2 className="text-4xl font-headline group-hover:text-emerald-500 transition-colors uppercase tracking-tight">{dept.name}</h2>
                       <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.4em]">Head of Division: {dept.head}</p>
                    </div>
                    <Badge variant="outline" className="rounded-none border-white/10 text-slate-500 text-[8px] font-bold uppercase tracking-widest px-4 py-1">Health: {dept.health}%</Badge>
                 </div>
              </div>

              <p className="text-sm text-slate-400 font-light leading-relaxed max-w-lg relative z-10 italic">
                 "{dept.desc}"
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 pt-10 border-t border-white/[0.03]">
                 <div className="space-y-1">
                    <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Active Personnel</p>
                    <p className="text-xl font-headline tracking-tight">42 Units</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Ongoing Cases</p>
                    <p className="text-xl font-headline tracking-tight">18 Active</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Net Liquidity</p>
                    <p className="text-xl font-headline tracking-tight text-emerald-500">Nominal</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Asset Reach</p>
                    <p className="text-xl font-headline tracking-tight">{dept.assets}</p>
                 </div>
              </div>

              <div className="flex justify-end pt-4 relative z-10">
                 <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors group">
                    Enter Domain View
                    <TrendingUp size={14} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 </Button>
              </div>
           </Card>
         ))}
      </div>
    </div>
  );
}
