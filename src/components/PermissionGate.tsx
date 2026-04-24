'use client';

import React from 'react';
import { useUser } from '@/firebase/provider';
import { UserRole } from '@/lib/types';

interface PermissionGateProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallback?: React.ReactNode;
}

/**
 * PermissionGate
 * 
 * A wrapper component that conditionally renders children based on the user's role.
 * Useful for hiding buttons, forms, or entire sections that a user shouldn't see.
 */
export function PermissionGate({ 
  children, 
  allowedRoles, 
  fallback = null 
}: PermissionGateProps) {
  const { userRole } = useUser();

  if (!userRole) return fallback;

  // SuperAdmin has unconditional access to everything
  if (userRole === 'SuperAdmin') return <>{children}</>;

  const hasPermission = allowedRoles.includes(userRole as UserRole);

  if (!hasPermission) return fallback;

  return <>{children}</>;
}
