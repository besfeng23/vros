
'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { FileText, Download, CheckCircle2, Clock, Landmark, AlertCircle } from 'lucide-react';

const MOCK_RECON_DATA = [
  { branch: 'Makati', gross: 450000, net: 436500, fees: 13500, status: 'Transferred' },
  { branch: 'BGC', gross: 320000, net: 310400, fees: 9600, status: 'Processing' },
  { branch: 'Quezon City', gross: 185000, net: 179450, fees: 5550, status: 'Transferred' },
];

const METHOD_DISTRIBUTION = [
  { name: 'SpeedyPay', value: 65, color: 'hsl(var(--accent))' },
  { name: 'eMango', value: 25, color: 'hsl(var(--berry))' },
  { name: 'Credit Card', value: 10, color: 'hsl(var(--primary))' },
];

export default function ReconciliationDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-10">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h1 className="text-3xl font-headline tracking-tight text-slate-900">Finance Reconciliation</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Branch settlements and platform fee audits</p>
          </div>
          <Button className="bg-slate-900 text-white rounded-none px-8 font-bold text-xs uppercase tracking-[0.2em] h-12 shadow-lg">
            <Download size={16} className="mr-2" />
            Generate Settlement
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-none shadow-sm rounded-none bg-white">
            <CardHeader className="p-8">
              <CardTitle className="text-xs uppercase tracking-widest font-bold">Branch Settlement Status</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="border-slate-100 hover:bg-transparent">
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6 px-8">Branch</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Gross Vol.</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Platform Fees</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Net Payout</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_RECON_DATA.map((row) => (
                    <TableRow key={row.branch} className="border-slate-50 hover:bg-slate-50/30">
                      <TableCell className="font-bold text-xs py-6 px-8">{row.branch}</TableCell>
                      <TableCell className="text-xs font-medium py-6">₱{row.gross.toLocaleString()}</TableCell>
                      <TableCell className="text-xs text-slate-400 py-6">₱{row.fees.toLocaleString()}</TableCell>
                      <TableCell className="text-xs font-bold text-accent py-6">₱{row.net.toLocaleString()}</TableCell>
                      <TableCell className="py-6">
                        <Badge variant="outline" className={`rounded-none text-[9px] font-bold uppercase tracking-widest border-transparent ${row.status === 'Transferred' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                          {row.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-none bg-white">
            <CardHeader className="p-8">
              <CardTitle className="text-xs uppercase tracking-widest font-bold">Volume by Provider</CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={METHOD_DISTRIBUTION}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {METHOD_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-8 space-y-2">
                {METHOD_DISTRIBUTION.map(m => (
                  <div key={m.name} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                    <div className="flex items-center">
                      <div className="w-2 h-2 mr-2" style={{ backgroundColor: m.color }} />
                      <span className="text-slate-400">{m.name}</span>
                    </div>
                    <span>{m.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-none shadow-sm rounded-none bg-white p-8">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle2 className="text-emerald-500" size={18} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Verified</span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Unreconciled Trans.</p>
            <p className="text-2xl font-headline">0</p>
          </Card>
          <Card className="border-none shadow-sm rounded-none bg-white p-8">
            <div className="flex items-center justify-between mb-4">
              <Clock className="text-orange-500" size={18} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Pending</span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Avg. Settlement Time</p>
            <p className="text-2xl font-headline">4.2 <span className="text-xs text-slate-400 font-body">Hrs</span></p>
          </Card>
          <Card className="border-none shadow-sm rounded-none bg-white p-8">
            <div className="flex items-center justify-between mb-4">
              <Landmark className="text-accent" size={18} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">HQ</span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Fee Revenue</p>
            <p className="text-2xl font-headline">₱28.6k</p>
          </Card>
          <Card className="border-none shadow-sm rounded-none bg-white p-8">
            <div className="flex items-center justify-between mb-4">
              <AlertCircle className="text-red-500" size={18} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Alerts</span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Disputed Payments</p>
            <p className="text-2xl font-headline">2</p>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
