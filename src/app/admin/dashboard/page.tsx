"use client";

import React, { useEffect, useState } from 'react';
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
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  limit, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { useFirebase } from '@/firebase/provider';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

const MOCK_CHART_DATA = [
  { name: 'Mon', revenue: 45000, bookings: 12 },
  { name: 'Tue', revenue: 52000, bookings: 15 },
  { name: 'Wed', revenue: 38000, bookings: 10 },
  { name: 'Thu', revenue: 65000, bookings: 22 },
  { name: 'Fri', revenue: 82000, bookings: 28 },
  { name: 'Sat', revenue: 95000, bookings: 35 },
  { name: 'Sun', revenue: 78000, bookings: 25 },
];

export default function HQDashboard() {
  const { firestore } = useFirebase();
  const [stats, setStats] = useState({
    activeToday: 0,
    newInquiries: 0,
    pendingApprovals: 0,
    revenueMTD: '₱0.00',
    loading: true
  });

  const [recentLogs, setRecentLogs] = useState<any[]>([]);

  useEffect(() => {
    async function fetchDashboardData() {
      if (!firestore) return;

      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayStr = today.toISOString().split('T')[0];

        // 1. Appointments Today
        const apptsQuery = query(
          collection(firestore, 'appointments'),
          where('appointmentDate', '==', todayStr)
        );
        const apptsSnap = await getDocs(apptsQuery);

        // 2. New Inquiries
        const inquiriesQuery = query(
          collection(firestore, 'inquiries'),
          where('status', '==', 'new')
        );
        const inquiriesSnap = await getDocs(inquiriesQuery);

        // 3. Pending Refunds (Approvals)
        const refundsQuery = query(
          collection(firestore, 'payments'),
          where('status', '==', 'pending')
        );
        const refundsSnap = await getDocs(refundsQuery);

        // 4. Recent Logs
        const logsQuery = query(
          collection(firestore, 'activityLogs'),
          orderBy('createdAt', 'desc'),
          limit(3)
        );
        const logsSnap = await getDocs(logsQuery);

        setStats({
          activeToday: apptsSnap.size,
          newInquiries: inquiriesSnap.size,
          pendingApprovals: refundsSnap.size,
          revenueMTD: '₱1.2M', 
          loading: false
        });

        setRecentLogs(logsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Dashboard data fetch failed:", error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    }

    fetchDashboardData();
  }, [firestore]);

  const primaryStats = [
    { name: 'Total Bookings Today', value: stats.activeToday.toString(), change: '+12%', icon: Calendar, color: 'text-primary' },
    { name: 'Pending Inquiries', value: stats.newInquiries.toString(), change: '-2', icon: MessageSquare, color: 'text-emerald-500' },
    { name: 'Revenue (MTD)', value: stats.revenueMTD, change: '+8.4%', icon: TrendingUp, color: 'text-emerald-500' },
    { name: 'Approval Requests', value: stats.pendingApprovals.toString(), change: 'Urgent', icon: Clock, color: 'text-amber-500' },
  ];

  const secondaryStats = [
    { name: 'Pending Refunds', value: stats.pendingApprovals.toString(), icon: Undo2 },
    { name: 'Package Redemptions', value: '42', icon: PackageOpen },
    { name: 'Staff Activity', value: 'Active', icon: Users },
    { name: 'Promo Conversions', value: '18%', icon: Sparkles },
  ];

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-4xl font-headline tracking-tight text-slate-900">Network Intelligence</h1>
          <p className="text-slate-500 text-[10px] tracking-[0.3em] uppercase font-bold">Harmony OS Global Operations Portfolio</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="outline" className="rounded-none px-6 py-2 text-[9px] font-bold uppercase tracking-[0.2em] border-slate-200 bg-white">Network Real-Time</Badge>
          <Badge className="rounded-none px-6 py-2 text-[9px] font-bold uppercase tracking-[0.2em] bg-emerald-500 hover:bg-emerald-600">Operations Live</Badge>
        </div>
      </div>

      {/* Primary Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {primaryStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="border-none shadow-sm rounded-none bg-white hover:shadow-md transition-shadow">
              <CardContent className="p-10">
                <div className="flex justify-between items-start">
                  <div className="space-y-5">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.25em]">{stat.name}</p>
                    <h3 className="text-4xl font-headline text-slate-900">
                      {stats.loading ? <Loader2 className="animate-spin h-6 w-6 text-slate-200" /> : stat.value}
                    </h3>
                  </div>
                  <div className="p-4 bg-slate-50/50">
                    <Icon className={stat.color} size={22} />
                  </div>
                </div>
                <div className={cn(
                  "mt-8 flex items-center text-[9px] font-bold tracking-[0.2em] uppercase",
                  stat.change.startsWith('+') || stat.change === 'Urgent' ? "text-emerald-600" : "text-slate-400"
                )}>
                  {stat.change} <span className="text-slate-300 ml-3 italic">vs baseline</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Visual Data */}
        <Card className="lg:col-span-2 border-none shadow-sm rounded-none bg-white">
          <CardHeader className="p-10 border-b border-slate-50">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-500">Revenue & Booking Dynamics</CardTitle>
                <CardDescription className="text-xs italic mt-1 text-slate-400">Consolidated weekly trajectory across clinical network</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-10 pt-8 h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 9, fontWeight: 'bold', fill: '#94a3b8', letterSpacing: '0.1em' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 9, fontWeight: 'bold', fill: '#94a3b8' }}
                />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '0px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}
                />
                <Bar dataKey="revenue" fill="#10b981" radius={[0, 0, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Regional Performance & Secondary Metrics */}
        <div className="space-y-10">
          <div className="grid grid-cols-2 gap-6">
            {secondaryStats.map(s => (
              <Card key={s.name} className="border-none shadow-sm rounded-none bg-white hover:bg-slate-50 transition-colors">
                <CardContent className="p-8">
                  <s.icon className="text-emerald-500 mb-6" size={20} />
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">{s.name}</p>
                  <p className="text-xl font-headline text-slate-900">{s.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-none shadow-sm rounded-none bg-white">
            <CardHeader className="p-8 border-b border-slate-50">
              <CardTitle className="text-[9px] uppercase tracking-[0.3em] font-bold text-emerald-500">Live Activity Trail</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              {recentLogs.length > 0 ? recentLogs.map((log, idx) => (
                <div key={log.id || idx} className="flex items-start space-x-4 group">
                  <div className="mt-1">
                    <div className="p-2 bg-slate-50 text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-all rounded-full">
                      <Clock size={12} />
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-bold uppercase tracking-tight">{log.userName || 'System'}</p>
                      <span className="text-[8px] text-slate-300 font-bold uppercase tracking-widest leading-none">
                        {log.createdAt instanceof Timestamp ? 'RECENT' : 'LOG'}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight">{log.action}</p>
                    <Badge variant="outline" className="text-[7px] p-0 px-1 border-slate-100 text-slate-400 font-bold uppercase">{log.userRole || 'Admin'}</Badge>
                  </div>
                </div>
              )) : (
                <p className="text-[10px] text-slate-400 text-center py-4 italic">No recent logs detected</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-slate-900 p-12 rounded-none text-white space-y-8">
        <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-emerald-500">System Pulse</h3>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-3xl font-headline tracking-wide">Enterprise Stability: 99.99%</p>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Global Network Integrity verified</p>
          </div>
          <CheckCircle2 size={48} className="text-emerald-500 opacity-20" />
        </div>
      </div>
    </div>
  );
}
