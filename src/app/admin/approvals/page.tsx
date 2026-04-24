'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Undo2, 
  AlertCircle, 
  CheckCircle2, 
  MoreHorizontal, 
  ShieldAlert, 
  HandMetal,
  XCircle,
  Clock,
  Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { collection, query, onSnapshot, where, orderBy } from 'firebase/firestore';
import { useFirebase } from '@/firebase/provider';
import { LoadingState, EmptyState } from '@/components/ui/status-states';

export default function ApprovalsPage() {
  const { firestore } = useFirebase();
  const [approvals, setApprovals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firestore) return;

    // Fetch pending refunds + other high-stakes actions
    const q = query(
      collection(firestore, 'payments'), 
      where('status', '==', 'pending'),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setApprovals(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), type: 'Refund' })));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firestore]);

  if (loading) return <LoadingState message="Bypassing Security Gateways..." />;

  return (
    <div className="space-y-10 pb-20">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-4xl font-headline tracking-tight text-slate-900">Executive Approvals</h1>
          <p className="text-slate-500 text-[10px] tracking-[0.3em] uppercase font-bold">High-Stakes Transaction Authorization & Risk Mitigation</p>
        </div>
        <div className="flex items-center space-x-2">
           <Badge variant="outline" className="rounded-none px-4 py-2 border-slate-100 text-[9px] font-bold uppercase tracking-widest text-slate-400">
             {approvals.length} Requests Pending
           </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
         <div className="space-y-8">
            <Card className="border-none shadow-sm rounded-none bg-white p-10 space-y-8">
               <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 text-left">Queue Integrity</p>
                  <div className="flex items-center space-x-3 text-emerald-500">
                     <ShieldAlert size={20} />
                     <span className="text-2xl font-headline">Secure</span>
                  </div>
               </div>

               <div className="space-y-6 pt-4 border-t border-slate-50">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 text-left">Compliance Check</h4>
                  <ul className="space-y-4">
                     {[
                       'Threshold Verification (>₱10k)',
                       'Origin Branch Validation',
                       'KYC/Patient Matching',
                       'Audit Trail Continuity'
                     ].map(check => (
                       <li key={check} className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          <CheckCircle2 size={12} className="text-emerald-500" />
                          <span>{check}</span>
                       </li>
                     ))}
                  </ul>
               </div>
            </Card>

            <div className="p-10 bg-slate-900 text-white space-y-6">
               <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-emerald-500 text-left">Internal Policy</h3>
               <p className="text-[10px] leading-relaxed italic opacity-70 text-left font-bold uppercase tracking-widest">
                 "All reversals involving third-party gateways (GCash/PayMaya) require documented proof of failure before authorization."
               </p>
            </div>
         </div>

         <div className="lg:col-span-3 space-y-8">
            <Tabs defaultValue="pending" className="w-full space-y-8">
               <TabsList className="bg-transparent border-b border-slate-100 w-full justify-start h-auto p-0 rounded-none space-x-12">
                  <TabsTrigger value="pending" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent text-[10px] uppercase font-bold tracking-[0.2em] py-4 px-0 transition-all text-slate-400 data-[state=active]:text-slate-900">
                     Pending Review
                  </TabsTrigger>
                  <TabsTrigger value="history" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent text-[10px] uppercase font-bold tracking-[0.2em] py-4 px-0 transition-all text-slate-400 data-[state=active]:text-slate-900">
                     Historical Decisions
                  </TabsTrigger>
               </TabsList>

               <TabsContent value="pending" className="space-y-6">
                  {approvals.length > 0 ? (
                    <Card className="border-none shadow-sm rounded-none bg-white overflow-hidden">
                       <Table>
                          <TableHeader className="bg-slate-50">
                             <TableRow className="border-none hover:bg-transparent">
                                <TableHead className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 py-6 px-10">Request ID</TableHead>
                                <TableHead className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 py-6">Operational Context</TableHead>
                                <TableHead className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 py-6">Asset Value</TableHead>
                                <TableHead className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 py-6">Timeline</TableHead>
                                <TableHead className="text-right pr-10">Strategic Action</TableHead>
                             </TableRow>
                          </TableHeader>
                          <TableBody>
                             {approvals.map((req) => (
                               <TableRow key={req.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
                                  <TableCell className="font-bold text-[10px] py-8 px-10 text-slate-300">#{req.id.slice(-6).toUpperCase()}</TableCell>
                                  <TableCell className="py-8">
                                     <div className="space-y-1">
                                        <p className="text-sm font-headline text-slate-900">{req.clientName || 'General Settlement'}</p>
                                        <Badge variant="outline" className="text-[7px] uppercase font-bold tracking-[0.2em] rounded-none border-emerald-100 text-emerald-600">{req.type}</Badge>
                                     </div>
                                  </TableCell>
                                  <TableCell className="py-8">
                                     <div className="space-y-1 text-left">
                                        <p className="text-[10px] font-bold text-slate-900">₱{req.amount}</p>
                                        <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{req.method || 'Standard'}</p>
                                     </div>
                                  </TableCell>
                                  <TableCell className="py-8">
                                     <div className="flex items-center text-[9px] font-bold uppercase tracking-widest text-slate-400">
                                        <Clock size={12} className="mr-2 text-amber-500 animate-pulse" />
                                        Awaiting HQ
                                     </div>
                                  </TableCell>
                                  <TableCell className="text-right pr-10">
                                     <div className="flex items-center justify-end space-x-2">
                                        <Button variant="outline" size="sm" className="rounded-none h-10 px-4 text-[8px] uppercase font-bold tracking-[0.2em] border-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all">
                                           <XCircle size={14} className="mr-2" />
                                           Reject
                                        </Button>
                                        <Button size="sm" className="rounded-none h-10 px-6 text-[8px] uppercase font-bold tracking-[0.2em] bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg shadow-emerald-500/10">
                                           <CheckCircle2 size={14} className="mr-2" />
                                           Authorize
                                        </Button>
                                     </div>
                                  </TableCell>
                               </TableRow>
                             ))}
                          </TableBody>
                       </Table>
                    </Card>
                  ) : (
                    <EmptyState 
                      title="Clear Operations" 
                      description="There are no high-stakes actions awaiting executive approval at this altitude." 
                      icon={HandMetal}
                    />
                  )}
               </TabsContent>

               <TabsContent value="history">
                  <EmptyState 
                    title="Audit Vault Empty" 
                    description="Decision history and compliance archives will be indexed and searchable here." 
                    icon={Briefcase}
                  />
               </TabsContent>
            </Tabs>
         </div>
      </div>
    </div>
  );
}
