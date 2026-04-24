'use client';

import React, { useEffect, useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { History, ShieldAlert, User, Database, Globe, Search, Filter, Clock } from 'lucide-react';
import { collection, query, onSnapshot, orderBy, limit, Timestamp } from 'firebase/firestore';
import { useFirebase } from '@/firebase/provider';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoadingState, EmptyState } from '@/components/ui/status-states';
import { cn } from '@/lib/utils';

export default function AuditLogs() {
  const { firestore } = useFirebase();
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firestore) return;

    const q = query(collection(firestore, 'activityLogs'), orderBy('createdAt', 'desc'), limit(100));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firestore]);

  const getTypeIcon = (action: string) => {
    const a = action.toLowerCase();
    if (a.includes('delete') || a.includes('security') || a.includes('login')) return <ShieldAlert size={12} className="text-red-500" />;
    if (a.includes('payment') || a.includes('refund') || a.includes('price')) return <Database size={12} className="text-emerald-500" />;
    if (a.includes('system') || a.includes('config')) return <Globe size={12} className="text-slate-400" />;
    return <History size={12} className="text-slate-400" />;
  };

  if (loading) return <LoadingState message="Indexing System Sovereignty..." />;

  return (
    <div className="space-y-10 pb-20">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-4xl font-headline tracking-tight text-slate-900">System Audit Logs</h1>
          <p className="text-slate-500 text-[10px] tracking-[0.3em] uppercase font-bold">Unalterable Chronological Record of OS Interactions</p>
        </div>
        <div className="flex items-center space-x-2">
           <Badge variant="outline" className="rounded-none px-4 py-2 border-slate-100 text-[9px] font-bold uppercase tracking-widest text-slate-400">
             Compliance Sync: Real-Time
           </Badge>
        </div>
      </div>

      <Card className="border-none shadow-sm rounded-none bg-white p-6">
         <div className="flex items-center space-x-6">
            <div className="relative flex-1">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
               <input 
                 placeholder="Search Audit Trail..." 
                 className="w-full pl-12 h-12 bg-white border border-slate-50 text-[10px] font-bold uppercase tracking-widest focus:ring-emerald-500 focus:outline-none"
               />
            </div>
            <Button variant="outline" className="h-12 px-6 rounded-none border-slate-100 text-slate-300 font-bold text-[10px] uppercase tracking-widest">
               <Filter size={14} className="mr-2" />
               Filter Actor
            </Button>
         </div>
      </Card>

      <Card className="border-none shadow-sm rounded-none bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-900">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 py-6 px-10">Event ID</TableHead>
              <TableHead className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 py-6">Actor (Credentials)</TableHead>
              <TableHead className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 py-6">Interaction Type</TableHead>
              <TableHead className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 py-6">Target Entity</TableHead>
              <TableHead className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 py-6 text-right pr-10">Timestamp (UTC)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.length > 0 ? logs.map((log) => (
              <TableRow key={log.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-bold text-[10px] py-8 px-10 text-slate-200">#{log.id.slice(-6).toUpperCase()}</TableCell>
                <TableCell className="py-8">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-none bg-slate-50 flex items-center justify-center text-slate-300 border border-slate-100">
                      <User size={14} />
                    </div>
                    <div className="space-y-0.5">
                       <p className="text-sm font-bold text-slate-900">{log.userName}</p>
                       <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{log.userRole}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-8">
                   <div className="flex items-center space-x-3">
                      <div className="p-2 bg-slate-50/50">
                         {getTypeIcon(log.action)}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700">{log.action}</span>
                   </div>
                </TableCell>
                <TableCell className="py-8">
                   <div className="space-y-1">
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">{log.details}</p>
                      <p className="text-[8px] text-slate-300 font-bold uppercase tracking-tighter">{log.collection || 'General'}</p>
                   </div>
                </TableCell>
                <TableCell className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right py-8 pr-10 italic">
                  <div className="flex items-center justify-end space-x-2">
                     <Clock size={10} />
                     <span>
                        {log.createdAt instanceof Timestamp ? log.createdAt.toDate().toLocaleString() : 'Recent'}
                     </span>
                  </div>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                 <TableCell colSpan={5}>
                    <EmptyState 
                      title="No Events Indexed" 
                      description="The system audit trail is currently void of activity records." 
                      icon={History}
                    />
                 </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
