"use client";

import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Tag, Calendar, TrendingUp, Plus, ArrowRight } from 'lucide-react';

const MOCK_DEALS = [
  { id: 'DEAL-001', name: 'Metro Manila Distribution Rights', organization: 'San Miguel Corp', value: '₱12.5M', source: 'Direct', status: 'Negotiation', probability: '75%' },
  { id: 'DEAL-002', name: 'Hotel Entertainment Partnership', organization: 'Solaire Resort', value: '₱8.2M', source: 'Referral', status: 'Discovery', probability: '30%' },
  { id: 'DEAL-003', name: 'Elite Security Services Retainer', organization: 'Private Family Office', value: '₱25.0M', source: 'Confidential', status: 'Closing', probability: '90%' },
  { id: 'DEAL-004', name: 'Cloud Infrastructure Upgrade', organization: 'Globe Telecom', value: '₱3.8M', source: 'Tender', status: 'Won', probability: '100%' },
];

export default function DealFlowManager() {
  return (
    <AdminLayout>
      <div className="space-y-10">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h1 className="text-3xl font-headline tracking-tight text-slate-900">Deal Flow & CRM</h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Global Revenue Pipeline & Strategic Partnership Control</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-none px-8 font-bold text-xs uppercase tracking-[0.2em] h-12">
            <Plus size={16} className="mr-2" />
            Initialize New Deal
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-none shadow-sm rounded-none bg-white p-8">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Active Pipeline</p>
            <p className="text-2xl font-headline">12 Deals</p>
          </Card>
          <Card className="border-none shadow-sm rounded-none bg-white p-8">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Weighted Value</p>
            <p className="text-2xl font-headline text-emerald-600">₱45.2M</p>
          </Card>
          <Card className="border-none shadow-sm rounded-none bg-white p-8">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Avg. Probability</p>
            <p className="text-2xl font-headline">64%</p>
          </Card>
          <Card className="border-none shadow-sm rounded-none bg-white p-8">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pipeline Velocity</p>
            <p className="text-2xl font-headline text-accent">1.8x</p>
          </Card>
        </div>

        <Card className="border-none shadow-sm rounded-none bg-white overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6 px-8">Opportunity Identity</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Organization</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Contract Value</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Probability</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Origin</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Stage</TableHead>
                <TableHead className="text-right pr-8"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_DEALS.map((deal) => (
                <TableRow key={deal.id} className="border-slate-50 hover:bg-slate-50/30 transition-colors">
                  <TableCell className="font-bold text-sm py-6 px-8 text-slate-900">{deal.name}</TableCell>
                  <TableCell className="py-6">
                    <div className="flex items-center text-[10px] font-bold uppercase tracking-tighter text-slate-400">
                      <Tag size={12} className="mr-2 text-accent" />
                      {deal.organization}
                    </div>
                  </TableCell>
                  <TableCell className="py-6 text-sm font-medium text-emerald-600">{deal.value}</TableCell>
                  <TableCell className="py-6">
                    <div className="flex items-center space-x-2">
                      <TrendingUp size={12} className="text-emerald-500" />
                      <span className="text-xs font-bold">{deal.probability}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-6 text-xs text-slate-400 uppercase tracking-widest">{deal.source}</TableCell>
                  <TableCell className="py-6">
                    <Badge 
                      variant="outline" 
                      className={`rounded-none text-[9px] font-bold uppercase tracking-widest border-transparent ${
                        deal.status === 'Won' ? 'bg-emerald-50 text-emerald-600' : 
                        deal.status === 'Closing' ? 'bg-orange-50 text-orange-600' : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {deal.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <Button variant="ghost" size="sm" className="rounded-none text-accent text-[9px] uppercase tracking-widest font-bold">
                      Protocol <ArrowRight size={12} className="ml-1" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AdminLayout>
  );
}