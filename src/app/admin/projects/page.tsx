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

const MOCK_PROJECTS = [
  { id: 'PRJ-001', name: 'Underground Supply Chain Alpha', department: 'Underground', budget: '₱4.5M', timeline: 'Q3-Q4 2026', status: 'Active', tasks: 142 },
  { id: 'PRJ-002', name: 'Global Talent Gala 2026', department: 'Entertainment', budget: '₱8.2M', timeline: 'Nov 2026', status: 'Planning', tasks: 98 },
  { id: 'PRJ-003', name: 'Executive Advisory Board', department: 'Corporate', budget: '₱2.5M', timeline: 'Continuous', status: 'Active', tasks: 64 },
  { id: 'PRJ-004', name: 'Special Ops Initiative 88', department: '88 Department', budget: '₱12.8M', timeline: 'Restricted', status: 'Urgent', tasks: 210 },
];

export default function ProjectsManager() {
  return (
    <AdminLayout>
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-headline tracking-tight text-slate-900">Operational Projects</h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Global Asset Deployment & Project Lifecycle Control</p>
          </div>
          <Button className="bg-primary text-white rounded-none px-8 font-bold text-xs uppercase tracking-[0.2em] shadow-lg hover:translate-y-[-2px] transition-transform h-12">
            <Plus size={16} className="mr-2" />
            Initialize New Project
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-sm rounded-none bg-white p-6 flex items-center space-x-4">
            <div className="p-3 bg-accent/10 text-accent">
              <Layers size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Initiatives</p>
              <p className="text-xl font-headline">24 Projects</p>
            </div>
          </Card>
          <Card className="border-none shadow-sm rounded-none bg-white p-6 flex items-center space-x-4">
            <div className="p-3 bg-emerald-50 text-emerald-600">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Critical Path</p>
              <p className="text-xl font-headline">6 Urgent</p>
            </div>
          </Card>
          <Card className="border-none shadow-sm rounded-none bg-white p-6 flex items-center space-x-4">
            <div className="p-3 bg-slate-100 text-slate-400">
              <Edit3 size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Resource Updates</p>
              <p className="text-xl font-headline">Sync 4h ago</p>
            </div>
          </Card>
        </div>

        <Card className="border-none shadow-sm rounded-none bg-white overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex flex-wrap gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <Input placeholder="Query project manifest..." className="pl-10 h-10 rounded-none bg-slate-50 border-transparent text-sm font-medium" />
            </div>
          </div>
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6 px-8">Project Identity</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Department</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Budget Overlay</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Timeline</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Task Density</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-6">Status</TableHead>
                <TableHead className="text-right pr-8"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_PROJECTS.map((project) => (
                <TableRow key={project.id} className="border-slate-50 hover:bg-slate-50/30 transition-colors">
                  <TableCell className="py-6 px-8">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 relative bg-slate-900 flex items-center justify-center text-emerald-500 font-bold text-[10px] border border-emerald-500/20">
                        {project.id.split('-')[1]}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">{project.name}</span>
                        <span className="text-[9px] text-slate-400 uppercase tracking-tighter">{project.id}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-6">
                    <Badge variant="outline" className="rounded-none text-[9px] font-bold uppercase tracking-widest border-slate-100 text-slate-400">
                      {project.department}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium py-6">{project.budget}</TableCell>
                  <TableCell className="text-xs text-slate-400 py-6 italic">{project.timeline}</TableCell>
                  <TableCell className="text-xs font-bold py-6">{project.tasks} Active</TableCell>
                  <TableCell className="py-6">
                    <Badge 
                      variant="outline" 
                      className={`rounded-none text-[9px] font-bold uppercase tracking-widest border-transparent ${project.status === 'Urgent' ? 'bg-accent/10 text-accent' : 'bg-emerald-50 text-emerald-600'}`}
                    >
                      {project.status}
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