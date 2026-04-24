
'use client';

import React from 'react';
import { Lock, Search, Filter, Plus, FileText, Shield, HardDrive, Download, Eye, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function VaultPage() {
  const assets = [
    { name: 'Strategic Ops Manual v3.pdf', size: '4.2 MB', type: 'PDF', division: '88 Dept', date: '2026-04-20', security: 'Confidential' },
    { name: 'Underground Supply Chain Alpha.xlsx', size: '1.8 MB', type: 'XLSX', division: 'Underground', date: '2026-04-18', security: 'Top Secret' },
    { name: 'Talent Contracts Bundle Q2.zip', size: '124 MB', type: 'ARCHIVE', division: 'Entertainment', date: '2026-04-15', security: 'Internal' },
    { name: 'HQ Security Protocls.pdf', size: '12.5 MB', type: 'PDF', division: 'Corporate', date: '2026-04-10', security: 'Restricted' },
  ];

  return (
    <div className="space-y-12 pb-20 bg-[#050505] min-h-screen -m-6 lg:-m-16 p-6 lg:p-16 text-white font-body">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-5xl font-headline tracking-tighter">Intellectual Vault</h1>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.4em]">Encrypted Asset Repository & Documentation</p>
        </div>
        <div className="flex space-x-4">
           <Button variant="outline" className="h-14 rounded-none border-white/10 text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] px-8">
              Access Keys
           </Button>
           <Button className="h-14 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-[0.3em] px-10 transition-all shadow-xl shadow-emerald-900/20">
              <Plus size={16} className="mr-2" />
              Upload Asset
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="bg-white/[0.02] border-white/5 rounded-none p-10 flex items-center space-x-10 group">
            <div className="p-4 bg-emerald-500/10 text-emerald-500 rounded-none border border-emerald-500/20">
               <Shield size={24} />
            </div>
            <div className="space-y-1">
               <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Security Status</p>
               <p className="text-2xl font-headline">Fortified</p>
            </div>
         </Card>
         <Card className="bg-white/[0.02] border-white/5 rounded-none p-10 flex items-center space-x-10 group">
            <div className="p-4 bg-white/5 text-slate-400 rounded-none border border-white/5">
               <HardDrive size={24} />
            </div>
            <div className="space-y-1">
               <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Storage Utilization</p>
               <p className="text-2xl font-headline text-white">42.8 GB / 1 TB</p>
            </div>
         </Card>
         <Card className="bg-white/[0.02] border-white/5 rounded-none p-10 flex items-center space-x-10 group">
            <div className="p-4 bg-white/5 text-slate-400 rounded-none border border-white/5">
               <Lock size={24} />
            </div>
            <div className="space-y-1">
               <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Active Encryptions</p>
               <p className="text-2xl font-headline text-white">1,240 Nodes</p>
            </div>
         </Card>
      </div>

      <Card className="bg-white/[0.01] border-white/5 rounded-none p-12 space-y-10">
         <div className="flex flex-wrap gap-8 justify-between items-center">
            <div className="flex-1 relative min-w-[300px]">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
               <Input placeholder="Search global assets..." className="pl-12 h-12 bg-white/5 border-none rounded-none text-[10px] font-bold uppercase tracking-widest text-white placeholder:text-slate-700" />
            </div>
            <div className="flex space-x-4">
               <Badge className="bg-emerald-500/10 text-emerald-500 rounded-none border border-emerald-500/20 text-[8px] font-bold uppercase tracking-widest px-4 py-2 cursor-pointer">All Assets</Badge>
               <Badge className="bg-white/5 text-slate-500 rounded-none border-none text-[8px] font-bold uppercase tracking-widest px-4 py-2 cursor-pointer hover:text-white transition-colors">88 Dept</Badge>
               <Badge className="bg-white/5 text-slate-500 rounded-none border-none text-[8px] font-bold uppercase tracking-widest px-4 py-2 cursor-pointer hover:text-white transition-colors">Underground</Badge>
               <Badge className="bg-white/5 text-slate-500 rounded-none border-none text-[8px] font-bold uppercase tracking-widest px-4 py-2 cursor-pointer hover:text-white transition-colors">Corporate</Badge>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {assets.map((asset, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 p-8 space-y-8 group hover:bg-white/[0.04] transition-all hover:border-emerald-500/20">
                 <div className="flex justify-between items-start">
                    <div className="p-4 bg-white/5 text-slate-500 group-hover:text-emerald-500 transition-colors">
                       <FileText size={24} />
                    </div>
                    <Badge variant="outline" className={cn(
                      "rounded-none border-none text-[7px] font-bold uppercase tracking-widest px-2 py-0.5",
                      asset.security === 'Top Secret' ? "bg-red-500 text-white" : "bg-white/10 text-slate-400"
                    )}>{asset.security}</Badge>
                 </div>
                 <div className="space-y-2">
                    <p className="text-[11px] font-bold tracking-tight text-white line-clamp-1">{asset.name}</p>
                    <div className="flex justify-between text-[8px] font-bold uppercase tracking-widest text-slate-600">
                       <span>{asset.size}</span>
                       <span>{asset.division}</span>
                    </div>
                 </div>
                 <div className="flex border-t border-white/5 pt-6 space-x-1 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-emerald-500"><Eye size={14} /></Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-emerald-500"><Download size={14} /></Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-emerald-500"><ExternalLink size={14} /></Button>
                 </div>
              </div>
            ))}
         </div>
      </Card>
    </div>
  );
}

import { cn } from '@/lib/utils';
