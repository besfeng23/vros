
"use client";

import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Download, FileText, TrendingUp, PieChart, Calendar, ChevronRight } from 'lucide-react';

const PERFORMANCE_DATA = [
  { month: 'Jan', revenue: 840, growth: 12 },
  { month: 'Feb', revenue: 920, growth: 15 },
  { month: 'Mar', revenue: 1100, growth: 22 },
  { month: 'Apr', revenue: 1050, growth: 18 },
  { month: 'May', revenue: 1400, growth: 28 },
  { month: 'Jun', revenue: 1650, growth: 35 },
];

export default function ReportsCenter() {
  return (
    <AdminLayout>
      <div className="space-y-10">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h1 className="text-3xl font-headline tracking-tight text-slate-900">Intelligence & Analytics</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">National Business Performance Index</p>
          </div>
          <Button className="bg-slate-900 text-white rounded-none px-8 font-bold text-xs uppercase tracking-[0.2em] h-12 shadow-lg">
            <Download size={16} className="mr-2" />
            Export Annual Report
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-none shadow-sm rounded-none bg-white">
            <CardHeader className="p-8">
              <CardTitle className="text-xs uppercase tracking-widest font-bold text-accent">Consolidated Revenue Performance</CardTitle>
              <CardDescription className="text-[10px] italic">Figures in PHP Millions • Rolling 6 Month View</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={PERFORMANCE_DATA}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="border-none shadow-sm rounded-none bg-white p-8">
              <div className="flex items-center space-x-3 mb-6">
                <TrendingUp size={18} className="text-emerald-600" />
                <p className="text-[10px] font-bold uppercase tracking-widest">Growth Index</p>
              </div>
              <p className="text-4xl font-headline">+24.8%</p>
              <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase">vs Previous Period</p>
            </Card>

            <div className="grid grid-cols-1 gap-4">
              {[
                { name: 'Patient Retention', val: '72%', icon: PieChart },
                { name: 'Service Margin', val: '64%', icon: FileText },
              ].map(s => (
                <Card key={s.name} className="border-none shadow-sm rounded-none bg-white p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <s.icon size={14} className="text-slate-400" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{s.name}</span>
                    </div>
                    <span className="text-sm font-headline">{s.val}</span>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="border-none shadow-sm rounded-none bg-primary text-white p-8 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Available Templates</h4>
              <div className="space-y-3">
                {['Quarterly Financials', 'Staff Productivity', 'Treatment Popularity'].map(t => (
                  <div key={t} className="flex items-center justify-between group cursor-pointer border-b border-white/10 pb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">{t}</span>
                    <ChevronRight size={12} className="text-accent" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
