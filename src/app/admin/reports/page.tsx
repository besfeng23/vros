
'use client';

import React from 'react';
import { BarChart3, TrendingUp, PieChart, Download, FileText, Calendar, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ReportsPage() {
  const reports = [
    { title: 'Global Liquidity Q1 Analysis', type: 'Financial', date: '2026-04-20', status: 'Ready' },
    { title: 'Divisional Efficiency Index', type: 'Operational', date: '2026-04-18', status: 'Generated' },
    { title: 'Stakeholder Engagement Trail', type: 'CRM', date: '2026-04-15', status: 'Ready' },
    { title: '88 Dept Compliance Audit v2', type: 'Audit', date: '2026-04-10', status: 'Archived' },
  ];

  return (
    <div className="space-y-12 pb-20 bg-[#050505] min-h-screen -m-6 lg:-m-16 p-6 lg:p-16 text-white font-body">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-5xl font-headline tracking-tighter">Intelligence Reports</h1>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.4em]">Advanced Data Aggregation & Network Synthesis</p>
        </div>
        <div className="flex space-x-4">
           <Button variant="outline" className="h-14 rounded-none border-white/10 text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] px-8">
              Schedule Automated
           </Button>
           <Button className="h-14 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-[0.3em] px-10 transition-all shadow-xl shadow-emerald-900/20">
              <BarChart3 size={16} className="mr-2" />
              Generate Synthesis
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="bg-white/[0.02] border-white/5 rounded-none p-10 space-y-4 hover:bg-white/[0.04] transition-all group">
            <TrendingUp size={32} className="text-emerald-500 mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Network Growth Index</p>
            <p className="text-3xl font-headline">+14.2%</p>
         </Card>
         <Card className="bg-white/[0.02] border-white/5 rounded-none p-10 space-y-4 hover:bg-white/[0.04] transition-all group">
            <PieChart size={32} className="text-emerald-500 mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Asset Distribution</p>
            <p className="text-3xl font-headline">Optimized</p>
         </Card>
         <Card className="bg-white/[0.02] border-white/5 rounded-none p-10 space-y-4 hover:bg-white/[0.04] transition-all group">
            <Activity size={32} className="text-emerald-500 mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Global Flow Velocity</p>
            <p className="text-3xl font-headline">Stable</p>
         </Card>
      </div>

      <Card className="bg-white/[0.01] border-white/5 rounded-none p-12 space-y-12">
         <div className="flex justify-between items-center border-b border-white/5 pb-10">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-emerald-500">Recent Synthesis Exports</h3>
            <div className="flex space-x-2">
               <Badge className="bg-emerald-500/10 text-emerald-500 rounded-none border border-emerald-500/20 text-[8px] font-bold uppercase tracking-widest px-4 py-2">All Intelligence</Badge>
            </div>
         </div>

         <div className="space-y-4">
            {reports.map((report, i) => (
              <div key={i} className="p-8 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all flex items-center justify-between group">
                 <div className="flex items-center space-x-10">
                    <div className="p-4 bg-white/5 text-slate-600 group-hover:text-emerald-500 transition-colors">
                       <FileText size={22} />
                    </div>
                    <div className="space-y-1">
                       <h4 className="text-lg font-headline tracking-tight">{report.title}</h4>
                       <div className="flex items-center space-x-4 text-[9px] font-bold uppercase tracking-widest text-slate-600">
                          <span>{report.type}</span>
                          <span>•</span>
                          <span>{report.date}</span>
                       </div>
                    </div>
                 </div>
                 <div className="flex items-center space-x-10">
                    <Badge variant="outline" className="rounded-none border-white/10 text-slate-500 text-[8px] font-bold uppercase tracking-widest px-3 py-1">{report.status}</Badge>
                    <Button variant="ghost" size="icon" className="h-12 w-12 text-slate-700 hover:text-emerald-500 transition-colors">
                       <Download size={18} />
                    </Button>
                 </div>
              </div>
            ))}
         </div>
      </Card>
    </div>
  );
}

import { cn } from '@/lib/utils';
import { Activity } from 'lucide-react';
