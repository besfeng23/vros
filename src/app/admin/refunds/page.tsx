
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
import { Undo2, AlertCircle, CheckCircle2, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

const MOCK_REFUNDS = [
  { id: 'RFD-201', patient: 'Janice Dela Cruz', originalTxn: 'TXN-9910', amount: '₱2,500', reason: 'Booking Cancellation', date: '2 hours ago', status: 'Pending' },
  { id: 'RFD-202', patient: 'Mark Lim', originalTxn: 'TXN-9844', amount: '₱1,200', reason: 'Double Payment', date: '5 hours ago', status: 'Approved' },
  { id: 'RFD-203', patient: 'Elena Rossi', originalTxn: 'TXN-9712', amount: '₱15,000', reason: 'Unused Package Credit', date: 'Yesterday', status: 'Processed' },
];

export default function RefundQueue() {
  return (
    <AdminLayout>
      <div className="space-y-10">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline tracking-tight text-slate-900">Refund Queue</h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Process reversal requests and financial corrections</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="border-none shadow-sm rounded-none bg-white p-8 space-y-8">
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pending Review</p>
                <p className="text-4xl font-headline text-orange-500">14</p>
              </div>
              <div className="h-[1px] bg-slate-50 w-full" />
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest">Policy Overview</h4>
                <ul className="text-xs text-slate-500 space-y-3 leading-relaxed">
                  <li className="flex items-start">
                    <CheckCircle2 size={12} className="mr-2 mt-0.5 text-emerald-500 shrink-0" />
                    Refunds over ₱10,000 require HQ approval.
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 size={12} className="mr-2 mt-0.5 text-emerald-500 shrink-0" />
                    Processing time is 3-5 business days.
                  </li>
                </ul>
              </div>
            </Card>
          </div>

          <Card className="lg:col-span-3 border-none shadow-sm rounded-none bg-white overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-slate-100">
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6 px-8">Refund ID</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Patient / Txn</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Reason</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6 text-right">Amount</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Status</TableHead>
                  <TableHead className="text-right pr-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_REFUNDS.map((rfd) => (
                  <TableRow key={rfd.id} className="border-slate-50">
                    <TableCell className="font-bold text-xs py-6 px-8">{rfd.id}</TableCell>
                    <TableCell className="py-6">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{rfd.patient}</p>
                        <p className="text-[10px] text-slate-400 font-bold tracking-tighter">{rfd.originalTxn}</p>
                      </div>
                    </TableCell>
                    <TableCell className="py-6">
                      <div className="space-y-1">
                        <p className="text-xs text-slate-500">{rfd.reason}</p>
                        <p className="text-[9px] text-slate-300 italic">{rfd.date}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-bold text-right py-6">{rfd.amount}</TableCell>
                    <TableCell className="py-6">
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "rounded-none text-[9px] font-bold uppercase tracking-widest border-transparent",
                          rfd.status === 'Pending' ? "bg-orange-50 text-orange-600 animate-pulse" : 
                          rfd.status === 'Approved' ? "bg-emerald-50 text-emerald-600" : 
                          "bg-slate-100 text-slate-400"
                        )}
                      >
                        {rfd.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary">
                        <MoreHorizontal size={18} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
