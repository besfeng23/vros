'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/firebase/provider';
import { UserRole } from '@/lib/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  redirectPath?: string;
}

export function ProtectedRoute({ 
  children, 
  allowedRoles, 
  redirectPath = '/login' 
}: ProtectedRouteProps) {
  const { user, userRole, isUserLoading, isRoleLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If auth is finished and no user, redirect
    if (!isUserLoading && !user) {
      router.push(redirectPath);
      return;
    }

    // If role is finished and not allowed, redirect
    if (!isUserLoading && !isRoleLoading && user && allowedRoles && userRole) {
      if (!allowedRoles.includes(userRole) && userRole !== 'SuperAdmin') {
        router.push('/'); // Redirect to home if not authorized
      }
    }
  }, [user, userRole, isUserLoading, isRoleLoading, router, allowedRoles, redirectPath]);

  // Show loading state while checking auth or role
  if (isUserLoading || (user && isRoleLoading)) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mx-auto"></div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 italic">Authenticating...</p>
        </div>
      </div>
    );
  }

  // If we have a user and (no roles required OR role is allowed)
  const isAuthorized = !allowedRoles || (userRole === 'SuperAdmin') || (userRole && allowedRoles.includes(userRole));

  if (user && isAuthorized) {
    return <>{children}</>;
  }

  // Fallback (should be handled by useEffect redirect)
  return null;
}
