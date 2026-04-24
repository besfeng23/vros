
'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, User, Building2, Mail, Phone, MessageSquare, History, Shield, MoreHorizontal, Plus, Briefcase, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ContactDetailPage() {
  const params = useParams();
  const router = useRouter();

  return (
    <div className="space-y-12 pb-20 bg-[#050505] min-h-screen -m-6 lg:-m-16 p-6 lg:p-16 text-white font-body">
      <div className="flex justify-between items-end border-b border-white/5 pb-10">
        <div className="flex items-center space-x-8">
           <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-14 w-14 rounded-none border border-white/5 text-slate-500 hover:text-white hover:bg-white/5">
              <ArrowLeft size={18} />
           </Button>
           <div className="space-y-1">
              <div className="flex items-center space-x-4">
                 <h1 className="text-4xl font-headline tracking-tighter">Alexander Wright</h1>
                 <Badge className="bg-emerald-500 text-black text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-none">Active Partner</Badge>
              </div>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.4em]">Stakeholder Entity ID: {params.id || 'C-001'}</p>
           </div>
        </div>
        <div className="flex space-x-3">
           <Button variant="outline" className="h-14 rounded-none border-white/10 text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] px-8">
              Update Profile
           </Button>
           <Button className="h-14 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-[0.3em] px-10">
              Message Entity
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-1 space-y-8">
            <Card className="bg-white/[0.02] border-white/5 rounded-none p-10 space-y-10">
               <div className="flex justify-center pt-4">
                  <div className="h-40 w-40 bg-white/5 border border-white/5 flex items-center justify-center text-5xl font-headline text-emerald-500">
                     AW
                  </div>
               </div>
               <div className="space-y-6 pt-10 border-t border-white/5">
                  {[
                    { label: 'Role', val: 'Strategic Partner', icon: User },
                    { label: 'Organization', val: 'Alpha Group', icon: Building2 },
                    { label: 'Email', val: 'a.wright@alpha.com', icon: Mail },
                    { label: 'Network Reach', val: 'Global Elite', icon: TrendingUp },
                  ].map((info, i) => (
                    <div key={i} className="flex items-center justify-between group">
                       <div className="flex items-center space-x-4">
                          <info.icon size={14} className="text-slate-700 group-hover:text-emerald-500 transition-colors" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{info.label}</span>
                       </div>
                       <span className="text-xs font-bold text-white tracking-tight">{info.val}</span>
                    </div>
                  ))}
               </div>
            </Card>

            <Card className="bg-white/[0.01] border-white/5 rounded-none p-10 space-y-6">
               <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-500">Security Note</h3>
               <p className="text-sm text-slate-400 font-light leading-relaxed italic">
                  "Alexander maintains primary oversight of Alpha Group's liquidity pools in the BGC sector. Access to this entity's audit trail is restricted to level-4 nodes only."
               </p>
            </Card>
         </div>

         <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <Card className="bg-white/[0.02] border-white/5 rounded-none p-10 space-y-6 flex flex-col justify-between group hover:bg-white/[0.04] transition-all">
                  <div>
                     <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">Ongoing Deals</p>
                     <p className="text-3xl font-headline">4 Active</p>
                  </div>
                  <Button variant="ghost" className="p-0 text-[10px] font-bold uppercase tracking-widest text-emerald-500 hover:text-emerald-400 justify-start h-auto w-auto">Manage Involvements <ArrowLeft className="rotate-180 ml-2 h-3 w-3" /></Button>
               </Card>
               <Card className="bg-white/[0.02] border-white/5 rounded-none p-10 space-y-6 flex flex-col justify-between group hover:bg-white/[0.04] transition-all">
                  <div>
                     <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">Integrity Score</p>
                     <p className="text-3xl font-headline text-emerald-500">98.4</p>
                  </div>
                  <Button variant="ghost" className="p-0 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white justify-start h-auto w-auto">View Identity Logs <ArrowLeft className="rotate-180 ml-2 h-3 w-3" /></Button>
               </Card>
            </div>

            <Card className="bg-white/[0.01] border-white/5 rounded-none flex flex-col h-[500px]">
               <CardHeader className="p-10 border-b border-white/5 overflow-hidden flex flex-row justify-between items-center bg-white/[0.01]">
                  <CardTitle className="text-[10px] uppercase tracking-[0.4em] font-bold text-emerald-500">Stakeholder Activity Trail</CardTitle>
                  <Button variant="ghost" size="icon" className="text-slate-600"><MoreHorizontal size={14} /></Button>
               </CardHeader>
               <div className="p-0 divide-y divide-white/[0.02] overflow-y-auto custom-scrollbar">
                  {[
                    { action: 'Engagement Call: Strategic Sync', date: 'Yesterday', time: '14:20', type: 'Dial' },
                    { action: 'Contract Updated: BGC Node S1', date: 'Apr 20', time: '10:05', type: 'Doc' },
                    { action: 'Identity Verification Signal', date: 'Apr 18', time: '09:00', type: 'Secure' },
                    { action: 'Stakeholder Onboarding Initiated', date: 'Apr 15', time: '16:45', type: 'Admin' },
                  ].map((act, i) => (
                    <div key={i} className="p-10 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
                       <div className="flex items-center space-x-8">
                          <div className="h-10 w-10 border border-white/10 bg-white/5 flex items-center justify-center text-slate-600 group-hover:text-emerald-500 transition-colors">
                             <History size={16} />
                          </div>
                          <div className="space-y-1">
                             <p className="text-sm font-bold tracking-tight">{act.action}</p>
                             <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">{act.type} Event</p>
                          </div>
                       </div>
                       <div className="text-right space-y-1">
                          <p className="text-xs font-bold text-white tracking-tight">{act.date}</p>
                          <p className="text-[9px] text-slate-700 font-bold uppercase tracking-widest">{act.time}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
