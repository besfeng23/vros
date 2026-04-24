'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle, 
  Plus, 
  Filter, 
  ArrowRightLeft,
  User,
  Layout
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MOCK_TASKS = [
  { id: 't1', title: 'Onboard New Branch Manager', dept: 'HR', status: 'In Progress', priority: 'High', assignee: 'Patty' },
  { id: 't2', title: 'Update Service Pricing Matrix', dept: 'Marketing', status: 'To-Do', priority: 'Medium', assignee: 'Joven' },
  { id: 't3', title: 'Sync Branch Inventories', dept: 'Operations', status: 'Completed', priority: 'Low', assignee: 'Admin' },
  { id: 't4', title: 'Review Refund Queue', dept: 'Finance', status: 'To-Do', priority: 'High', assignee: 'Joven' },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(MOCK_TASKS);

  return (
    <div className="space-y-10 pb-20">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-4xl font-headline tracking-tight text-slate-900">Tasks & Handoffs</h1>
          <p className="text-slate-500 text-[10px] tracking-[0.3em] uppercase font-bold">Inter-departmental Execution & Handoff Control</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="h-10 px-6 rounded-none border-slate-100 text-[10px] uppercase font-bold tracking-widest text-slate-400">
            <Filter size={14} className="mr-2" />
            Active Sprints
          </Button>
          <Button className="h-10 px-8 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-emerald-900/10">
            <Plus size={14} className="mr-2" />
            Create Task
          </Button>
        </div>
      </div>

      <Tabs defaultValue="my-tasks" className="w-full space-y-10">
        <TabsList className="bg-transparent border-b border-slate-100 w-full justify-start h-auto p-0 rounded-none space-x-12">
          <TabsTrigger value="my-tasks" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent text-[10px] uppercase font-bold tracking-[0.2em] py-4 px-0 transition-all text-slate-400 data-[state=active]:text-slate-900">
            Assigned To Me
          </TabsTrigger>
          <TabsTrigger value="handoffs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent text-[10px] uppercase font-bold tracking-[0.2em] py-4 px-0 transition-all text-slate-400 data-[state=active]:text-slate-900">
            Department Handoffs
          </TabsTrigger>
          <TabsTrigger value="board" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent text-[10px] uppercase font-bold tracking-[0.2em] py-4 px-0 transition-all text-slate-400 data-[state=active]:text-slate-900">
             Task Board
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-tasks" className="space-y-4">
          <div className="grid grid-cols-1 gap-1">
             {tasks.map(task => (
               <Card key={task.id} className="border-none shadow-sm rounded-none bg-white p-6 group hover:translate-x-1 transition-all border-l-2 border-transparent hover:border-emerald-500">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center space-x-6">
                        <button className="text-slate-200 hover:text-emerald-500 transition-colors">
                           {task.status === 'Completed' ? <CheckCircle2 className="text-emerald-500" size={20} /> : <Circle size={20} />}
                        </button>
                        <div className="space-y-1">
                           <h4 className={cn(
                             "text-sm font-bold text-slate-900 transition-all",
                             task.status === 'Completed' && "line-through text-slate-300"
                           )}>{task.title}</h4>
                           <div className="flex items-center space-x-4 text-[9px] font-bold uppercase tracking-widest">
                              <span className="text-slate-400">#{task.id.toUpperCase()}</span>
                              <span className="h-1 w-1 rounded-full bg-slate-100" />
                              <Badge variant="outline" className="border-slate-100 text-slate-400 text-[7px] p-0 px-2 rounded-none">{task.dept}</Badge>
                              <span className={cn(
                                "flex items-center space-x-1",
                                task.priority === 'High' ? "text-red-400" : "text-slate-300"
                              )}>
                                 <AlertCircle size={10} />
                                 <span>{task.priority} Priority</span>
                              </span>
                           </div>
                        </div>
                     </div>

                     <div className="flex items-center space-x-12">
                        <div className="flex items-center space-x-2 text-slate-400">
                           <User size={12} />
                           <span className="text-[10px] font-bold uppercase tracking-widest">{task.assignee}</span>
                        </div>
                        <Badge className={cn(
                          "rounded-none text-[8px] uppercase tracking-widest border-none px-4 py-1",
                          task.status === 'Completed' ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-600"
                        )}>
                          {task.status}
                        </Badge>
                     </div>
                  </div>
               </Card>
             ))}
          </div>
        </TabsContent>

        <TabsContent value="handoffs">
           <div className="p-20 border border-dashed border-slate-100 flex flex-col items-center justify-center text-center space-y-6">
              <div className="p-6 bg-slate-50 text-slate-200 rounded-full">
                 <ArrowRightLeft size={48} />
              </div>
              <div className="space-y-2">
                 <h3 className="text-xl font-headline">Handoff Intelligence</h3>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest max-w-[300px] leading-relaxed">
                   Seamlessly transfer complex operations between departments with automated logging.
                 </p>
                 <Button className="mt-8 rounded-none bg-slate-900 h-12 px-10 text-[10px] font-bold uppercase tracking-widest">Commence Handoff</Button>
              </div>
           </div>
        </TabsContent>

        <TabsContent value="board">
           <div className="flex flex-col items-center justify-center py-20 bg-slate-50 border border-slate-100 space-y-4">
              <Layout size={40} className="text-slate-200" />
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Visual Kanban Integration Incoming</p>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
