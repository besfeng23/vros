
'use client';

import React, { useState } from 'react';
import { Search, Filter, Plus, User, Mail, Phone, MoreHorizontal, Building2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

export default function CRMPage() {
  const [contacts] = useState([
    { id: 'C-001', name: 'Alexander Wright', org: 'Alpha Group', email: 'a.wright@alpha.com', role: 'Strategic Partner', status: 'Active' },
    { id: 'C-002', name: 'Elena Vance', org: 'Black Mesa', email: 'e.vance@bm.org', role: 'Security Lead', status: 'Confidential' },
    { id: 'C-003', name: 'Robert House', org: 'New Vegas Inc', email: 'mr.house@lucky38.com', role: 'Executive', status: 'Strategic' },
  ]);

  return (
    <div className="space-y-12 pb-20 bg-[#050505] min-h-screen -m-6 lg:-m-16 p-6 lg:p-16 text-white font-body">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-5xl font-headline tracking-tighter">CRM Console</h1>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.4em]">Global Stakeholder Intelligence & Relations</p>
        </div>
        <Button className="h-14 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-[0.3em] px-10 transition-all shadow-xl shadow-emerald-900/20">
          <Plus size={16} className="mr-2" />
          Initialize Contact
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="bg-white/[0.02] border-white/5 rounded-none p-8 space-y-4">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Total Stakeholders</p>
            <p className="text-3xl font-headline">1,204</p>
         </Card>
         <Card className="bg-white/[0.02] border-white/5 rounded-none p-8 space-y-4">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Strategic Partners</p>
            <p className="text-3xl font-headline">42</p>
         </Card>
         <Card className="bg-white/[0.02] border-white/5 rounded-none p-8 space-y-4">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Engagement Level</p>
            <p className="text-3xl font-headline text-emerald-500">High</p>
         </Card>
      </div>

      <Card className="bg-white/[0.02] border-white/5 rounded-none overflow-hidden">
        <div className="p-8 border-b border-white/5 flex flex-wrap gap-6 items-center">
           <div className="flex-1 relative min-w-[300px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
              <Input placeholder="Filter entries..." className="pl-12 h-12 bg-white/5 border-none rounded-none text-[10px] font-bold uppercase tracking-widest text-white placeholder:text-slate-700" />
           </div>
           <Button variant="outline" className="h-12 rounded-none border-white/10 text-slate-400 text-[10px] font-bold uppercase tracking-widest px-8">
              <Filter size={14} className="mr-2" />
              Intelligence Filter
           </Button>
        </div>
        <Table>
          <TableHeader className="bg-white/[0.03]">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 py-6 px-10">Entity ID</TableHead>
              <TableHead className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 py-6">Stakeholder</TableHead>
              <TableHead className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 py-6">Organization</TableHead>
              <TableHead className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 py-6">Protocol / Role</TableHead>
              <TableHead className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 py-6 font-center text-right pr-10">Integrity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((c) => (
              <TableRow key={c.id} className="border-white/[0.02] hover:bg-white/[0.01] transition-colors">
                <TableCell className="py-8 px-10 font-bold text-[10px] text-slate-600">{c.id}</TableCell>
                <TableCell className="py-8">
                   <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-white/5 flex items-center justify-center text-emerald-500 text-[10px] font-bold border border-emerald-500/10">
                         {c.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="space-y-1">
                         <p className="text-sm font-bold text-white tracking-tight">{c.name}</p>
                         <p className="text-[9px] text-slate-500 font-bold tracking-widest uppercase">{c.email}</p>
                      </div>
                   </div>
                </TableCell>
                <TableCell className="py-8">
                   <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      <Building2 size={12} className="text-emerald-500" />
                      <span>{c.org}</span>
                   </div>
                </TableCell>
                <TableCell className="py-8">
                   <Badge variant="outline" className="rounded-none border-white/10 text-slate-500 text-[8px] font-bold uppercase tracking-[0.2em] px-4 py-1">
                      {c.role}
                   </Badge>
                </TableCell>
                <TableCell className="py-8 text-right pr-10">
                   <div className="inline-flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">{c.status}</span>
                      <Button variant="ghost" size="icon" className="text-slate-700 hover:text-white hover:bg-white/5 ml-4">
                         <MoreHorizontal size={14} />
                      </Button>
                   </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
