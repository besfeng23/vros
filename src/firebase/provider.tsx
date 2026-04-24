'use client';

import React, { DependencyList, createContext, useContext, ReactNode, useMemo, useState, useEffect } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Auth, User, onAuthStateChanged } from 'firebase/auth';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener'
import { doc, getDoc } from 'firebase/firestore';
import { StaffMember, UserRole } from '@/lib/types';

interface FirebaseProviderProps {
  children: ReactNode;
  firebaseApp: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
}

// Internal state for user authentication and role
interface UserAuthState {
  user: User | null;
  isUserLoading: boolean; // Renamed to accurately reflect auth-only loading if needed, or keep for overall auth
  userError: Error | null;
  staffMember: StaffMember | null;
  userRole: UserRole | null;
  isRoleLoading: boolean;
}

// Combined state for the Firebase context
export interface FirebaseContextState {
  areServicesAvailable: boolean; 
  firebaseApp: FirebaseApp | null;
  firestore: Firestore | null;
  auth: Auth | null; 
  // User authentication state
  user: User | null;
  staffMember: StaffMember | null;
  userRole: UserRole | null;
  isUserLoading: boolean; 
  isRoleLoading: boolean;
  userError: Error | null; 
}

// Return type for useFirebase()
export interface FirebaseServicesAndUser {
  firebaseApp: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
  user: User | null;
  staffMember: StaffMember | null;
  userRole: UserRole | null;
  isUserLoading: boolean;
  isRoleLoading: boolean;
  userError: Error | null;
}

// Return type for useUser()
export interface UserHookResult { 
  user: User | null;
  staffMember: StaffMember | null;
  userRole: UserRole | null;
  isUserLoading: boolean;
  isRoleLoading: boolean;
  userError: Error | null;
}

// React Context
export const FirebaseContext = createContext<FirebaseContextState | undefined>(undefined);

/**
 * FirebaseProvider manages and provides Firebase services and user authentication state.
 */
export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
  firebaseApp,
  firestore,
  auth,
}) => {
  const [userAuthState, setUserAuthState] = useState<UserAuthState>({
    user: null,
    isUserLoading: true,
    userError: null,
    staffMember: null,
    userRole: null,
    isRoleLoading: false,
  });

  // Effect to subscribe to Firebase auth state changes
  useEffect(() => {
    if (!auth) {
      setUserAuthState(prev => ({ ...prev, isUserLoading: false, userError: new Error("Auth service not provided.") }));
      return;
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        setUserAuthState(prev => ({ 
          ...prev, 
          user: firebaseUser, 
          isUserLoading: false, 
          userError: null,
          isRoleLoading: !!firebaseUser // Trigger role load if user exists
        }));
      },
      (error) => {
        console.error("FirebaseProvider: onAuthStateChanged error:", error);
        setUserAuthState(prev => ({ ...prev, user: null, isUserLoading: false, userError: error }));
      }
    );
    return () => unsubscribe();
  }, [auth]);

  // Effect to fetch user role when auth state changes
  useEffect(() => {
    const fetchUserRole = async () => {
      if (!userAuthState.user || !firestore) {
        setUserAuthState(prev => ({ ...prev, staffMember: null, userRole: 'Patient', isRoleLoading: false }));
        return;
      }

      try {
        const staffDocRef = doc(firestore, 'staffMembers', userAuthState.user.uid);
        const staffDocSnap = await getDoc(staffDocRef);

        if (staffDocSnap.exists()) {
          const staffData = staffDocSnap.data() as StaffMember;
          setUserAuthState(prev => ({ 
            ...prev, 
            staffMember: staffData, 
            userRole: staffData.role, 
            isRoleLoading: false 
          }));
        } else {
          // If not in staffMembers, they are a regular patient/user
          setUserAuthState(prev => ({ 
            ...prev, 
            staffMember: null, 
            userRole: 'Patient', 
            isRoleLoading: false 
          }));
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        setUserAuthState(prev => ({ ...prev, isRoleLoading: false }));
      }
    };

    if (userAuthState.isRoleLoading) {
      fetchUserRole();
    }
  }, [userAuthState.user, userAuthState.isRoleLoading, firestore]);

  // Memoize the context value
  const contextValue = useMemo((): FirebaseContextState => {
    const servicesAvailable = !!(firebaseApp && firestore && auth);
    return {
      areServicesAvailable: servicesAvailable,
      firebaseApp: servicesAvailable ? firebaseApp : null,
      firestore: servicesAvailable ? firestore : null,
      auth: servicesAvailable ? auth : null,
      user: userAuthState.user,
      staffMember: userAuthState.staffMember,
      userRole: userAuthState.userRole,
      isUserLoading: userAuthState.isUserLoading,
      isRoleLoading: userAuthState.isRoleLoading,
      userError: userAuthState.userError,
    };
  }, [firebaseApp, firestore, auth, userAuthState]);

  return (
    <FirebaseContext.Provider value={contextValue}>
      <FirebaseErrorListener />
      {children}
    </FirebaseContext.Provider>
  );
};

/**
 * Hook to access core Firebase services and user authentication state.
 * Throws error if core services are not available or used outside provider.
 */
export const useFirebase = (): FirebaseServicesAndUser => {
  const context = useContext(FirebaseContext);

  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider.');
  }

  if (!context.areServicesAvailable || !context.firebaseApp || !context.firestore || !context.auth) {
    throw new Error('Firebase core services not available. Check FirebaseProvider props.');
  }

  return {
    firebaseApp: context.firebaseApp,
    firestore: context.firestore,
    auth: context.auth,
    user: context.user,
    staffMember: context.staffMember,
    userRole: context.userRole,
    isUserLoading: context.isUserLoading,
    isRoleLoading: context.isRoleLoading,
    userError: context.userError,
  };
};

/** Hook to access Firebase Auth instance. */
export const useAuth = (): Auth => {
  const { auth } = useFirebase();
  return auth;
};

/** Hook to access Firestore instance. */
export const useFirestore = (): Firestore => {
  const { firestore } = useFirebase();
  return firestore;
};

/** Hook to access Firebase App instance. */
export const useFirebaseApp = (): FirebaseApp => {
  const { firebaseApp } = useFirebase();
  return firebaseApp;
};

type MemoFirebase <T> = T & {__memo?: boolean};

export function useMemoFirebase<T>(factory: () => T, deps: DependencyList): T | (MemoFirebase<T>) {
  const memoized = useMemo(factory, deps);
  
  if(typeof memoized !== 'object' || memoized === null) return memoized;
  (memoized as MemoFirebase<T>).__memo = true;
  
  return memoized;
}

/**
 * Hook specifically for accessing the authenticated user's state.
 * This provides the User object, loading status, and any auth errors.
 * @returns {UserHookResult} Object with user, isUserLoading, userError.
 */
export const useUser = (): UserHookResult => { 
  const { user, staffMember, userRole, isUserLoading, isRoleLoading, userError } = useFirebase(); 
  return { user, staffMember, userRole, isUserLoading, isRoleLoading, userError };
};