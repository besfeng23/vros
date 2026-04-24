
'use client';

import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, CreditCard, Landmark, QrCode } from 'lucide-react';
import Image from 'next/image';

export default function CheckoutPage() {
  const { sessionId } = useParams();
  const router = useRouter();

  const handleSimulatePayment = () => {
    router.push('/checkout/status?status=success');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-body">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-headline tracking-widest uppercase">Harmony <span className="text-emerald-500">Secure</span></h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Premium Operations Experience</p>
        </div>

        <Card className="border-none shadow-xl rounded-none bg-white">
          <CardHeader className="p-8 border-b border-slate-50">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-sm uppercase tracking-widest font-bold">Checkout Summary</CardTitle>
                <CardDescription className="text-xs italic">Session: {sessionId}</CardDescription>
              </div>
              <p className="text-2xl font-headline">₱1,500.00</p>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Method</p>
              
              <div className="grid grid-cols-1 gap-4">
                <button 
                  onClick={handleSimulatePayment}
                  className="flex items-center justify-between p-4 border border-slate-100 hover:border-accent hover:bg-slate-50 transition-all group text-left"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-emerald-50 text-emerald-600">
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider">SpeedyPay Wallet</p>
                      <p className="text-[10px] text-slate-400">Instant processing & zero fees</p>
                    </div>
                  </div>
                  <ShieldCheck size={16} className="text-slate-200 group-hover:text-accent" />
                </button>

                <button 
                  onClick={handleSimulatePayment}
                  className="flex items-center justify-between p-4 border border-slate-100 hover:border-accent hover:bg-slate-50 transition-all group text-left"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-orange-50 text-orange-600">
                      <QrCode size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider">eMango QR</p>
                      <p className="text-[10px] text-slate-400">Scan to pay via mobile app</p>
                    </div>
                  </div>
                  <ShieldCheck size={16} className="text-slate-200 group-hover:text-accent" />
                </button>

                <button 
                  className="flex items-center justify-between p-4 border border-slate-100 opacity-50 cursor-not-allowed text-left"
                  disabled
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-slate-50 text-slate-400">
                      <Landmark size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider">Direct Bank</p>
                      <p className="text-[10px] text-slate-400">Currently unavailable</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-50 flex items-center justify-center space-x-2 text-slate-300">
              <ShieldCheck size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest italic">256-bit Secure Encryption</span>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button variant="link" onClick={() => router.back()} className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Cancel and Return
          </Button>
        </div>
      </div>
    </div>
  );
}
