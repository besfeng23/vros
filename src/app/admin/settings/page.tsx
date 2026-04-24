
'use client';

import React from 'react';
import { Settings, Shield, Bell, Lock, Globe, Database, Cpu, Terminal, Key } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function SettingsPage() {
  const sections = [
    { title: 'Global Protocol', desc: 'Core platform deployment and branding identity.', icon: Globe },
    { title: 'Security Sovereignty', desc: 'Multi-factor encryption and access keys.', icon: Shield },
    { title: 'Divisional Sync', desc: 'Inter-departmental handoff and data flowing.', icon: Database },
    { title: 'Network Pulse', desc: 'Real-time performance and node stability.', icon: Cpu },
  ];

  return (
    <div className="space-y-12 pb-20 bg-[#050505] min-h-screen -m-6 lg:-m-16 p-6 lg:p-16 text-white font-body">
      <div className="flex justify-between items-end border-b border-white/5 pb-12">
        <div className="space-y-2">
          <h1 className="text-5xl font-headline tracking-tighter">System Settings</h1>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.4em]">Core Platform Configuration & Encryption Keys</p>
        </div>
        <div className="flex space-x-4">
           <Button className="h-14 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-[0.3em] px-10 transition-all">
              Commit Changes
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         <div className="space-y-4">
            {sections.map((s, i) => (
              <div key={i} className={cn(
                "p-8 border border-white/5 bg-white/[0.01] flex items-center space-x-6 cursor-pointer hover:bg-white/[0.03] transition-all",
                i === 1 ? "bg-white/[0.04] border-emerald-500/20" : ""
              )}>
                 <s.icon size={18} className={cn(i === 1 ? "text-emerald-500" : "text-slate-600")} />
                 <div className="space-y-1">
                    <p className={cn("text-[10px] font-bold uppercase tracking-widest", i === 1 ? "text-white" : "text-slate-500")}>{s.title}</p>
                 </div>
              </div>
            ))}
         </div>

         <div className="md:col-span-3 space-y-8">
            <Card className="bg-white/[0.02] border-white/5 rounded-none p-12 space-y-12">
               <div className="space-y-4">
                  <h3 className="text-2xl font-headline tracking-tight text-white">Security & Encryption</h3>
                  <p className="text-sm text-slate-500 font-light max-w-2xl leading-relaxed italic">
                     These protocols govern the absolute sovereignty of data across the Harmony OS ecosystem. 
                     Unauthorized manipulation of these keys will trigger a global lockout sequence.
                  </p>
               </div>

               <div className="space-y-10">
                  {[
                    { label: 'Platform Visibility', val: 'Private / Restricted', hint: 'Governs public access to manifest pages.' },
                    { label: 'Encryption Protocol', val: 'AES-256-GCM', hint: 'Absolute standard for vault assets.' },
                    { label: 'Audit Trail Retention', val: '7 Years / Immutable', hint: 'Timeline storage for all system events.' },
                    { label: 'Multi-Factor Auth', val: 'Biometric / Hardware', hint: 'Required for all executive nodes.' },
                  ].map((setting, i) => (
                    <div key={i} className="flex justify-between items-center group">
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold text-white uppercase tracking-widest">{setting.label}</p>
                          <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest leading-none">{setting.hint}</p>
                       </div>
                       <div className="flex items-center space-x-6">
                          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{setting.val}</span>
                          <Button variant="ghost" className="text-[8px] font-bold uppercase tracking-widest text-slate-700 hover:text-white border border-white/10 h-8 rounded-none px-4">Modify</Button>
                       </div>
                    </div>
                  ))}
               </div>

               <div className="pt-12 border-t border-white/5 flex justify-between items-center bg-black/20 -m-12 mt-0 p-12">
                  <div className="flex items-center space-x-6">
                     <Terminal size={24} className="text-red-500/40" />
                     <div className="space-y-1">
                        <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest text-red-400">Emergency Extraction Node</p>
                        <p className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">Wipe all local node data across the network</p>
                     </div>
                  </div>
                  <Button className="rounded-none bg-red-500/10 text-red-500 border border-red-500/20 text-[9px] font-bold uppercase tracking-[0.2em] px-8 py-3 hover:bg-red-500 hover:text-white transition-all">TERMINATE ALL</Button>
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';
