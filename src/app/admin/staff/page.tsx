'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { ShieldCheck, UserPlus, MoreVertical, Mail, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { useFirebase } from '@/firebase/provider';
import { LoadingState, EmptyState } from '@/components/ui/status-states';

export default function StaffRolesManager() {
  const { firestore } = useFirebase();
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firestore) return;

    const q = query(collection(firestore, 'staffMembers'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setStaff(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firestore]);

  if (loading) return <LoadingState message="Verifying Internal Credentials..." />;

  return (
    <div className="space-y-10 pb-20">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-4xl font-headline tracking-tight text-slate-900 text-left">Staff & Roles</h1>
          <p className="text-slate-500 text-[10px] tracking-[0.3em] uppercase font-bold text-left">Internal Personnel Directory & Permission Gates</p>
        </div>
        <Button className="h-12 px-8 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest transition-all">
          <UserPlus size={16} className="mr-2" />
          Invite Associate
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Permission Overview */}
        <div className="space-y-8">
           <Card className="border-none shadow-sm rounded-none bg-white p-10 space-y-8">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-900 border-b border-slate-50 pb-4 text-left">Hierarchy Logic</h3>
              <div className="space-y-6">
                 {[
                   { role: 'Super Admin', access: 'Global Root' },
                   { role: 'HQ Ops', access: 'Network Management' },
                   { role: 'Branch Manager', access: 'Asset Sovereignty' },
                   { role: 'Finance', access: 'Ledger Audit' },
                 ].map(r => (
                   <div key={r.role} className="space-y-1">
                      <p className="text-xs font-bold text-slate-900">{r.role}</p>
                      <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-widest leading-none">{r.access}</p>
                   </div>
                 ))}
              </div>
           </Card>

           <div className="p-10 bg-slate-900 text-white space-y-6">
              <ShieldAlert size={24} className="text-emerald-500" />
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-500 text-left">Security Core</p>
              <p className="text-xs leading-relaxed italic opacity-70 text-left font-bold uppercase tracking-widest">
                "Personnel access is restricted via hardware-level identity verification and real-time audit streaming."
              </p>
           </div>
        </div>

        {/* Staff Table */}
        <Card className="lg:col-span-3 border-none shadow-sm rounded-none bg-white overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-900">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 py-6 px-10">Associate ID</TableHead>
                <TableHead className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 py-6">Member Identity</TableHead>
                <TableHead className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 py-6">Operational Rank</TableHead>
                <TableHead className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 py-6">Status</TableHead>
                <TableHead className="text-right pr-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staff.length > 0 ? staff.map((member) => (
                <TableRow key={member.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-bold text-[10px] py-8 px-10 text-slate-200">#{member.id.slice(-6).toUpperCase()}</TableCell>
                  <TableCell className="py-8">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10 border border-slate-100 rounded-none">
                        <AvatarImage src={`https://picsum.photos/seed/${member.id}/100/100`} className="rounded-none object-cover" />
                        <AvatarFallback className="rounded-none bg-slate-900 text-white text-[10px] font-bold">{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-0.5">
                        <p className="text-sm font-headline text-slate-900 leading-none">{member.name}</p>
                        <div className="flex items-center text-[9px] text-slate-400 font-bold uppercase tracking-tight">
                          <Mail size={10} className="mr-2 text-emerald-500" />
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-8">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">{member.role}</p>
                      <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-tighter">{member.branchId || 'Corporate HQ'}</p>
                    </div>
                  </TableCell>
                  <TableCell className="py-8">
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "rounded-none text-[8px] font-bold uppercase tracking-widest border-none px-4 py-1",
                        member.status === 'Active' || !member.status ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"
                      )}
                    >
                      {member.status || 'Active'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-10">
                    <div className="flex items-center justify-end space-x-2">
                       <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-300 hover:text-red-500 transition-colors">
                          <XCircle size={18} />
                       </Button>
                       <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-300 hover:text-emerald-500 transition-colors">
                          <MoreVertical size={18} />
                       </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                   <TableCell colSpan={5}>
                      <EmptyState 
                        title="Database Depleted" 
                        description="No registered associates detected within the Harmony OS directory." 
                      />
                   </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
