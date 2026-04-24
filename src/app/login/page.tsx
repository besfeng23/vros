'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth';
import { useFirebase } from '@/firebase/provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertCircle, Lock, Mail, Chrome } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { auth } = useFirebase();
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;

    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!auth) return;
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 font-body">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-block p-4 bg-emerald-500/10 rounded-2xl mb-4">
            <span className="font-headline text-3xl font-bold tracking-[0.3em] uppercase text-white block">
              Harmony
            </span>
          </div>
          <div className="flex items-center justify-center space-x-3">
             <span className="h-[1px] w-8 bg-emerald-500/50" />
             <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-[0.5em] italic">Operations OS</span>
             <span className="h-[1px] w-8 bg-emerald-500/50" />
          </div>
        </div>

        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="space-y-1 pt-12 pb-8 px-10">
            <CardTitle className="text-2xl font-headline text-white text-center">Executive Access</CardTitle>
            <CardDescription className="text-slate-500 text-center text-[10px] uppercase tracking-widest font-bold">
              Secure authentication required
            </CardDescription>
          </CardHeader>
          <CardContent className="px-10 pb-12 space-y-8">
            {error && (
              <Alert variant="destructive" className="bg-red-950/20 border-red-900/30 rounded-xl">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs font-bold uppercase tracking-wide">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleEmailLogin} className="space-y-6">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <Input 
                    type="email" 
                    placeholder="ADMIN@HARMONY-OS.APP" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-slate-950/50 border-slate-800 text-white pl-12 h-14 rounded-xl focus:ring-emerald-500/20 text-[10px] font-bold uppercase tracking-widest placeholder:text-slate-700"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <Input 
                    type="password" 
                    placeholder="••••••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-slate-950/50 border-slate-800 text-white pl-12 h-14 rounded-xl focus:ring-emerald-500/20 text-[10px] font-bold uppercase tracking-widest placeholder:text-slate-700"
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-[0.2em] text-[10px] rounded-xl transition-all shadow-lg shadow-emerald-900/20"
              >
                {loading ? 'Authenticating...' : 'Sign In To OS'}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-800" />
              </div>
              <div className="relative flex justify-center text-[8px] uppercase tracking-widest font-bold">
                <span className="bg-slate-900 px-4 text-slate-600">Enterprise SSO</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              type="button"
              disabled={loading}
              onClick={handleGoogleLogin}
              className="w-full h-14 border-slate-800 bg-transparent hover:bg-slate-800 text-slate-300 font-bold uppercase tracking-[0.2em] text-[10px] rounded-xl space-x-3 transition-all"
            >
              <Chrome size={16} />
              <span>Continue with Google</span>
            </Button>
          </CardContent>
        </Card>

        <p className="text-center text-slate-600 text-[9px] font-bold uppercase tracking-widest leading-relaxed">
          Authorized personnel only. All access is logged and audited.<br />
          &copy; 2026 Harmony Operational Systems
        </p>
      </div>
    </div>
  );
}
