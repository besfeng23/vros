'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('ortiz-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('ortiz-cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-8 right-8 z-[100] md:left-auto md:w-[400px] animate-fade-in-up">
      <div className="bg-white border border-slate-200 p-8 shadow-2xl space-y-6">
        <div className="flex items-center space-x-3 text-accent">
          <Shield size={20} />
          <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Privacy & Trust</p>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          We use cookies to enhance your premium experience and ensure secure transactions on our platform. By continuing, you agree to our <a href="/privacy" className="underline hover:text-accent">Privacy Policy</a>.
        </p>
        <Button 
          onClick={accept}
          className="w-full rounded-none bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest h-12"
        >
          Acknowledge & Accept
        </Button>
      </div>
    </div>
  );
}
