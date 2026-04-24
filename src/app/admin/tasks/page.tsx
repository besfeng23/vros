
'use client';

import React from 'react';
import { PackageCheck, Clock, Plus, Filter, Search, CheckCircle2, AlertCircle, User, MoreVertical, LayoutGrid, List } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function TasksPage() {
  const tasks = [
    { id: 'TSK-221', title: 'Route Alpha Verification: Terminal BGC', assignee: 'Field 02', dept: 'Underground', priority: 'High', status: 'In Progress', due: '4h left' },
    { id: 'TSK-224', title: 'Secure Contract Draft: Level 4 Stakeholder', assignee: 'Admin', dept: 'Corporate', priority: 'Urgent', status: 'Awaiting', due: 'Today' },
    { id: 'TSK-227', title: 'Talent Deployment: Entertainment Hub', assignee: 'Patty', dept: 'Entertainment', priority: 'Normal', status: 'Pending', due: 'Tomorrow' },
    { id: 'TSK-230', title: '88 Dept Compliance Audit Node #09', assignee: 'System', dept: '88 Dept', priority: 'High', status: 'In Progress', due: '2h' },
  ];

  return (
    <div className="space-y-12 pb-20 bg-[#050505] min-h-screen -m-6 lg:-m-16 p-6 lg:p-16 text-white font-body">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-5xl font-headline tracking-tighter">Global Tasks</h1>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.4em]">Granular Operational Handoffs & Execution</p>
        </div>
        <div className="flex space-x-4">
           <Button variant="outline" className="h-14 rounded-none border-white/10 text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] px-8">
              <LayoutGrid size={16} className="mr-2" />
              Board View
           </Button>
           <Button className="h-14 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-[0.3em] px-10 transition-all shadow-xl shadow-emerald-900/20">
              <Plus size={16} className="mr-2" />
              New Task
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         {[
           { label: 'Active Execution', val: '24', color: 'text-emerald-500' },
           { label: 'Pending Handoffs', val: '12', color: 'text-amber-500' },
           { label: 'Blocked Nodes', val: '2', color: 'text-red-500' },
           { label: 'Resolution Rate', val: '94%', color: 'text-white' },
         ].map((stat, i) => (
           <Card key={i} className="bg-white/[0.02] border-white/5 rounded-none p-8 space-y-4">
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
              <p className={cn("text-3xl font-headline", stat.color)}>{stat.val}</p>
           </Card>
         ))}
      </div>

      <Card className="bg-white/[0.01] border-white/5 rounded-none overflow-hidden">
         <div className="p-8 border-b border-white/5 flex gap-8 items-center bg-white/[0.02]">
            <div className="flex-1 relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" size={14} />
               <Input placeholder="Filter global queue..." className="pl-12 h-12 bg-transparent border-none rounded-none text-[10px] font-bold uppercase tracking-widest text-white placeholder:text-slate-800" />
            </div>
            <div className="flex space-x-4">
               <Button variant="ghost" className="text-[10px] uppercase tracking-widest font-bold text-emerald-500 bg-emerald-500/5 px-4 h-12 rounded-none">All Execution</Button>
               <Button variant="ghost" className="text-[10px] uppercase tracking-widest font-bold text-slate-500 hover:text-white px-4 h-12 rounded-none">My Assignments</Button>
               <Button variant="ghost" className="text-[10px] uppercase tracking-widest font-bold text-slate-500 hover:text-white px-4 h-12 rounded-none">Blocked</Button>
            </div>
         </div>
         <div className="flex flex-col">
            {tasks.map((task, i) => (
              <div key={i} className="p-10 border-b border-white/[0.02] flex items-center justify-between hover:bg-white/[0.01] transition-all group">
                 <div className="flex items-center space-x-12">
                    <div className="h-10 w-10 bg-white/5 flex items-center justify-center text-slate-600 group-hover:text-emerald-500 transition-colors">
                       <CheckCircle2 size={16} />
                    </div>
                    <div className="space-y-2">
                       <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{task.id} • {task.dept}</p>
                       <h4 className="text-sm font-bold tracking-tight text-white">{task.title}</h4>
                       <div className="flex items-center space-x-3 text-[9px] font-bold uppercase tracking-widest">
                          <span className="text-slate-500">Assignee:</span>
                          <span className="text-emerald-500">{task.assignee}</span>
                       </div>
                    </div>
                 </div>

                 <div className="flex items-center space-x-12">
                    <div className="text-right space-y-2">
                       <Badge variant="outline" className={cn(
                         "rounded-none border-none text-[8px] font-bold uppercase tracking-widest px-3",
                         task.priority === 'Urgent' ? "bg-red-500 text-white" : "bg-white/10 text-slate-400"
                       )}>{task.priority}</Badge>
                       <p className="text-[9px] text-slate-700 font-bold uppercase tracking-widest">{task.due}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="text-slate-800 hover:text-white">
                       <MoreVertical size={16} />
                    </Button>
                 </div>
              </div>
            ))}
         </div>
      </Card>
    </div>
  );
}

import { cn } from '@/lib/utils';
