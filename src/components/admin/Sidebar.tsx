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
  { group: 'Management', items: [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, roles: ['SuperAdmin', 'Executive', 'Operations'] },
    { name: 'CRM', href: '/admin/crm', icon: Users, roles: ['SuperAdmin', 'Executive', 'Operations', 'ClientServicing'] },
    { name: 'Organizations', href: '/admin/organizations', icon: Store, roles: ['SuperAdmin', 'Executive', 'DepartmentHead'] },
    { name: 'Pipelines', href: '/admin/pipelines', icon: Layers, roles: ['SuperAdmin', 'Executive', 'Operations'] },
  ]},
  { group: 'Operations', items: [
    { name: 'Tasks', href: '/admin/tasks', icon: PackageCheck, roles: ['SuperAdmin', 'Executive', 'Operations', 'DepartmentHead', 'FieldRunner'] },
    { name: 'Calendar', href: '/admin/calendar', icon: Calendar, roles: ['SuperAdmin', 'Executive', 'Operations', 'DepartmentHead'] },
    { name: 'Vault', href: '/admin/vault', icon: Lock, roles: ['SuperAdmin', 'Executive', 'Operations', 'DepartmentHead'] },
  ]},
  { group: 'Finance & Control', items: [
    { name: 'Finance', href: '/admin/finance', icon: CreditCard, roles: ['SuperAdmin', 'Executive', 'Finance'] },
    { name: 'Approvals', href: '/admin/approvals', icon: ShieldCheck, roles: ['SuperAdmin', 'Executive'] },
  ]},
  { group: 'Intelligence', items: [
    { name: 'Activity', href: '/admin/activity', icon: History, roles: ['SuperAdmin', 'Executive', 'Operations'] },
    { name: 'Reports', href: '/admin/reports', icon: BarChart3, roles: ['SuperAdmin', 'Executive', 'Operations'] },
  ]},
  { group: 'Administration', items: [
    { name: 'Users', href: '/admin/users', icon: User, roles: ['SuperAdmin', 'Executive'] },
    { name: 'Audit', href: '/admin/audit', icon: History, roles: ['SuperAdmin', 'Executive'] },
    { name: 'Settings', href: '/admin/settings', icon: Settings, roles: ['SuperAdmin', 'Executive'] },
  ]},
];

import { Users, Settings, User } from 'lucide-react';

interface SidebarProps {
  userRole: string | null;
  onSignOut: () => void;
  className?: string;
}

export function Sidebar({ userRole, onSignOut, className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn("bg-slate-950 border-r border-white/5 flex flex-col shrink-0 z-20", className)}>
      <div className="p-12 pb-8">
        <Link href="/admin/dashboard" className="block space-y-3">
          <span className="font-headline text-2xl font-bold tracking-[0.5em] uppercase text-white block">
            Harmony
          </span>
          <div className="flex items-center space-x-3">
            <span className="h-[2px] w-8 bg-emerald-500" />
            <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-[0.5em]">OS</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-8 overflow-y-auto space-y-12 py-8 custom-scrollbar">
        {NAV_ITEMS.map((group) => {
          const filteredItems = group.items.filter(item => {
             if (!userRole) return false;
             if (userRole === 'SuperAdmin') return true;
             return item.roles.includes(userRole);
          });

          if (filteredItems.length === 0) return null;

          return (
            <div key={group.group} className="space-y-4">
              <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600 px-4">
                {group.group}
              </h3>
              <div className="space-y-1">
                {filteredItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-4 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300",
                        isActive 
                          ? "bg-white/5 text-emerald-500 shadow-[inset_2px_0_0_0_#10b981]" 
                          : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]"
                      )}
                    >
                      <Icon size={14} className={cn(isActive ? "text-emerald-500" : "text-slate-700")} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      <div className="p-8 border-t border-white/5">
        <button
          onClick={onSignOut}
          className="w-full flex items-center space-x-4 px-4 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 hover:text-red-400 hover:bg-red-500/5 transition-all duration-300 group"
        >
          <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
          <span>Terminate Session</span>
        </button>
      </div>
    </aside>
  );
}
