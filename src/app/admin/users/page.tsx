
'use client';

import React from 'react';
import { User, Shield, Search, Filter, Plus, Mail, MoreHorizontal, Key, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function UsersPage() {
  const users = [
    { id: 'USR-001', name: 'Joven', role: 'Executive', dept: 'Corporate', status: 'Active', email: 'joven@harmony.os' },
    { id: 'USR-002', name: 'Patty', role: 'Executive', dept: '88 Dept / Ent', status: 'Active', email: 'patty@harmony.os' },
    { id: 'USR-003', name: 'Field Runner 02', role: 'Operations', dept: 'Underground', status: 'Deployed', email: 'fr02@underground.net' },
    { id: 'USR-004', name: 'Finance Lead', role: 'Finance', dept: 'Corporate', status: 'Active', email: 'finance@corporate.com' },
  ];

  return (
    <div className="space-y-12 pb-20 bg-[#050505] min-h-screen -m-6 lg:-m-16 p-6 lg:p-16 text-white font-body">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-5xl font-headline tracking-tighter">Personnel Control</h1>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.4em]">Identity Management & Access Sovereignty</p>
        </div>
        <Button className="h-14 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-[0.3em] px-10 transition-all shadow-xl shadow-emerald-900/20">
          <Plus size={16} className="mr-2" />
          Onboard Personnel
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="bg-white/[0.02] border-white/5 rounded-none p-10 space-y-4">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Active Personnel</p>
            <p className="text-3xl font-headline">72 Units</p>
         </Card>
         <Card className="bg-white/[0.02] border-white/5 rounded-none p-10 space-y-4">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Executive Nodes</p>
            <p className="text-3xl font-headline">4 Units</p>
         </Card>
         <Card className="bg-white/[0.02] border-white/5 rounded-none p-10 space-y-4">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Global Status</p>
            <p className="text-3xl font-headline text-emerald-500">Nominal</p>
         </Card>
      </div>

      <Card className="bg-white/[0.01] border-white/5 rounded-none overflow-hidden">
         <div className="p-8 border-b border-white/5 flex gap-8 items-center bg-white/[0.02]">
            <div className="flex-1 relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" size={14} />
               <Input placeholder="Search personnel..." className="pl-12 h-12 bg-transparent border-none rounded-none text-[10px] font-bold uppercase tracking-widest text-white placeholder:text-slate-800" />
            </div>
            <div className="flex space-x-4">
               <Button variant="ghost" className="text-[10px] uppercase tracking-widest font-bold text-slate-500 hover:text-white px-4 h-12 rounded-none">All Roles</Button>
               <Button variant="ghost" className="text-[10px] uppercase tracking-widest font-bold text-slate-500 hover:text-white px-4 h-12 rounded-none">Active Only</Button>
            </div>
         </div>
         <div className="flex flex-col">
            {users.map((u, i) => (
              <div key={i} className="p-10 border-b border-white/[0.02] flex items-center justify-between hover:bg-white/[0.01] transition-all group">
                 <div className="flex items-center space-x-10">
                    <div className="h-14 w-14 bg-white/5 border border-white/5 flex items-center justify-center text-emerald-500 font-bold text-sm">
                       {u.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="space-y-1">
                       <h4 className="text-lg font-headline tracking-tighter text-white">{u.name}</h4>
                       <div className="flex items-center space-x-4 text-[9px] font-bold uppercase tracking-widest text-slate-600">
                          <span>{u.role}</span>
                          <span>•</span>
                          <span>{u.dept}</span>
                       </div>
                    </div>
                 </div>

                 <div className="flex items-center space-x-12">
                    <div className="text-right space-y-2">
                       <Badge variant="outline" className="rounded-none border-white/10 text-emerald-500 text-[8px] font-bold uppercase tracking-widest px-3">{u.status}</Badge>
                       <p className="text-[9px] text-slate-700 font-bold uppercase tracking-widest">{u.email}</p>
                    </div>
                    <div className="flex space-x-1">
                       <Button variant="ghost" size="icon" className="h-12 w-12 text-slate-800 hover:text-white"><Eye size={16} /></Button>
                       <Button variant="ghost" size="icon" className="h-12 w-12 text-slate-800 hover:text-white"><Key size={16} /></Button>
                       <Button variant="ghost" size="icon" className="h-12 w-12 text-slate-800 hover:text-red-400"><MoreHorizontal size={16} /></Button>
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
