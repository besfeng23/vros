'use client';

import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Plus, Clock, MapPin, MoreHorizontal, Calendar as CalendarIcon, LayoutList, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { useFirebase } from '@/firebase/provider';
import { LoadingState } from '@/components/ui/status-states';

export default function AppointmentsManager() {
  const { firestore } = useFirebase();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list');

  useEffect(() => {
    if (!firestore) return;

    const q = query(collection(firestore, 'appointments'), orderBy('appointmentDate', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAppointments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firestore]);

  if (loading) return <LoadingState message="Connecting to Scheduling Satellite..." />;

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-headline tracking-tight text-slate-900">Unified Scheduler</h1>
          <p className="text-slate-500 text-[10px] tracking-[0.3em] uppercase font-bold">Global Operations Timeline & Resource Allocation</p>
        </div>
        <div className="flex items-center space-x-4">
           <Tabs value={view} onValueChange={setView} className="bg-slate-100 p-1 rounded-none">
              <TabsList className="bg-transparent h-10 space-x-1">
                 <TabsTrigger value="list" className="rounded-none data-[state=active]:bg-white data-[state=active]:shadow-sm h-full px-4 text-[9px] font-bold uppercase tracking-widest">
                    <LayoutList size={14} className="mr-2" />
                    List
                 </TabsTrigger>
                 <TabsTrigger value="calendar" className="rounded-none data-[state=active]:bg-white data-[state=active]:shadow-sm h-full px-4 text-[9px] font-bold uppercase tracking-widest">
                    <CalendarIcon size={14} className="mr-2" />
                    Calendar
                 </TabsTrigger>
              </TabsList>
           </Tabs>
           <Button className="h-12 px-8 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-emerald-900/10">
              <Plus size={16} className="mr-2" />
              New Booking
           </Button>
        </div>
      </div>

      {view === 'list' ? (
        <div className="space-y-6">
          <Card className="border-none shadow-sm rounded-none bg-white">
            <CardContent className="p-8">
              <div className="flex flex-wrap gap-6">
                <div className="flex-1 min-w-[300px] relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <Input placeholder="Search global bookings..." className="pl-12 h-14 rounded-none border-slate-100 bg-slate-50/50 text-[10px] font-bold uppercase tracking-widest" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[220px] h-14 rounded-none border-slate-100 font-bold text-[10px] uppercase tracking-widest">
                    <SelectValue placeholder="Branch Asset" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Network Assets</SelectItem>
                    <SelectItem value="makati">Makati HQ</SelectItem>
                    <SelectItem value="bgc">BGC Satellite</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="h-14 rounded-none border-slate-100 px-8 font-bold text-[10px] uppercase tracking-widest text-slate-400">
                  <Filter size={14} className="mr-2" />
                  Segmentation
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-none bg-white overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-900">
                <TableRow className="border-none hover:bg-transparent">
                  <TableHead className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 py-6 px-10">Asset ID</TableHead>
                  <TableHead className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 py-6">Operational Entity</TableHead>
                  <TableHead className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 py-6">Service Protocol</TableHead>
                  <TableHead className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 py-6">Location</TableHead>
                  <TableHead className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 py-6">Timeline</TableHead>
                  <TableHead className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 py-6">Integrity Status</TableHead>
                  <TableHead className="text-right pr-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((apt) => (
                  <TableRow key={apt.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <TableCell className="font-bold text-[10px] py-8 px-10 text-slate-400">{apt.id.slice(-6).toUpperCase()}</TableCell>
                    <TableCell className="py-8">
                       <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 rounded-none bg-slate-900 flex items-center justify-center text-emerald-500 font-bold text-[10px] border border-emerald-500/20">
                             {apt.patientName.split(' ').map((n: string) => n[0]).join('')}
                          </div>
                          <span className="text-sm font-headline text-slate-900 leading-none">{apt.patientName}</span>
                       </div>
                    </TableCell>
                    <TableCell className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{apt.serviceName || 'Standard Service'}</TableCell>
                    <TableCell>
                      <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        <MapPin size={12} className="mr-2 text-emerald-500" />
                        {apt.branchName || 'Asset_HQ'}
                      </div>
                    </TableCell>
                    <TableCell>
                       <div className="space-y-1">
                          <div className="flex items-center text-xs font-bold text-slate-900">
                            <Clock size={12} className="mr-2 text-emerald-500" />
                            {apt.appointmentTime}
                          </div>
                          <p className="text-[9px] text-slate-300 font-bold uppercase tracking-tighter">{apt.appointmentDate}</p>
                       </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "rounded-none text-[8px] font-bold uppercase tracking-widest border-none px-4 py-1",
                          apt.status === 'confirmed' ? "bg-emerald-500 text-white" : 
                          apt.status === 'pending' ? "bg-amber-100 text-amber-700" : 
                          "bg-slate-100 text-slate-400"
                        )}
                      >
                        {apt.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-10">
                      <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-300 hover:text-emerald-500 transition-colors">
                        <MoreHorizontal size={18} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      ) : (
        <div className="space-y-10">
           <div className="flex items-center justify-between border-b border-slate-100 pb-8">
              <div className="flex items-center space-x-8">
                 <h2 className="text-2xl font-headline">October 2026</h2>
                 <div className="flex bg-slate-100 p-1 rounded-none translate-y-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none text-slate-400"><ChevronLeft size={16} /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none text-slate-400"><ChevronRight size={16} /></Button>
                 </div>
              </div>
              <div className="flex items-center space-x-2">
                 <Badge className="bg-emerald-500 rounded-none border-none text-[8px] uppercase tracking-widest font-bold">12 Active Sessions</Badge>
                 <Badge variant="outline" className="rounded-none border-slate-100 text-slate-300 text-[8px] uppercase tracking-widest">3 Constraints</Badge>
              </div>
           </div>

           <div className="grid grid-cols-7 border border-slate-100 bg-white shadow-sm overflow-hidden min-h-[800px]">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="bg-slate-900 border-r border-slate-800 p-6 text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500 text-center">
                  {day}
                </div>
              ))}
              {[...Array(35)].map((_, i) => (
                <div key={i} className="border-r border-b border-slate-50 p-4 min-h-[160px] group hover:bg-slate-50 transition-colors relative overflow-hidden">
                   <span className="text-[10px] font-bold text-slate-200 group-hover:text-emerald-500 transition-colors">{i + 1}</span>
                   {i === 12 && (
                     <div className="mt-4 p-3 bg-emerald-500 text-white text-[8px] font-bold uppercase tracking-widest space-y-1 shadow-lg shadow-emerald-500/20 translate-x-[-4px] w-[calc(100%+8px)]">
                        <div className="flex justify-between">
                           <span>Acme Corp HQ</span>
                           <Clock size={8} />
                        </div>
                        <p className="opacity-60 italic">Operational Sync</p>
                     </div>
                   )}
                   {i === 12 && (
                     <div className="mt-2 p-3 bg-slate-900 text-white text-[8px] font-bold uppercase tracking-widest space-y-1 translate-x-[-4px] w-[calc(100%+8px)]">
                        <span>Lead: Janice D.</span>
                     </div>
                   )}
                </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
}
