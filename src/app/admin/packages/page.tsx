
"use client";

import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Search, PackageCheck, History, ArrowRight, User } from 'lucide-react';

const MOCK_PACKAGES = [
  { id: 'PKG-7721', patient: 'Maria Clara', package: 'Signature Glow (10 Sessions)', remaining: 6, total: 10, expiry: 'Dec 2024', status: 'Active' },
  { id: 'PKG-8120', patient: 'Roberto Santos', package: 'Laser Hair Removal', remaining: 2, total: 12, expiry: 'Jun 2025', status: 'Active' },
  { id: 'PKG-9011', patient: 'Anna Lee', package: 'Anti-Aging Deluxe', remaining: 0, total: 5, expiry: 'Expired', status: 'Fully Redeemed' },
];

export default function PackageRedemptionTracker() {
  return (
    <AdminLayout>
      <div className="space-y-10">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h1 className="text-3xl font-headline tracking-tight text-slate-900">Package Redemptions</h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Track pre-paid sessions and patient balances</p>
          </div>
          <Button className="bg-accent text-white rounded-none px-8 font-bold text-xs uppercase tracking-[0.2em]">
            <PackageCheck size={16} className="mr-2" />
            New Redemption
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Quick Find */}
          <Card className="lg:col-span-1 border-none shadow-sm rounded-none bg-white h-fit">
            <CardHeader className="p-6 border-b border-slate-50">
              <CardTitle className="text-xs uppercase tracking-[0.2em] font-bold">Quick Patient Search</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <Input placeholder="Enter Patient ID or Phone" className="pl-10 h-10 rounded-none bg-slate-50 border-transparent text-sm" />
                </div>
                <Button className="w-full bg-slate-900 rounded-none h-11 text-xs font-bold uppercase tracking-widest">Verify Balance</Button>
              </div>
              <div className="pt-4 space-y-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recently Viewed</p>
                <div className="space-y-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center space-x-3 p-2 hover:bg-slate-50 transition-colors cursor-pointer group">
                      <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-accent group-hover:text-white">
                        <User size={12} />
                      </div>
                      <span className="text-xs font-medium">Patient 00{i}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Table */}
          <Card className="lg:col-span-3 border-none shadow-sm rounded-none bg-white overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-slate-100">
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6 px-8">Package ID</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Patient</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Package Details</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Balance</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Expiry</TableHead>
                  <TableHead className="text-right pr-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_PACKAGES.map((pkg) => (
                  <TableRow key={pkg.id} className="border-slate-50">
                    <TableCell className="font-bold text-xs py-6 px-8">{pkg.id}</TableCell>
                    <TableCell className="text-sm font-medium py-6">{pkg.patient}</TableCell>
                    <TableCell className="text-xs text-slate-500 py-6">{pkg.package}</TableCell>
                    <TableCell className="py-6">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold">{pkg.remaining}</span>
                          <span className="text-slate-300 text-[10px]">/ {pkg.total}</span>
                        </div>
                        <div className="w-24 h-1 bg-slate-100 overflow-hidden">
                          <div 
                            className="h-full bg-accent transition-all" 
                            style={{ width: `${(pkg.remaining / pkg.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs font-bold text-slate-400 py-6">{pkg.expiry}</TableCell>
                    <TableCell className="text-right pr-8">
                      <Button variant="outline" size="sm" className="rounded-none border-accent text-accent text-[9px] uppercase tracking-widest font-bold h-7">
                        Details <ArrowRight size={10} className="ml-1" />
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
