'use client';

import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Undo2,
  PackageOpen,
  Sparkles,
  Layers,
  ShieldCheck,
  Zap,
  Activity,
  User,
  ArrowRightLeft,
  Search
} from 'lucide-react';

import { useFirebase } from '@/firebase/provider';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';


const MOCK_PIPELINE_HEALTH = [
  { division: 'Underground', health: 94, status: 'Stable' },
  { division: 'Entertainment', health: 88, status: 'Active' },
  { division: 'Corporate', health: 98, status: 'Optimized' },
  { division: '88 Dept', health: 92, status: 'Confidential' },
];

export default function HarmonyDashboard() {
  const { firestore } = useFirebase();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingState message="Initializing Secure Stream..." />;

  return (
    <div className="space-y-12 pb-20 bg-[#050505] min-h-screen -m-6 lg:-m-16 p-6 lg:p-16">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-5xl font-headline tracking-tighter text-white">Executive Port</h1>
          <div className="flex items-center space-x-4">
             <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-[0.4em]">Live Integrity Level: 99.9%</span>
             </div>
             <span className="h-4 w-[1px] bg-white/10" />
             <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em]">Node: Manila_HQ_S01</span>
          </div>
        </div>
        <div className="flex items-center space-x-3 bg-white/5 p-2 rounded-none border border-white/5">
           <Search size={16} className="text-slate-600 ml-4" />
           <Input placeholder="Search Global Vault..." className="bg-transparent border-none focus-visible:ring-0 text-[10px] font-bold uppercase tracking-widest text-white w-64 placeholder:text-slate-700" />
        </div>
      </div>

      {/* Level 1: Primary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Network Liquidity', value: '₱142.8M', change: '+12.4%', icon: TrendingUp },
          { label: 'Active Initiatives', value: '24', change: '85% Capacity', icon: Layers },
          { label: 'Secure Contacts', value: '1,204', change: '+22 Today', icon: Users },
          { label: 'System Uptime', value: '99.99%', change: 'Nominal', icon: ShieldCheck },
        ].map((stat, i) => (
          <Card key={i} className="bg-white/[0.02] border-white/5 rounded-none p-8 hover:bg-white/[0.04] transition-all group">
            <div className="flex justify-between items-start">
               <div className="space-y-4">
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em]">{stat.label}</p>
                  <h3 className="text-3xl font-headline text-white">{stat.value}</h3>
                  <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">{stat.change}</p>
               </div>
               <stat.icon size={20} className="text-slate-700 group-hover:text-emerald-500 transition-colors" />
            </div>
          </Card>
        ))}
      </div>

      {/* Level 2: Priorities & Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Priorities */}
        <Card className="bg-white/[0.02] border-white/5 rounded-none lg:col-span-2 overflow-hidden">
          <CardHeader className="border-b border-white/5 p-8 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-[10px] uppercase tracking-[0.4em] font-bold text-emerald-500">Global Priorities</CardTitle>
              <CardDescription className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">Immediate Execution Timeline</CardDescription>
            </div>
            <Badge className="bg-red-500/10 text-red-500 rounded-none border border-red-500/20 text-[8px] uppercase tracking-widest px-3">3 Critical</Badge>
          </CardHeader>
          <CardContent className="p-0">
             {[
               { title: 'Operational Sync with Underground Division', time: '09:00', priority: 'P0', dept: 'Underground' },
               { title: 'Talent Review: BGC Entertainment Sector', time: '11:30', priority: 'P1', dept: 'Entertainment' },
               { title: '88 Dept Security Audit Protocol', time: '14:00', priority: 'P0', dept: '88 Dept' },
               { title: 'Corporate Liquidity Reconcilliation', time: '16:45', priority: 'P2', dept: 'Corporate' },
             ].map((item, i) => (
               <div key={i} className="flex items-center justify-between p-8 border-b border-white/[0.03] hover:bg-white/[0.01] transition-colors group">
                  <div className="flex items-center space-x-8">
                     <span className="text-[10px] font-bold text-slate-600 group-hover:text-emerald-500 transition-colors">{item.time}</span>
                     <div className="space-y-1">
                        <p className="text-sm font-bold text-white tracking-tight">{item.title}</p>
                        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{item.dept}</p>
                     </div>
                  </div>
                  <Badge variant="outline" className={cn(
                    "rounded-none border-none text-[8px] font-bold uppercase tracking-widest px-4",
                    item.priority === 'P0' ? "bg-red-500 text-white" : "bg-white/5 text-slate-400"
                  )}>{item.priority}</Badge>
               </div>
             ))}
          </CardContent>
        </Card>

        {/* Executive Approvals Queue */}
        <Card className="bg-white/[0.02] border-white/5 rounded-none flex flex-col">
           <CardHeader className="border-b border-white/5 p-8">
              <CardTitle className="text-[10px] uppercase tracking-[0.4em] font-bold text-amber-500">Awaiting Authorization</CardTitle>
           </CardHeader>
           <CardContent className="p-8 flex-1 space-y-8">
              {[
                { label: 'Budget: Underground Logistics', amount: '₱1.4M', requestor: 'Field Ops' },
                { label: 'Handoff: Case #88214 to Corporate', amount: 'N/A', requestor: 'Patty' },
                { label: 'Contract Approval: BGC Talent', amount: '₱420K', requestor: 'Entertainment' },
              ].map((req, i) => (
                <div key={i} className="space-y-4">
                   <div className="flex justify-between items-start">
                      <div className="space-y-1">
                         <p className="text-[10px] font-bold text-white uppercase tracking-widest">{req.label}</p>
                         <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Requested by {req.requestor}</p>
                      </div>
                      <span className="text-emerald-500 font-headline text-[10px]">{req.amount}</span>
                   </div>
                   <div className="flex space-x-2">
                      <Button className="flex-1 rounded-none bg-emerald-600/10 text-emerald-500 hover:bg-emerald-600 hover:text-white border border-emerald-500/20 h-10 text-[8px] font-bold uppercase tracking-widest transition-all">Authorize</Button>
                      <Button variant="ghost" className="rounded-none text-slate-600 hover:text-red-400 h-10 text-[8px] font-bold uppercase tracking-widest">Defer</Button>
                   </div>
                </div>
              ))}
           </CardContent>
           <div className="p-8 bg-black/40 border-t border-white/5">
              <Button className="w-full h-12 rounded-none bg-white text-black text-[9px] font-bold uppercase tracking-[0.3em] hover:bg-slate-200">View Master Queue</Button>
           </div>
        </Card>
      </div>

      {/* Level 3: Ownership Summaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Joven Summary */}
        <div className="bg-white/[0.01] border border-white/5 p-12 space-y-10 hover:border-emerald-500/20 transition-all group">
           <div className="flex justify-between items-end">
              <div className="space-y-4">
                 <div className="h-1 w-10 bg-emerald-500" />
                 <h2 className="text-4xl font-headline tracking-tighter text-white">Joven</h2>
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em]">Corporate & Financial Oversight</p>
              </div>
              <Activity className="text-slate-800 group-hover:text-emerald-500 transition-colors" size={40} />
           </div>
           <div className="grid grid-cols-2 gap-10">
              <div className="space-y-1">
                 <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Active Deals</p>
                 <p className="text-xl font-headline text-white">12 Strategic</p>
              </div>
              <div className="space-y-1">
                 <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Liquidity Control</p>
                 <p className="text-xl font-headline text-white">Nominal</p>
              </div>
              <div className="space-y-1">
                 <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Pending Syncs</p>
                 <p className="text-xl font-headline text-white">4 Audit Nodes</p>
              </div>
              <div className="space-y-1">
                 <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Blocked Items</p>
                 <p className="text-xl font-headline text-red-500">2 Blockers</p>
              </div>
           </div>
        </div>

        {/* Patty Summary */}
        <div className="bg-white/[0.01] border border-white/5 p-12 space-y-10 hover:border-emerald-500/20 transition-all group">
           <div className="flex justify-between items-end">
              <div className="space-y-4">
                 <div className="h-1 w-10 bg-emerald-500" />
                 <h2 className="text-4xl font-headline tracking-tighter text-white">Patty</h2>
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em]">88 Dept & Entertainment Hub</p>
              </div>
              <Zap className="text-slate-800 group-hover:text-emerald-500 transition-colors" size={40} />
           </div>
           <div className="grid grid-cols-2 gap-10">
              <div className="space-y-1">
                 <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Ongoing Cases</p>
                 <p className="text-xl font-headline text-white">18 Resolved/4 New</p>
              </div>
              <div className="space-y-1">
                 <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Talent Deployment</p>
                 <p className="text-xl font-headline text-white">72 Units Active</p>
              </div>
              <div className="space-y-1">
                 <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Client Requests</p>
                 <p className="text-xl font-headline text-white">12 Queue</p>
              </div>
              <div className="space-y-1">
                 <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Handoff Health</p>
                 <p className="text-xl font-headline text-white">Seamless</p>
              </div>
           </div>
        </div>
      </div>

      {/* Level 4: Pipeline Health & Handoff Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Pipeline Health */}
         <Card className="bg-white/[0.02] border-white/5 rounded-none p-8 space-y-10 lg:col-span-1">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-emerald-500">Pipeline Vitality</h3>
            <div className="space-y-8">
               {MOCK_PIPELINE_HEALTH.map(p => (
                 <div key={p.division} className="space-y-3">
                    <div className="flex justify-between items-end">
                       <p className="text-[10px] font-bold text-white uppercase tracking-widest">{p.division}</p>
                       <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{p.health}%</p>
                    </div>
                    <div className="h-[2px] w-full bg-white/5">
                       <div className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: `${p.health}%` }} />
                    </div>
                 </div>
               ))}
            </div>
         </Card>

         {/* Handoff Queue */}
         <Card className="bg-white/[0.02] border-white/5 rounded-none lg:col-span-2 flex flex-col">
            <CardHeader className="p-8 border-b border-white/5 flex flex-row items-center justify-between">
               <CardTitle className="text-[10px] uppercase tracking-[0.4em] font-bold text-emerald-500">Handoff Sequence</CardTitle>
               <Badge className="bg-emerald-500/10 text-emerald-500 rounded-none border border-emerald-500/20 text-[8px] uppercase tracking-widest">6 Operations Pending</Badge>
            </CardHeader>
            <CardContent className="p-0">
               {[
                 { id: 'HO-221', from: 'Underground', to: '88 Dept', status: 'Verifying', title: 'Asset Logistics: Route Alpha' },
                 { id: 'HO-224', from: 'Entertainment', to: 'Corporate', status: 'Awaiting', title: 'Talent Contract Settlement' },
                 { id: 'HO-227', from: '88 Dept', to: 'Underground', status: 'Secured', title: 'Executive Transport Protocol' },
               ].map((ho, i) => (
                 <div key={i} className="p-8 flex items-center justify-between border-b border-white/[0.02] hover:bg-white/[0.01] transition-all">
                    <div className="flex items-center space-x-10">
                       <div className="p-3 bg-white/5 text-slate-500">
                          <ArrowRightLeft size={16} />
                       </div>
                       <div className="space-y-1">
                          <p className="text-sm font-bold text-white">{ho.title}</p>
                          <div className="flex items-center space-x-3 text-[9px] font-bold uppercase tracking-widest text-slate-600">
                             <span>{ho.from}</span>
                             <span className="text-emerald-500">→</span>
                             <span>{ho.to}</span>
                          </div>
                       </div>
                    </div>
                    <Badge variant="outline" className="rounded-none border-white/10 text-slate-500 text-[8px] font-bold uppercase tracking-widest">#{ho.id}</Badge>
                 </div>
               ))}
            </CardContent>
         </Card>
      </div>

      {/* Level 5: Recent Activity & Global Pulse */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <div className="lg:col-span-3 space-y-6">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-600 ml-4">Global Security Feed</h3>
            <div className="space-y-2">
               {[
                 { user: 'Admin', action: 'Authorized high-scale liquidity transfer to Underground Ops', time: '4m' },
                 { user: 'Patty', action: 'Closed Case #88192 - Client Satisfaction Verified', time: '12m' },
                 { user: 'Joven', action: 'Updated Strategic Pipeline: Entertainment Sector Q4', time: '28m' },
                 { user: 'Field_02', action: 'Initiated Asset Deployment in BGC Sub-Sector', time: '42m' },
               ].map((log, i) => (
                 <div key={i} className="bg-white/[0.02] border border-white/5 p-6 flex items-center justify-between group hover:bg-white/[0.04] transition-all">
                    <div className="flex items-center space-x-6">
                       <div className="h-8 w-8 bg-slate-900 border border-white/10 flex items-center justify-center text-[9px] font-bold text-emerald-500 uppercase">
                          {log.user[0]}
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] text-white font-bold uppercase tracking-widest">{log.user}</p>
                          <p className="text-[11px] text-slate-400 font-medium">{log.action}</p>
                       </div>
                    </div>
                    <span className="text-[9px] font-bold text-slate-700 uppercase tracking-widest">{log.time} ago</span>
                 </div>
               ))}
            </div>
         </div>
         <div className="bg-emerald-500 p-12 flex flex-col justify-between rounded-none overflow-hidden relative group">
            <Sparkles className="absolute -top-10 -right-10 text-white/10 h-64 w-64 group-hover:scale-110 transition-transform duration-1000" />
            <div className="space-y-2 relative z-10">
               <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/40">Network Status</h3>
               <p className="text-4xl font-headline tracking-tighter text-black leading-tight">All Divisions Nominal.</p>
            </div>
            <div className="relative z-10 pt-10 border-t border-black/10">
               <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-black/60">Last Global Sync</p>
               <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">Today, 10:41:35Z</p>
            </div>
         </div>
      </div>
    </div>
  );
}

// Sub-components to ensure clean render
function LoadingState({ message }: { message: string }) {
  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center space-y-8">
       <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-emerald-500 animate-loading-bar" />
       </div>
       <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-[0.8em] animate-pulse">{message}</p>
    </div>
  );
}


