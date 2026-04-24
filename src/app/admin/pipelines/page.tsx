'use client';

import React, { useState } from 'react';
import { 
  MoreVertical, 
  Plus, 
  Search, 
  Filter, 
  ChevronRight, 
  Calendar, 
  User, 
  DollarSign,
  Clock
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const COLUMNS = [
  { id: 'lead', title: 'New Leads', color: 'bg-slate-200' },
  { id: 'discovery', title: 'Discovery', color: 'bg-emerald-200' },
  { id: 'negotiation', title: 'Negotiation', color: 'bg-emerald-400' },
  { id: 'fulfillment', title: 'Fulfillment', color: 'bg-emerald-600' },
  { id: 'closed', title: 'Operationalized', color: 'bg-slate-900' },
];

const MOCK_DEALS = [
  { id: 'd1', title: 'Enterprise Hub Setup', client: 'Acme Corp', value: '₱450k', stage: 'negotiation', owner: 'Joven', priority: 'High' },
  { id: 'd2', title: 'Branch Network License', client: 'Global Retail', value: '₱1.2M', stage: 'lead', owner: 'Patty', priority: 'High' },
  { id: 'd3', title: 'Custom CRM Integration', client: 'Medical Group', value: '₱280k', stage: 'fulfillment', owner: 'Admin', priority: 'Medium' },
  { id: 'd4', title: 'HQ Security Audit', client: 'Internal', value: '₱0', stage: 'discovery', owner: 'Patty', priority: 'Low' },
  { id: 'd5', title: 'Universal Cloud Sync', client: 'BGC Hub', value: '₱150k', stage: 'lead', owner: 'Joven', priority: 'Medium' },
];

export default function PipelinesPage() {
  const [deals, setDeals] = useState(MOCK_DEALS);

  return (
    <div className="space-y-10 pb-20">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-4xl font-headline tracking-tight text-slate-900">Operations Pipeline</h1>
          <p className="text-slate-500 text-[10px] tracking-[0.3em] uppercase font-bold">Global Deal Flow & Execution Tracker</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              placeholder="Search Deals..." 
              className="pl-10 h-10 w-64 border border-slate-100 bg-white text-[10px] font-bold uppercase tracking-widest focus:ring-emerald-500 focus:outline-none"
            />
          </div>
          <Button className="h-10 px-6 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest transition-all">
            <Plus size={14} className="mr-2" />
            New Deal
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex space-x-6 overflow-x-auto pb-12 custom-scrollbar min-h-[700px]">
        {COLUMNS.map((column) => (
          <div key={column.id} className="w-80 shrink-0 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b-2 border-slate-100">
               <div className="flex items-center space-x-3">
                  <div className={cn("w-2 h-2 rounded-full", column.color)} />
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{column.title}</h3>
                  <Badge variant="outline" className="text-[8px] px-2 py-0 border-slate-100 text-slate-300 rounded-none">
                    {deals.filter(d => d.stage === column.id).length}
                  </Badge>
               </div>
               <button className="text-slate-300 hover:text-slate-600">
                  <MoreVertical size={14} />
               </button>
            </div>

            <div className="space-y-4">
              {deals.filter(d => d.stage === column.id).map(deal => (
                <Card key={deal.id} className="border-none shadow-sm rounded-none bg-white p-6 group hover:shadow-md transition-all cursor-grab active:cursor-grabbing border-l-2 border-transparent hover:border-emerald-500">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                       <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-500 transition-colors leading-tight">{deal.title}</h4>
                       <Badge variant="outline" className={cn(
                         "text-[7px] uppercase font-bold tracking-widest border-slate-100",
                         deal.priority === 'High' ? "text-red-500 bg-red-50/50" : "text-slate-400"
                       )}>
                         {deal.priority}
                       </Badge>
                    </div>

                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center space-x-2">
                       <User size={10} />
                       <span>{deal.client}</span>
                    </p>

                    <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                       <div className="flex items-center space-x-1 text-slate-900 font-bold text-[10px]">
                          <DollarSign size={10} className="text-emerald-500" />
                          <span>{deal.value}</span>
                       </div>
                       <div className="flex items-center space-x-3">
                          <div className="flex -space-x-2">
                             <div className="h-6 w-6 rounded-none bg-slate-900 flex items-center justify-center text-[8px] text-white font-bold border border-white">
                                {deal.owner[0]}
                             </div>
                          </div>
                          <Clock size={12} className="text-slate-200" />
                       </div>
                    </div>
                  </div>
                </Card>
              ))}
              
              <button className="w-full py-4 border-2 border-dashed border-slate-50 text-slate-300 hover:border-emerald-200 hover:text-emerald-400 text-[9px] uppercase font-bold tracking-widest transition-all">
                + Add Card
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
