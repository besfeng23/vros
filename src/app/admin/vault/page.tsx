'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  File, 
  Folder, 
  Download, 
  Share2, 
  MoreVertical, 
  Plus, 
  Search, 
  Lock,
  Cloud,
  ArrowUp,
  HardDrive
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MOCK_FILES = [
  { id: 'f1', name: 'Lease_Agreement_Makati_HQ.pdf', size: '2.4 MB', type: 'PDF', folder: 'Legal', updated: '2 days ago' },
  { id: 'f2', name: 'Q3_Operations_Report_Final.xlsx', size: '1.1 MB', type: 'XLSX', folder: 'Finance', updated: '5 hours ago' },
  { id: 'f3', name: 'Brand_Guidelines_V2.pdf', size: '18 MB', type: 'PDF', folder: 'Marketing', updated: '1 week ago' },
  { id: 'f4', name: 'Insurance_Policy_2026.pdf', size: '4.5 MB', type: 'PDF', folder: 'Legal', updated: '1 month ago' },
];

export default function VaultPage() {
  const [files, setFiles] = useState(MOCK_FILES);

  return (
    <div className="space-y-10 pb-20">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-4xl font-headline tracking-tight text-slate-900">Operational Vault</h1>
          <p className="text-slate-500 text-[10px] tracking-[0.3em] uppercase font-bold">Secure Asset Repository & Global Document Control</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-300 mr-8">
             <Cloud size={14} className="text-emerald-500" />
             <span className="uppercase tracking-widest">Enterprise Cloud Sync Active</span>
          </div>
          <Button className="h-12 px-8 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-emerald-900/10">
            <ArrowUp size={16} className="mr-2" />
            Upload Intellectual Asset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
         {/* Sidebar: Categories */}
         <div className="space-y-10">
            <Card className="border-none shadow-sm rounded-none bg-white p-8 space-y-8">
               <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Total Utilization</p>
                  <div className="h-2 w-full bg-slate-50 rounded-none overflow-hidden">
                     <div className="h-full bg-emerald-500 w-[64%] shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  </div>
                  <div className="flex justify-between text-[9px] font-bold uppercase text-slate-300">
                     <span>1.2 TB of 2 TB</span>
                     <span>64%</span>
                  </div>
               </div>

               <div className="space-y-4">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-900 border-b border-slate-100 pb-2">Directories</h3>
                  <div className="space-y-1">
                     {['Legal Documents', 'Financial Records', 'Creative Assets', 'Operational Manuals', 'Staff Archives'].map(folder => (
                       <button key={folder} className="w-full flex items-center justify-between p-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-50 hover:text-emerald-600 transition-all group">
                          <div className="flex items-center space-x-3">
                             <Folder size={14} className="group-hover:text-emerald-500" />
                             <span>{folder}</span>
                          </div>
                          <ChevronRight size={12} className="opacity-0 group-hover:opacity-100" />
                       </button>
                     ))}
                  </div>
               </div>
            </Card>

            <div className="p-8 bg-slate-900 text-white rounded-none space-y-4">
               <Lock size={20} className="text-emerald-500" />
               <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-500">Security Protocol</p>
               <p className="text-sm font-headline leading-relaxed">Encrypted with Military-Grade AES-256 for maximum data integrity.</p>
            </div>
         </div>

         {/* File Explorer */}
         <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center space-x-6">
               <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    placeholder="Query Vault Database..." 
                    className="w-full pl-12 h-12 bg-white border border-slate-100 text-[10px] font-bold uppercase tracking-widest focus:ring-emerald-500 focus:outline-none shadow-sm"
                  />
               </div>
               <Button variant="outline" className="h-12 px-6 rounded-none border-slate-100 text-slate-400">
                  <Filter size={16} />
               </Button>
            </div>

            <Card className="border-none shadow-sm rounded-none bg-white overflow-hidden">
               <div className="p-8 bg-slate-50 border-b border-slate-100 flex items-center space-x-3">
                  <HardDrive size={16} className="text-slate-400" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Root Directory / Operational Vault</span>
               </div>
               <div className="p-0">
                  <div className="grid grid-cols-12 p-6 border-b border-slate-50 text-[9px] font-bold uppercase tracking-widest text-slate-300">
                     <div className="col-span-6 pl-4">Asset Name</div>
                     <div className="col-span-2">Capacity</div>
                     <div className="col-span-2">Department</div>
                     <div className="col-span-2 text-right pr-4">Timeline</div>
                  </div>
                  {files.map(file => (
                    <div key={file.id} className="grid grid-cols-12 p-6 border-b border-slate-50 hover:bg-slate-50/50 transition-colors cursor-pointer group">
                       <div className="col-span-6 pl-4 flex items-center space-x-4">
                          <div className={cn(
                            "p-2 rounded-none transition-colors",
                            file.type === 'PDF' ? "bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white" : "bg-emerald-50 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white"
                          )}>
                             {file.type === 'PDF' ? <FileText size={16} /> : <File size={16} />}
                          </div>
                          <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">{file.name}</span>
                       </div>
                       <div className="col-span-2 flex items-center text-[10px] font-bold text-slate-400">{file.size}</div>
                       <div className="col-span-2 flex items-center">
                          <Badge variant="outline" className="rounded-none border-slate-100 text-[8px] uppercase tracking-widest text-slate-300 font-bold px-3">{file.folder}</Badge>
                       </div>
                       <div className="col-span-2 flex flex-col items-end pr-4 justify-center">
                          <span className="text-[10px] font-bold text-slate-900">{file.updated}</span>
                          <div className="flex space-x-3 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button className="text-slate-300 hover:text-emerald-500"><Download size={12} /></button>
                             <button className="text-slate-300 hover:text-emerald-500"><Share2 size={12} /></button>
                             <button className="text-slate-300 hover:text-emerald-500"><MoreVertical size={12} /></button>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
