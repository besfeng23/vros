
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

import { Suspense } from 'react';

function PaymentStatusContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const type = searchParams.get('type') || 'transaction';
  const isSuccess = status === 'success';

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-body text-slate-50">
      <Card className="w-full max-w-md border border-slate-800 shadow-2xl rounded-xl bg-slate-900 overflow-hidden">
        <div className={`h-1 ${isSuccess ? 'bg-emerald-500' : 'bg-red-500'}`} />
        <CardContent className="p-12 text-center space-y-8">
          <div className="flex justify-center">
            <div className={`p-6 rounded-full ${isSuccess ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
              {isSuccess ? <CheckCircle2 size={48} /> : <XCircle size={48} />}
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-headline leading-tight tracking-tight">
              {isSuccess ? 'Payment Confirmed' : 'Transaction Failed'}
            </h1>
            <p className="text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
              {isSuccess 
                ? `Your ${type} has been successfully processed. We have sent a digital receipt to your registered email.`
                : 'Something went wrong while processing your request. Please check your balance or try a different method.'
              }
            </p>
          </div>

          {isSuccess ? (
            <div className="bg-slate-950/50 border border-slate-800 p-6 space-y-4 rounded-lg">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                <span className="text-slate-500">Status</span>
                <span className="text-emerald-500">Succeeded</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                <span className="text-slate-500">Method</span>
                <span className="text-slate-300">Harmony Wallet</span>
              </div>
              <div className="h-[1px] bg-slate-800" />
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                <span className="text-slate-300">Amount Paid</span>
                <span className="text-lg font-headline text-slate-50">₱1,500.00</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4 pt-4">
              <Button className="w-full rounded-lg h-12 bg-slate-50 text-slate-950 hover:bg-slate-200 tracking-widest uppercase text-xs font-bold">
                Retry Payment
              </Button>
            </div>
          )}

          <div className="pt-8 text-center">
            <Button asChild variant="link" className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-300">
              <Link href="/" className="inline-flex items-center">Return to Homepage <ArrowRight size={12} className="ml-2" /></Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PaymentStatusPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-500">Loading status...</div>}>
      <PaymentStatusContent />
    </Suspense>
  );
}
