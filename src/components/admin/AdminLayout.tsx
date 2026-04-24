"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useUser, useFirebase } from '@/firebase/provider';
import { Breadcrumbs } from './Breadcrumbs';
import { Sidebar } from './Sidebar';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, userRole, auth } = useFirebase();
  const router = useRouter();

  const handleSignOut = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/login');
    }
  };

  return (
    <ProtectedRoute allowedRoles={['SuperAdmin', 'Executive', 'Operations', 'Finance', 'DepartmentHead', 'TalentManager', 'ClientServicing', 'FieldRunner']} redirectPath="/admin">
      <div className="flex h-screen bg-[#FDFCF9] overflow-hidden font-body text-slate-900">
        {/* Desktop Sidebar */}
        <Sidebar 
          userRole={userRole} 
          onSignOut={handleSignOut} 
          className="hidden lg:flex w-72" 
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-20 lg:h-24 bg-white border-b border-slate-100 flex items-center justify-between px-6 lg:px-12 shrink-0">
            <div className="flex items-center space-x-4 lg:space-x-8">
              {/* Mobile Menu Trigger */}
              <Sheet>
                <SheetTrigger asChild>
                  <button className="lg:hidden p-2 hover:bg-slate-50 transition-colors text-slate-400">
                    <Menu size={20} />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-72 border-none">
                  <Sidebar userRole={userRole} onSignOut={handleSignOut} className="h-full w-full" />
                </SheetContent>
              </Sheet>

              <div className="relative w-[200px] lg:w-[400px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                <Input 
                  placeholder="Universal Search..." 
                  className="pl-12 h-10 lg:h-12 border-none focus-visible:ring-0 bg-slate-50/50 rounded-none text-[10px] font-bold placeholder:text-slate-300 uppercase tracking-widest"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4 lg:space-x-10">
              <button className="relative text-slate-300 hover:text-primary transition-colors hidden sm:block">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full" />
              </button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-3 lg:space-x-6 lg:pl-10 lg:border-l lg:border-slate-100 hover:bg-slate-50/50 transition-colors outline-none h-full px-2 lg:px-4">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] leading-tight">{user?.displayName || 'Harmony Admin'}</p>
                      <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-[0.2em] leading-tight mt-1">{userRole || 'Staff'}</p>
                    </div>
                    <Avatar className="h-8 w-8 lg:h-10 lg:w-10 border-2 border-slate-50 ring-2 ring-slate-50 shadow-sm">
                      {user?.photoURL ? (
                        <AvatarImage src={user.photoURL} />
                      ) : (
                        <AvatarFallback className="bg-emerald-500 text-white font-headline text-[10px]">
                          {(user?.displayName || 'HA').split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-none border-slate-100 shadow-xl p-2">
                  <DropdownMenuLabel className="text-[10px] uppercase tracking-widest font-bold text-slate-400 p-4">Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="p-4 cursor-pointer focus:bg-emerald-50/50">
                    <Link href="/admin/profile" className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest">
                      <User size={14} className="text-slate-400" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="p-4 cursor-pointer focus:bg-emerald-50/50">
                    <Link href="/admin/settings" className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest">
                      <Settings size={14} className="text-slate-400" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    className="p-4 cursor-pointer focus:bg-red-50 text-red-600 flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest"
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6 lg:p-16">
            <div className="max-w-[1500px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <Breadcrumbs />
              {children}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

