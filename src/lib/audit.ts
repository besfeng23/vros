import { firestore } from '@/firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { UserRole } from './types';

export interface AuditLogParams {
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  details: string;
  collection?: string;
  docId?: string;
  branchId?: string;
}

/**
 * Global Audit Logger
 * Use this to record any administrative or high-stakes action.
 */
export async function logActivity(params: AuditLogParams) {
  if (!firestore) return;

  try {
    await addDoc(collection(firestore, 'activityLogs'), {
      ...params,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Failed to write audit log:", error);
  }
}
