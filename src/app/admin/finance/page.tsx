'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  PieChart, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight,
  Target,
  Layers,
  Wallet
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell
} from 'recharts';

const MOCK_REVENUE_DATA = [
  { month: 'Jan', revenue: 1200000, expenses: 800000 },
  { month: 'Feb', revenue: 1500000, expenses: 850000 },
  { month: 'Mar', revenue: 1100000, expenses: 750000 },
  { month: 'Apr', revenue: 1800000, expenses: 900000 },
  { month: 'May', revenue: 2100000, expenses: 950000 },
  { month: 'Jun', revenue: 1900000, expenses: 880000 },
];

const BRANCH_CONTRIBUTION = [
  { name: 'Makati HQ', value: 45, color: '#10b981' },
  { name: 'BGC Satellite', value: 30, color: '#0f172a' },
  { name: 'Quezon City', value: 25, color: '#94a3b8' },
];

export default function FinanceOverviewPage() {
  return (
    <div className="space-y-10 pb-20">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-4xl font-headline tracking-tight text-slate-900">Finance Tracker</h1>
          <p className="text-slate-500 text-[10px] tracking-[0.3em] uppercase font-bold">Consolidated Global Financial Ledger & Analytics</p>
        </div>
        <div className="flex items-center space-x-4">
           <Button variant="outline" className="h-12 px-8 rounded-none border-slate-100 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <Download size={16} className="mr-2" />
              Download Audit Pack
           </Button>
           <Button className="h-12 px-8 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest transition-all">
              Settlement Settings
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {[
           { title: 'Total Asset Liquidity', value: '₱12.4M', trend: '+14.2%', icon: Wallet, color: 'text-emerald-500' },
           { title: 'Net Profit Margin', value: '32.1%', trend: '+2.4%', icon: TrendingUp, color: 'text-emerald-500' },
           { title: 'Operational Burn', value: '₱850k', trend: '-5.1%', icon: TrendingDown, color: 'text-slate-400' },
           { title: 'Projected EBITDA', value: '₱4.2M', trend: 'Targeted', icon: Target, color: 'text-emerald-500' },
         ].map((stat, i) => (
           <Card key={i} className="border-none shadow-sm rounded-none bg-white p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-6">
                 <div className="p-3 bg-slate-50 text-slate-300 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    <stat.icon size={18} />
                 </div>
                 <div className={cn(
                   "flex items-center text-[10px] font-bold tracking-tighter",
                   stat.trend.startsWith('+') ? "text-emerald-500" : "text-slate-400"
                 )}>
                    {stat.trend}
                    {stat.trend.startsWith('+') ? <ArrowUpRight size={14} className="ml-1" /> : <ArrowDownRight size={14} className="ml-1" />}
                 </div>
              </div>
              <div className="space-y-1">
                 <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{stat.title}</p>
                 <h3 className="text-3xl font-headline text-slate-900">{stat.value}</h3>
              </div>
           </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <Card className="lg:col-span-2 border-none shadow-sm rounded-none bg-white">
            <CardHeader className="p-10 border-b border-slate-50">
               <CardTitle className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-500">Revenue Flow & Expense Trajectory</CardTitle>
            </CardHeader>
            <CardContent className="p-10 pt-8 h-[450px]">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={MOCK_REVENUE_DATA}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis 
                       dataKey="month" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fontSize: 9, fontWeight: 'bold', fill: '#94a3b8', letterSpacing: '0.1em' }} 
                     />
                     <YAxis 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fontSize: 9, fontWeight: 'bold', fill: '#94a3b8' }}
                       tickFormatter={(v) => `₱${v/1000000}M`}
                     />
                     <Tooltip 
                       contentStyle={{ borderRadius: '0px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}
                     />
                     <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} activeDot={{ r: 6 }} />
                     <Line type="monotone" dataKey="expenses" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  </LineChart>
               </ResponsiveContainer>
            </CardContent>
         </Card>

         <Card className="border-none shadow-sm rounded-none bg-white">
            <CardHeader className="p-10 border-b border-slate-50">
               <CardTitle className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-500">Asset Yield (By Location)</CardTitle>
            </CardHeader>
            <CardContent className="p-10 space-y-10">
               {BRANCH_CONTRIBUTION.map(branch => (
                 <div key={branch.name} className="space-y-4">
                    <div className="flex justify-between items-end">
                       <div className="space-y-1">
                          <p className="text-xs font-bold text-slate-900">{branch.name}</p>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">Net Contribution</p>
                       </div>
                       <span className="text-lg font-headline text-slate-900">{branch.value}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-50 rounded-none overflow-hidden">
                       <div 
                         className="h-full transition-all duration-1000" 
                         style={{ width: `${branch.value}%`, backgroundColor: branch.color }} 
                       />
                    </div>
                 </div>
               ))}

               <div className="pt-10 border-t border-slate-50">
                  <div className="bg-slate-900 p-8 text-white space-y-4">
                     <Layers size={20} className="text-emerald-500" />
                     <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-500">Capital Intelligence</p>
                     <p className="text-xs leading-relaxed italic opacity-60">"Global liquidity reserves are maintained at 2.4x operational burn rate to ensure network resilience."</p>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
