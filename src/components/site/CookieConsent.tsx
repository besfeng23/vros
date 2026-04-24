'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('harmony-os-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('harmony-os-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-8 right-8 z-[100] md:left-auto md:w-[400px] animate-fade-in-up">
      <div className="bg-[#050505] border border-white/10 p-8 shadow-2xl space-y-6">
        <div className="flex items-center space-x-3 text-emerald-500">
          <Shield size={20} />
          <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Data Sovereignty</p>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed font-light">
          We utilize secure cookies to orchestrate your operational environment and ensure transaction integrity. Continued usage implies consent.
        </p>
        <Button 
          onClick={accept}
          className="w-full rounded-none bg-emerald-600 text-white hover:bg-emerald-500 text-[10px] font-bold uppercase tracking-widest h-12"
        >
          Acknowledge Protocol
        </Button>
      </div>
    </div>
  );
}
