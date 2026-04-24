'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(p => p);

  // Don't show on root admin dashboard if you prefer, but usually helpful
  if (paths.length === 0) return null;

  return (
    <nav className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-8 animate-in fade-in slide-in-from-left-4 duration-700">
      <Link href="/admin/dashboard" className="hover:text-emerald-500 transition-colors flex items-center space-x-2">
        <Home size={12} />
        <span>HQ</span>
      </Link>
      
      {paths.slice(1).map((path, index) => {
        const href = `/${paths.slice(0, index + 2).join('/')}`;
        const isLast = index === paths.length - 2;
        const name = path.replace(/-/g, ' ');

        return (
          <div key={path} className="flex items-center space-x-2">
            <ChevronRight size={10} className="text-slate-300" />
            {isLast ? (
              <span className="text-slate-900">{name}</span>
            ) : (
              <Link href={href} className="hover:text-emerald-500 transition-colors">
                {name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
