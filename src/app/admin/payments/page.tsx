
"use client";

import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Search, CreditCard, Download, Filter, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

const MOCK_PAYMENTS = [
  { id: 'TXN-9910', patient: 'Janice Dela Cruz', amount: '₱12,500', method: 'GCash', date: 'Oct 24, 2023', status: 'Completed', branch: 'Makati' },
  { id: 'TXN-9911', patient: 'Robert Tan', amount: '₱8,200', method: 'Credit Card', date: 'Oct 24, 2023', status: 'Pending', branch: 'BGC' },
  { id: 'TXN-9912', patient: 'Elena Rossi', amount: '₱25,000', method: 'Bank Transfer', date: 'Oct 23, 2023', status: 'Completed', branch: 'Makati' },
  { id: 'TXN-9913', patient: 'Mark Lim', amount: '₱4,500', method: 'Cash', date: 'Oct 23, 2023', status: 'Failed', branch: 'Quezon City' },
];

export default function PaymentsManager() {
  return (
    <AdminLayout>
      <div className="space-y-10">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h1 className="text-3xl font-headline tracking-tight text-slate-900">Payments & Billings</h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Financial transactions and branch settlements</p>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" className="rounded-none border-slate-200 px-8 font-bold text-xs uppercase tracking-[0.2em] h-12">
              <Download size={16} className="mr-2" />
              Export
            </Button>
            <Button className="bg-slate-900 text-white rounded-none px-8 font-bold text-xs uppercase tracking-[0.2em] h-12">
              Record Payment
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-sm rounded-none bg-white p-6">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Today's Revenue</p>
            <p className="text-2xl font-headline">₱20,700</p>
          </Card>
          <Card className="border-none shadow-sm rounded-none bg-white p-6">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pending Payments</p>
            <p className="text-2xl font-headline text-orange-500">₱8,200</p>
          </Card>
          <Card className="border-none shadow-sm rounded-none bg-white p-6">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Success Rate</p>
            <p className="text-2xl font-headline text-emerald-600">94.2%</p>
          </Card>
        </div>

        <Card className="border-none shadow-sm rounded-none bg-white overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <Input placeholder="Search transaction ID..." className="pl-10 h-10 rounded-none bg-slate-50 border-transparent text-sm" />
            </div>
            <Button variant="ghost" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-primary">
              <Filter size={14} className="mr-2" />
              Filter By Status
            </Button>
          </div>
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6 px-8">TXN ID</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Patient</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Branch</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Method</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6 text-right">Amount</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Status</TableHead>
                <TableHead className="text-right pr-8"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_PAYMENTS.map((txn) => (
                <TableRow key={txn.id} className="border-slate-50 hover:bg-slate-50/30 transition-colors">
                  <TableCell className="font-bold text-xs py-6 px-8">{txn.id}</TableCell>
                  <TableCell className="py-6">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{txn.patient}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-tighter">{txn.date}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-slate-500 py-6">{txn.branch}</TableCell>
                  <TableCell className="py-6">
                    <Badge variant="outline" className="rounded-none text-[9px] uppercase tracking-tighter border-slate-100 font-medium">
                      {txn.method}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-bold text-right py-6">{txn.amount}</TableCell>
                  <TableCell className="py-6">
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "rounded-none text-[9px] font-bold uppercase tracking-widest border-transparent",
                        txn.status === 'Completed' ? "bg-emerald-50 text-emerald-600" : 
                        txn.status === 'Pending' ? "bg-orange-50 text-orange-600" : 
                        "bg-red-50 text-red-600"
                      )}
                    >
                      {txn.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary">
                      <Eye size={16} />
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
