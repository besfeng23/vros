'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChevronRight, 
  LogOut, 
  TrendingUp, 
  LayoutDashboard, 
  Calendar, 
  Layers, 
  Store, 
  BarChart3, 
  MessageSquare, 
  Tag, 
  PackageCheck, 
  CreditCard, 
  Lock,
  Undo2, 
  ShieldCheck, 
  History 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { name: 'HQ Overview', href: '/admin/dashboard', icon: LayoutDashboard, roles: ['SuperAdmin', 'HQOperations'] },
  { name: 'Branch View', href: '/admin/branch', icon: Store, roles: ['SuperAdmin', 'BranchManager', 'Cashier', 'HQOperations'] },
  { name: 'Reports & Analytics', href: '/admin/reports', icon: BarChart3, roles: ['SuperAdmin', 'Finance', 'HQOperations'] },
  { name: 'Tasks & Handoffs', href: '/admin/tasks', icon: PackageCheck, roles: ['SuperAdmin', 'HQOperations', 'BranchManager', 'Cashier'] },
  { name: 'Appointments', href: '/admin/appointments', icon: Calendar, roles: ['SuperAdmin', 'HQOperations', 'BranchManager', 'Cashier'] },
  { name: 'Leads & CRM', href: '/admin/inquiries', icon: MessageSquare, roles: ['SuperAdmin', 'Marketing', 'HQOperations'] },
  { name: 'Operations Pipelines', href: '/admin/pipelines', icon: Layers, roles: ['SuperAdmin', 'HQOperations', 'BranchManager'] },
  { name: 'Services & Pricing', href: '/admin/services', icon: Tag, roles: ['SuperAdmin', 'Marketing', 'HQOperations'] },
  { name: 'Promotions', href: '/admin/promos', icon: Tag, roles: ['SuperAdmin', 'Marketing'] },
  { name: 'Package Tracker', href: '/admin/packages', icon: PackageCheck, roles: ['SuperAdmin', 'BranchManager', 'Cashier'] },
  { name: 'Operational Vault', href: '/admin/vault', icon: Lock, roles: ['SuperAdmin', 'HQOperations', 'Finance'] },
  { name: 'Payments', href: '/admin/payments', icon: CreditCard, roles: ['SuperAdmin', 'Finance', 'Cashier', 'HQOperations'] },
  { name: 'Executive Approvals', href: '/admin/approvals', icon: Undo2, roles: ['SuperAdmin', 'Finance'] },
  { name: 'Staff & Roles', href: '/admin/staff', icon: ShieldCheck, roles: ['SuperAdmin'] },
  { name: 'Audit Logs', href: '/admin/audit', icon: History, roles: ['SuperAdmin', 'HQOperations'] },
];

interface SidebarProps {
  userRole: string | null;
  onSignOut: () => void;
  className?: string;
}

export function Sidebar({ userRole, onSignOut, className }: SidebarProps) {
  const pathname = usePathname();

  const filteredNavItems = NAV_ITEMS.filter(item => {
    if (!userRole) return false;
    if (userRole === 'SuperAdmin') return true;
    return item.roles.includes(userRole);
  });

  return (
    <aside className={cn("bg-primary border-r border-primary/10 flex flex-col shrink-0 z-20", className)}>
      <div className="p-10">
        <Link href="/admin/dashboard" className="block space-y-2">
          <span className="font-headline text-2xl font-bold tracking-[0.3em] uppercase text-white block">
            Harmony
          </span>
          <div className="flex items-center space-x-2">
            <span className="h-[1px] w-4 bg-emerald-500" />
            <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-[0.4em] italic">OS</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-6 overflow-y-auto space-y-1 py-4 custom-scrollbar">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all group",
                isActive 
                  ? "bg-accent/10 text-accent border-l-2 border-accent" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <div className="flex items-center space-x-4">
                <Icon size={16} className={cn(isActive ? "text-accent" : "text-slate-500 group-hover:text-slate-300")} />
                <span>{item.name}</span>
              </div>
              {isActive && <ChevronRight size={12} />}
            </Link>
          );
        })}
      </nav>

      <div className="p-8 border-t border-white/5 space-y-4">
        <div className="bg-white/5 p-6 space-y-3">
          <div className="flex items-center space-x-2 text-accent">
            <TrendingUp size={14} />
            <span className="text-[9px] font-bold uppercase tracking-widest">Growth Pulse</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed font-bold italic">Network-wide stability: 99.9%</p>
        </div>
        <button
          onClick={onSignOut}
          className="w-full flex items-center space-x-4 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-red-400 transition-colors"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
