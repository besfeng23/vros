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
import { Search, Plus, Edit3, MoreHorizontal, Layers, Sparkles } from 'lucide-react';
import Image from 'next/image';

const MOCK_SERVICES = [
  { id: 'S-101', name: 'Advanced Facial Rejuvenation', category: 'Skincare', price: '₱4,500', duration: '60 min', status: 'Active', bookings: 142 },
  { id: 'S-102', name: 'Medical Grade Laser', category: 'Laser', price: '₱8,200', duration: '45 min', status: 'Active', bookings: 98 },
  { id: 'S-103', name: 'Contour Sculpting', category: 'Body', price: '₱12,500', duration: '90 min', status: 'Featured', bookings: 64 },
  { id: 'S-104', name: 'IV Drip - Radiance', category: 'Wellness', price: '₱3,800', duration: '30 min', status: 'Active', bookings: 210 },
];

export default function ServicesManager() {
  return (
    <AdminLayout>
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-headline tracking-tight text-slate-900">Services & Pricing</h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Manage your clinical treatment portfolio</p>
          </div>
          <Button className="bg-primary text-white rounded-none px-8 font-bold text-xs uppercase tracking-[0.2em] shadow-lg hover:translate-y-[-2px] transition-transform h-12">
            <Plus size={16} className="mr-2" />
            Add New Service
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-sm rounded-none bg-white p-6 flex items-center space-x-4">
            <div className="p-3 bg-accent/10 text-accent">
              <Layers size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Services</p>
              <p className="text-xl font-headline">24 Active</p>
            </div>
          </Card>
          <Card className="border-none shadow-sm rounded-none bg-white p-6 flex items-center space-x-4">
            <div className="p-3 bg-berry/10 text-berry">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Featured Items</p>
              <p className="text-xl font-headline">6 Promoted</p>
            </div>
          </Card>
          <Card className="border-none shadow-sm rounded-none bg-white p-6 flex items-center space-x-4">
            <div className="p-3 bg-emerald-50 text-emerald-600">
              <Edit3 size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price Updates</p>
              <p className="text-xl font-headline">Last 2 days ago</p>
            </div>
          </Card>
        </div>

        <Card className="border-none shadow-sm rounded-none bg-white overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex flex-wrap gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <Input placeholder="Search services..." className="pl-10 h-10 rounded-none bg-slate-50 border-transparent text-sm font-medium" />
            </div>
          </div>
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6 px-8">Service Name</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Category</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Base Price</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Duration</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Bookings</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Status</TableHead>
                <TableHead className="text-right pr-8"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_SERVICES.map((service) => (
                <TableRow key={service.id} className="border-slate-50 hover:bg-slate-50/30 transition-colors">
                  <TableCell className="py-6 px-8">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 relative bg-slate-100 overflow-hidden">
                        <Image src={`https://picsum.photos/seed/${service.id}/100/100`} alt={service.name} fill className="object-cover" />
                      </div>
                      <span className="text-sm font-bold text-slate-900">{service.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-6">
                    <Badge variant="outline" className="rounded-none text-[9px] font-bold uppercase tracking-widest border-slate-100 text-slate-400">
                      {service.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium py-6">{service.price}</TableCell>
                  <TableCell className="text-xs text-slate-400 py-6 italic">{service.duration}</TableCell>
                  <TableCell className="text-xs font-bold py-6">{service.bookings}</TableCell>
                  <TableCell className="py-6">
                    <Badge 
                      variant="outline" 
                      className={`rounded-none text-[9px] font-bold uppercase tracking-widest border-transparent ${service.status === 'Featured' ? 'bg-accent/10 text-accent' : 'bg-emerald-50 text-emerald-600'}`}
                    >
                      {service.status}
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
    </AdminLayout>
  );
}