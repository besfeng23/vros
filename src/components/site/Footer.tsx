
import Link from 'next/link';
import { Facebook, Instagram, Mail, Phone, MapPin, Shield, Globe, Terminal } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#050505] text-white py-20 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-16">
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-headline text-3xl font-semibold tracking-widest uppercase">
                Harmony <span className="text-emerald-500">OS</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-light">
              Premium enterprise operations platform orchestrating global initiatives across Underground, Entertainment, Corporate, and 88 Department sectors.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="p-2 border border-white/10 hover:border-emerald-500 hover:text-emerald-500 transition-all">
                <Terminal size={18} />
              </Link>
              <Link href="#" className="p-2 border border-white/10 hover:border-emerald-500 hover:text-emerald-500 transition-all">
                <Globe size={18} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-headline text-[10px] uppercase tracking-[0.4em] font-bold text-slate-500 mb-8">Ecosystem</h4>
            <ul className="space-y-4 text-[10px] uppercase tracking-widest font-bold text-slate-700">
              <li><Link href="/services" className="hover:text-emerald-500 transition-colors">Project Manifest</Link></li>
              <li><Link href="/branches" className="hover:text-emerald-500 transition-colors">Global Divisions</Link></li>
              <li><Link href="/about" className="hover:text-emerald-500 transition-colors">Operational Logic</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline text-[10px] uppercase tracking-[0.4em] font-bold text-slate-500 mb-8">Access</h4>
            <ul className="space-y-4 text-[10px] uppercase tracking-widest font-bold text-slate-700">
              <li><Link href="/book" className="hover:text-emerald-500 transition-colors">Secure Request</Link></li>
              <li><Link href="/admin/login" className="hover:text-emerald-500 transition-colors">Console Entry</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-500 transition-colors">Data Sovereignty</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline text-[10px] uppercase tracking-[0.4em] font-bold text-slate-500 mb-8">Intelligence</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest mb-1 text-slate-600">
                <Shield size={16} className="text-emerald-500" />
                <span>Encrypted Communications</span>
              </li>
              <li className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                <Mail size={16} className="text-emerald-500" />
                <span>concierge@harmony-os.net</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-[8px] font-bold uppercase tracking-[0.4em] text-slate-800 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} Harmony OS Strategic Ops. All rights reserved.</p>
          <p className="tracking-[0.8em]">Precision. Discretion. Integrity.</p>
        </div>
      </div>
    </footer>
  );
}
