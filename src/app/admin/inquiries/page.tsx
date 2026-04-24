
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  MessageSquare, 
  AlertCircle, 
  Smile, 
  Minus, 
  Filter, 
  Search, 
  ChevronRight, 
  History,
  Send,
  MoreVertical,
  Phone,
  Mail,
  UserCheck
} from 'lucide-react';
import { summarizeInquiry, AdminInquirySummarizerOutput } from '@/ai/flows/admin-inquiry-summarizer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  collection, 
  query, 
  onSnapshot, 
  orderBy, 
  updateDoc, 
  doc 
} from 'firebase/firestore';
import { useFirebase } from '@/firebase/provider';
import { LoadingState, EmptyState } from '@/components/ui/status-states';

export default function CRMPage() {
  const { firestore } = useFirebase();
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [summaries, setSummaries] = useState<Record<string, AdminInquirySummarizerOutput>>({});
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!firestore) return;

    const q = query(collection(firestore, 'inquiries'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setInquiries(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firestore]);

  const handleSummarize = async (id: string, text: string) => {
    setLoadingIds(prev => new Set(prev).add(id));
    try {
      const result = await summarizeInquiry({ inquiryText: text });
      setSummaries(prev => ({ ...prev, [id]: result }));
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setLoadingIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const updateStatus = async (id: string, status: string) => {
    if (!firestore) return;
    await updateDoc(doc(firestore, 'inquiries', id), { status });
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <Smile className="text-emerald-500" size={16} />;
      case 'negative': return <AlertCircle className="text-red-500" size={16} />;
      case 'urgent': return <AlertCircle className="text-amber-500 animate-pulse" size={16} />;
      default: return <Minus className="text-slate-400" size={16} />;
    }
  };

  if (loading) return <LoadingState message="Synchronizing Lead Database..." />;

  return (
    <div className="space-y-10 pb-20">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-4xl font-headline tracking-tight text-slate-900 text-left">Internal CRM</h1>
          <p className="text-slate-500 text-[10px] tracking-[0.3em] uppercase font-bold text-left">Enterprise Lead Intelligence & Portfolio</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="h-12 px-6 rounded-none border-slate-200 text-[10px] uppercase font-bold tracking-widest text-slate-500">
            <Filter size={14} className="mr-2" />
            Segment Filters
          </Button>
          <Button className="h-12 px-8 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest transition-all">
            Export CRM Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active" className="w-full space-y-8">
        <TabsList className="bg-transparent border-b border-slate-100 w-full justify-start h-auto p-0 rounded-none space-x-12">
          <TabsTrigger value="active" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent text-[10px] uppercase font-bold tracking-[0.2em] py-4 px-0 transition-all text-slate-400 data-[state=active]:text-slate-900">
            Active Leads ({inquiries.filter(i => i.status !== 'archived').length})
          </TabsTrigger>
          <TabsTrigger value="archived" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent text-[10px] uppercase font-bold tracking-[0.2em] py-4 px-0 transition-all text-slate-400 data-[state=active]:text-slate-900">
            Archived Vault
          </TabsTrigger>
          <TabsTrigger value="intelligence" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent text-[10px] uppercase font-bold tracking-[0.2em] py-4 px-0 transition-all text-slate-400 data-[state=active]:text-slate-900 text-emerald-500/50">
            AI Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {inquiries.length > 0 ? inquiries.filter(i => i.status !== 'archived').map((inq) => (
            <Card key={inq.id} className="border-none shadow-sm overflow-hidden bg-white rounded-none group hover:shadow-md transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[220px]">
                {/* Contact Data */}
                <div className="lg:col-span-5 p-10 border-r border-slate-50 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                           <h3 className="text-xl font-headline text-slate-900">{inq.name}</h3>
                           {inq.status === 'urgent' && <Badge variant="destructive" className="text-[7px] uppercase font-bold tracking-widest bg-red-500 rounded-none h-4">Priority</Badge>}
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Modified {inq.createdAt ? 'Recently' : 'Date Missing'}</p>
                      </div>
                      <Badge variant="outline" className="text-[8px] uppercase tracking-widest border-slate-100 text-slate-500 rounded-none px-3">
                        Lead ID: {inq.id.slice(-4).toUpperCase()}
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-8">
                       <a href={`tel:${inq.phone}`} className="flex items-center space-x-2 text-slate-400 hover:text-emerald-500 transition-colors">
                          <Phone size={14} />
                          <span className="text-[10px] font-bold uppercase tracking-widest">{inq.phone || 'NO PHONE'}</span>
                       </a>
                       <a href={`mailto:${inq.email}`} className="flex items-center space-x-2 text-slate-400 hover:text-emerald-500 transition-colors">
                          <Mail size={14} />
                          <span className="text-[10px] font-bold uppercase tracking-widest">{inq.email}</span>
                       </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 pt-6 border-t border-slate-50">
                     <Button size="sm" variant="outline" className="h-10 text-[9px] uppercase font-bold tracking-widest rounded-none border-slate-100 hover:bg-emerald-50 hover:text-emerald-600">
                        <Send size={12} className="mr-2" />
                        Log Call
                     </Button>
                     <Button size="sm" variant="outline" className="h-10 text-[9px] uppercase font-bold tracking-widest rounded-none border-slate-100 hover:bg-emerald-50 hover:text-emerald-600">
                        <History size={12} className="mr-2" />
                        History
                     </Button>
                     <Button 
                       onClick={() => updateStatus(inq.id, 'archived')}
                       size="sm" 
                       variant="ghost" 
                       className="h-10 text-[9px] uppercase font-bold tracking-widest rounded-none text-slate-300 hover:text-red-400"
                     >
                        Archive
                     </Button>
                  </div>
                </div>

                {/* Content & Message */}
                <div className="lg:col-span-4 p-10 flex flex-col space-y-4">
                   <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Operational Inquiry</p>
                   <div className="flex-1 bg-slate-50/50 p-6 rounded-none relative">
                      <div className="absolute top-0 left-0 w-[2px] h-full bg-emerald-500/20" />
                      <p className="text-xs text-slate-600 leading-relaxed italic">"{inq.message}"</p>
                   </div>
                   {!summaries[inq.id] && (
                    <Button 
                      onClick={() => handleSummarize(inq.id, inq.message)}
                      disabled={loadingIds.has(inq.id)}
                      className="w-fit h-10 px-6 rounded-none bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all text-[9px] font-bold uppercase tracking-widest"
                    >
                      <Sparkles size={14} className="mr-2" />
                      {loadingIds.has(inq.id) ? 'Analysis in Progress...' : 'Perform Executive Analysis'}
                    </Button>
                  )}
                </div>

                {/* AI Intelligence Panel */}
                <div className="lg:col-span-3 p-10 bg-slate-50 flex flex-col justify-center">
                   {summaries[inq.id] ? (
                     <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                             {getSentimentIcon(summaries[inq.id].sentiment)}
                             <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Sentiment Score</span>
                          </div>
                          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none rounded-none text-[8px] uppercase tracking-tighter">
                            {summaries[inq.id].sentiment}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                           <p className="text-[9px] font-bold uppercase text-slate-400">Executive Summary</p>
                           <p className="text-xs text-slate-800 leading-tight font-medium">{summaries[inq.id].summary}</p>
                        </div>

                        <div className="space-y-1">
                           <p className="text-[9px] font-bold uppercase text-emerald-600">Next Strategic Move</p>
                           <p className="text-[10px] text-slate-500 leading-tight italic">{summaries[inq.id].recommendedAction}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {summaries[inq.id].keywords.map(k => (
                            <span key={k} className="text-[8px] bg-white border border-slate-200 px-2 py-1 text-slate-400 uppercase tracking-widest font-bold">{k}</span>
                          ))}
                        </div>
                     </div>
                   ) : (
                     <div className="flex flex-col items-center justify-center text-slate-300 py-12 space-y-4">
                        <UserCheck size={32} className="opacity-20" />
                        <div className="text-center">
                           <p className="text-[10px] uppercase tracking-widest font-bold">Waiting for</p>
                           <p className="text-[10px] uppercase tracking-widest font-bold">Data Analysis</p>
                        </div>
                     </div>
                   )}
                </div>
              </div>
            </Card>
          )) : (
            <EmptyState 
              title="No Active Leads" 
              description="Your CRM database is currently empty. New inquiries will appear here automatically." 
            />
          )}
        </TabsContent>

        <TabsContent value="archived">
           <EmptyState 
             title="Archives Empty" 
             description="Archived leads and historical records will be stored in this vault for compliance." 
             icon={History}
           />
        </TabsContent>

        <TabsContent value="intelligence">
           <div className="p-20 border border-dashed border-slate-200 text-center space-y-6">
              <div className="inline-block p-6 bg-slate-50 rounded-full text-slate-300">
                 <Sparkles size={48} />
              </div>
              <div className="space-y-1">
                 <h3 className="text-xl font-headline">Enterprise Intelligence Suite</h3>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Global lead analytics and conversion forecasting coming soon.</p>
              </div>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

