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

const MOCK_PROMOS = [
  { id: 'PRM-001', name: 'Summer Glow Package', type: 'Bundle', discount: '15% Off', validUntil: 'Aug 30, 2024', status: 'Active', conversions: '124' },
  { id: 'PRM-002', name: 'BGC Grand Opening', type: 'Discount', discount: '₱2,000 Off', validUntil: 'Dec 15, 2024', status: 'Upcoming', conversions: '0' },
  { id: 'PRM-003', name: 'Elite Member Voucher', type: 'Voucher', discount: 'Free Treatment', validUntil: 'Unlimited', status: 'Active', conversions: '42' },
  { id: 'PRM-004', name: 'Flash Sale: IV Drip', type: 'Limited Time', discount: 'Buy 1 Take 1', validUntil: 'Expired', status: 'Ended', conversions: '310' },
];

export default function PromosManager() {
  return (
    <AdminLayout>
      <div className="space-y-10">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h1 className="text-3xl font-headline tracking-tight text-slate-900">Promotions & Campaigns</h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Drive growth with exclusive luxury offers</p>
          </div>
          <Button className="bg-berry text-white rounded-none px-8 font-bold text-xs uppercase tracking-[0.2em] h-12">
            <Plus size={16} className="mr-2" />
            Create Campaign
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-none shadow-sm rounded-none bg-white p-8">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Active Promos</p>
            <p className="text-2xl font-headline">8</p>
          </Card>
          <Card className="border-none shadow-sm rounded-none bg-white p-8">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Conversions</p>
            <p className="text-2xl font-headline text-accent">476</p>
          </Card>
          <Card className="border-none shadow-sm rounded-none bg-white p-8">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Avg. Discount</p>
            <p className="text-2xl font-headline">18%</p>
          </Card>
          <Card className="border-none shadow-sm rounded-none bg-white p-8">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Campaign ROI</p>
            <p className="text-2xl font-headline text-emerald-600">4.2x</p>
          </Card>
        </div>

        <Card className="border-none shadow-sm rounded-none bg-white overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6 px-8">Campaign Name</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Type</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Offer Details</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Conversions</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Expiry</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Status</TableHead>
                <TableHead className="text-right pr-8"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_PROMOS.map((promo) => (
                <TableRow key={promo.id} className="border-slate-50 hover:bg-slate-50/30 transition-colors">
                  <TableCell className="font-bold text-sm py-6 px-8 text-slate-900">{promo.name}</TableCell>
                  <TableCell className="py-6">
                    <div className="flex items-center text-[10px] font-bold uppercase tracking-tighter text-slate-400">
                      <Tag size={12} className="mr-2 text-accent" />
                      {promo.type}
                    </div>
                  </TableCell>
                  <TableCell className="py-6 text-sm font-medium text-berry">{promo.discount}</TableCell>
                  <TableCell className="py-6">
                    <div className="flex items-center space-x-2">
                      <TrendingUp size={12} className="text-emerald-500" />
                      <span className="text-xs font-bold">{promo.conversions}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-6">
                    <div className="flex items-center text-xs text-slate-400">
                      <Calendar size={12} className="mr-2" />
                      {promo.validUntil}
                    </div>
                  </TableCell>
                  <TableCell className="py-6">
                    <Badge 
                      variant="outline" 
                      className={`rounded-none text-[9px] font-bold uppercase tracking-widest border-transparent ${
                        promo.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 
                        promo.status === 'Upcoming' ? 'bg-orange-50 text-orange-600' : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {promo.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <Button variant="ghost" size="sm" className="rounded-none text-accent text-[9px] uppercase tracking-widest font-bold">
                      Analyze <ArrowRight size={12} className="ml-1" />
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