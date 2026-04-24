'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Calendar, 
  Sparkles, 
  Clock, 
  MapPin, 
  TrendingUp,
  PackageOpen,
  AlertCircle,
  Building2,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { cn } from '@/lib/utils';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { useFirebase } from '@/firebase/provider';
import { LoadingState, EmptyState } from '@/components/ui/status-states';
import { Button } from '@/components/ui/button';

const MOCK_TRAFFIC_DATA = [
  { name: '09:00', visits: 4 },
  { name: '11:00', visits: 7 },
  { name: '13:00', visits: 5 },
  { name: '15:00', visits: 9 },
  { name: '17:00', visits: 12 },
  { name: '19:00', visits: 6 },
];

export default function BranchNetworkPage() {
  const { firestore } = useFirebase();
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firestore) return;

    const q = query(collection(firestore, 'branches'), orderBy('name', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBranches(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firestore]);

  if (loading) return <LoadingState message="Connecting to Network Asset Hub..." />;

  return (
    <div className="space-y-10 pb-20">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-4xl font-headline tracking-tight text-slate-900">Branch Network</h1>
          <p className="text-slate-500 text-[10px] tracking-[0.3em] uppercase font-bold">Global Asset Portfolio & Ground Integrity Control</p>
        </div>
        <div className="flex items-center space-x-4">
           <Badge variant="outline" className="rounded-none px-6 py-2 border-slate-100 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
             {branches.length} Active Branches
           </Badge>
           <Button className="h-12 px-8 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-emerald-900/10">
              Initialize New Asset
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
         {branches.length > 0 ? branches.map(branch => (
           <Card key={branch.id} className="border-none shadow-sm rounded-none bg-white p-0 overflow-hidden group hover:shadow-xl transition-all">
              <div className="h-2 bg-emerald-500 w-full" />
              <CardContent className="p-10 space-y-8">
                 <div className="flex justify-between items-start">
                    <div className="space-y-2">
                       <h3 className="text-2xl font-headline text-slate-900 group-hover:text-emerald-500 transition-colors">{branch.name}</h3>
                       <div className="flex items-center text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">
                          <MapPin size={10} className="mr-2 text-emerald-500" />
                          {branch.address}
                       </div>
                    </div>
                    <div className="p-3 bg-slate-50 text-slate-300">
                       <Building2 size={20} />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-6 pt-4">
                    <div className="space-y-1">
                       <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">Active Staff</p>
                       <p className="text-xl font-headline text-slate-900">12</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">MTD Yield</p>
                       <p className="text-xl font-headline text-emerald-600">₱450k</p>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <div className="flex justify-between items-center text-[8px] font-bold uppercase tracking-widest">
                       <span className="text-slate-400">Resource Utilization</span>
                       <span className="text-slate-900">82%</span>
                    </div>
                    <div className="h-1 w-full bg-slate-50 rounded-none overflow-hidden">
                       <div className="h-full bg-emerald-500 w-[82%]" />
                    </div>
                 </div>

                 <Button variant="outline" className="w-full h-12 rounded-none border-slate-100 text-[9px] font-bold uppercase tracking-[0.2em] group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all">
                    Access Asset Interface
                    <ArrowRight size={14} className="ml-3 group-hover:translate-x-1 transition-transform" />
                 </Button>
              </CardContent>
           </Card>
         )) : (
           <div className="col-span-full">
             <EmptyState 
               title="No Branches Configured" 
               description="The global network is currently offline. Initialize your first asset to commence operations." 
               icon={Building2}
             />
           </div>
         )}
      </div>

      <Card className="border-none shadow-sm rounded-none bg-white p-10">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2 space-y-6">
               <div className="space-y-1">
                  <h3 className="text-xl font-headline">Network Traffic Density</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Real-time aggregated occupancy across all clinical assets</p>
               </div>
               <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={MOCK_TRAFFIC_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 'bold', fill: '#94a3b8', letterSpacing: '0.1em' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 'bold', fill: '#94a3b8' }} />
                      <Tooltip />
                      <Bar dataKey="visits" fill="#10b981" radius={[0, 0, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>
            <div className="p-10 bg-slate-900 text-white space-y-8">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-500">Asset Alerts</h4>
               <div className="space-y-6">
                  {[
                    { t: 'Low Inventory', d: 'Makati HQ - Serum X', c: 'text-amber-500' },
                    { t: 'VIP Arrival', d: 'BGC - Global Client', c: 'text-emerald-500' },
                    { t: 'System Patch', d: 'Global Network - V2.4', c: 'text-slate-500' },
                  ].map(a => (
                    <div key={a.t} className="flex items-start space-x-4">
                       <div className={cn("p-2 bg-white/5", a.c)}>
                          <AlertCircle size={14} />
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold uppercase tracking-widest">{a.t}</p>
                          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{a.d}</p>
                       </div>
                    </div>
                  ))}
               </div>
               <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-none h-12 text-[9px] font-bold uppercase tracking-widest">Recalibrate Network</Button>
            </div>
         </div>
      </Card>
    </div>
  );
}
