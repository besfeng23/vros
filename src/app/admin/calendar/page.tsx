
'use client';

import React from 'react';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Plus, MapPin, Users, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function CalendarPage() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const events = [
    { title: 'Operational Sync: Underground', time: '09:00', type: 'Strategic', div: 'Underground' },
    { title: 'Patty x BGC Talent Review', time: '11:30', type: 'Personnel', div: 'Entertainment' },
    { title: '88 Dept Security Protocol', time: '14:00', type: 'Critical', div: '88 Dept' },
  ];

  return (
    <div className="space-y-12 pb-20 bg-[#050505] min-h-screen -m-6 lg:-m-16 p-6 lg:p-16 text-white">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-5xl font-headline tracking-tighter text-white">Operations Calendar</h1>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.4em]">Temporal Deployment & Sequence Scheduling</p>
        </div>
        <div className="flex space-x-4">
           <Button variant="outline" className="h-14 rounded-none border-white/10 text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] px-8">
              Schedule Feed
           </Button>
           <Button className="h-14 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-[0.3em] px-10 transition-all shadow-xl shadow-emerald-900/20">
              <Plus size={16} className="mr-2" />
              New Sequence
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <Card className="lg:col-span-3 bg-white/[0.01] border-white/5 rounded-none p-10 space-y-10">
            <div className="flex justify-between items-center">
               <h3 className="text-2xl font-headline tracking-tight">April <span className="text-slate-700 italic">2026</span></h3>
               <div className="flex space-x-2">
                  <Button variant="outline" className="h-10 w-10 p-0 rounded-none border-white/10 text-slate-500 hover:text-white"><ChevronLeft size={16} /></Button>
                  <Button variant="outline" className="h-10 w-10 p-0 rounded-none border-white/10 text-slate-500 hover:text-white"><ChevronRight size={16} /></Button>
               </div>
            </div>

            <div className="grid grid-cols-7 gap-2">
               {days.map(d => (
                 <div key={d} className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-700 text-center py-4">{d}</div>
               ))}
               {[...Array(30)].map((_, i) => {
                 const day = i + 1;
                 const hasEvent = day === 24 || day === 25;
                 return (
                   <div key={i} className={cn(
                     "aspect-square border border-white/[0.03] p-4 flex flex-col justify-between hover:bg-white/[0.02] transition-colors group relative cursor-pointer",
                     day === 24 ? "bg-white/[0.05] border-emerald-500/20" : ""
                   )}>
                      <span className={cn("text-[10px] font-bold", day === 24 ? "text-emerald-500" : "text-slate-700")}>{day}</span>
                      {hasEvent && <div className="h-1 w-4 bg-emerald-500" />}
                      {day === 24 && (
                        <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                   </div>
                 );
               })}
            </div>
         </Card>

         <div className="space-y-8">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-emerald-500 ml-2">Today's Timeline</h3>
            <div className="space-y-4">
               {events.map((ev, i) => (
                 <div key={i} className="bg-white/[0.02] border border-white/5 p-8 space-y-6 hover:bg-white/[0.04] transition-all group">
                    <div className="flex justify-between items-start">
                       <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{ev.time}</span>
                       <Badge variant="outline" className="rounded-none border-white/10 text-slate-600 text-[7px] font-bold uppercase tracking-widest">{ev.type}</Badge>
                    </div>
                    <div className="space-y-1">
                       <p className="text-sm font-bold tracking-tight text-white">{ev.title}</p>
                       <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest leading-none">{ev.div}</p>
                    </div>
                    <div className="flex pt-4 border-t border-white/5 space-x-4 opacity-40 group-hover:opacity-100 transition-opacity">
                       <div className="flex items-center text-[8px] font-bold uppercase tracking-widest">
                          <MapPin size={10} className="mr-1" />
                          HQ Node
                       </div>
                       <div className="flex items-center text-[8px] font-bold uppercase tracking-widest">
                          <Users size={10} className="mr-1" />
                          Executive
                       </div>
                    </div>
                 </div>
               ))}
            </div>
            <div className="p-8 bg-emerald-500/5 border border-dashed border-emerald-500/20 text-center space-y-4 group cursor-pointer hover:bg-emerald-500/10 transition-all">
               <Zap size={24} className="mx-auto text-emerald-500/40 group-hover:text-emerald-500 group-hover:scale-110 transition-all" />
               <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-500">Initiate Rapid Sequence</p>
            </div>
         </div>
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';
