
/**
 * Harmony OS - Core Domain Model & Type Definitions
 * Professional Enterprise Platform for Joven and Patty
 */

// --- Enums & Constants ---

export type DepartmentId = 'underground' | 'entertainment' | 'corporate' | '88-department';

export const Departments: Record<DepartmentId, { name: string; description: string }> = {
  'underground': {
    name: 'Underground',
    description: 'Subterranean operations and logistics.'
  },
  'entertainment': {
    name: 'Entertainment',
    description: 'Talent, events, and media production.'
  },
  'corporate': {
    name: 'Corporate',
    description: 'Strategic planning, advisory, and HQ.'
  },
  '88-department': {
    name: '88 Department',
    description: 'Special operations and elite services.'
  }
};

export type UserRole = 
  | 'SuperAdmin' 
  | 'Executive' 
  | 'Operations' 
  | 'Finance' 
  | 'DepartmentHead' 
  | 'TalentManager' 
  | 'ClientServicing' 
  | 'FieldRunner' 
  | 'Viewer';

export type VisibilityLevel = 'Public' | 'Internal' | 'Confidential' | 'Restricted';

export type ApprovalStatus = 'Pending' | 'Reviewing' | 'Approved' | 'Rejected' | 'Deferred';

export type TaskStatus = 'Todo' | 'InProgress' | 'Blocked' | 'Review' | 'Done' | 'Cancelled';

// --- Core Interfaces ---

export interface StaffMember {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  departmentId?: DepartmentId;
  createdAt: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  departmentId?: DepartmentId;
  metadata: Record<string, any>;
  createdAt: string;
  lastLogin?: string;
}

export interface Department {
  id: DepartmentId;
  name: string;
  headId: string; // User ID
  description: string;
  color: string;
}

export interface Contact {
  id: string;
  type: 'Person' | 'Entity';
  name: string;
  organizationId?: string;
  email?: string;
  phone?: string;
  title?: string;
  tags: string[];
  notes?: string;
  visibility: VisibilityLevel;
  createdBy: string;
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  industry?: string;
  website?: string;
  address?: string;
  primaryContactId?: string;
  tier: 'Gold' | 'Silver' | 'Bronze' | 'Strategic';
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  code: string; // e.g. "PRJ-001"
  departmentId: DepartmentId;
  managerId: string;
  description: string;
  status: 'Planning' | 'Active' | 'Paused' | 'Completed' | 'Archived';
  startDate: string;
  endDate?: string;
  visibility: VisibilityLevel;
  budget?: number;
  createdAt: string;
}

export interface Deal {
  id: string;
  title: string;
  organizationId: string;
  contactId?: string;
  value: number;
  currency: string;
  stageId: string; // pipeline stage
  probability: number; // 0-100
  expectedClose: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  assignedTo: string;
  createdAt: string;
}

export interface PipelineStage {
  id: string;
  name: string;
  order: number;
  color: string;
}

export interface Case {
  id: string;
  subject: string;
  departmentId: DepartmentId;
  type: 'Incident' | 'Inquiry' | 'Support' | 'Legal';
  status: 'New' | 'Open' | 'Resolved' | 'Closed';
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  assignedTo?: string;
  userId: string; // Requester
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  projectId?: string;
  caseId?: string;
  assignedTo: string;
  status: TaskStatus;
  priority: 'Normal' | 'High' | 'Urgent';
  dueDate?: string;
  createdAt: string;
}

export interface Handoff {
  id: string;
  entityId: string; // ID of the project, case, etc.
  fromDept: DepartmentId;
  toDept: DepartmentId;
  assignedBy: string;
  assignedTo: string;
  note: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  createdAt: string;
}

export interface FileAsset {
  id: string;
  name: string;
  path: string; // GCS Path
  size: number;
  mimeType: string;
  projectId?: string;
  caseId?: string;
  isLocked: boolean;
  visibility: VisibilityLevel;
  uploadedBy: string;
  createdAt: string;
}

export interface FinanceEntry {
  id: string;
  type: 'Income' | 'Expense' | 'Transfer';
  amount: number;
  currency: string;
  status: 'Pending' | 'Verified' | 'Reconciled' | 'Disputed';
  departmentId: DepartmentId;
  projectId?: string;
  category: string;
  description: string;
  date: string;
  recordedBy: string;
  createdAt: string;
}

export interface ApprovalRequest {
  id: string;
  entityId: string;
  type: 'Budget' | 'Action' | 'Content' | 'Legal';
  requestorId: string;
  approverId: string;
  status: ApprovalStatus;
  comments: string;
  createdAt: string;
  decidedAt?: string;
}

export interface Comment {
  id: string;
  entityId: string; // ID of task, project, etc.
  authorId: string;
  authorName: string;
  content: string;
  isInternal: boolean;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  details: string;
  scope: 'System' | 'Department' | 'Project' | 'Finance';
  entityId?: string;
  departmentId?: DepartmentId;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  type: 'Info' | 'Warning' | 'Alert' | 'Success';
  createdAt: string;
}

export interface SavedView {
  id: string;
  userId: string;
  name: string;
  entityType: string;
  filters: Record<string, any>;
  isPublic: boolean;
  createdAt: string;
}
