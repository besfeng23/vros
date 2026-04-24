import { Firestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { UserRole, DepartmentId } from './types';

export interface AuditLogParams {
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  details: string;
  scope: 'System' | 'Department' | 'Project' | 'Finance';
  entityId?: string;
  departmentId?: DepartmentId;
  status: 'Success' | 'Warning' | 'Failure';
}

/**
 * Global Audit Logger
 * Use this to record any administrative or high-stakes action.
 * Pass the firestore instance explicitly to avoid singleton issues.
 */
export async function logActivity(db: Firestore, params: AuditLogParams) {
  try {
    await addDoc(collection(db, 'auditLogs'), {
      ...params,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Failed to write audit log:", error);
  }
}
