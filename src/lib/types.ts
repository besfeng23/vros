
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

export type VisibilityLevel = 'Public' | 'Internal' | 'Confidential' | 'Restricted' | 'Department' | 'Shared' | 'Private';

export type ApprovalStatus = 'Pending' | 'Reviewing' | 'Approved' | 'Rejected' | 'Deferred';

export type TaskStatus = 'Todo' | 'InProgress' | 'Blocked' | 'Review' | 'Done' | 'Cancelled';

// --- Base Interfaces for Operational Integrity ---

export interface OperationalRecord {
  id: string;
  createdAt: any; 
  updatedAt?: any;
  createdBy: string;
  updatedBy?: string;
  ownerId: string;
  departmentId?: DepartmentId;
  visibility: VisibilityLevel;
  sharedWith: string[]; 
  watcherIds: string[]; 
  isArchived?: boolean;
}

// --- Core Interfaces ---

export interface StaffMember {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  departmentId?: DepartmentId;
  createdAt: string;
  status: 'Active' | 'Suspended' | 'Inactive';
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

export interface Contact extends OperationalRecord {
  type: 'Person' | 'Entity';
  name: string;
  organizationId?: string;
  email?: string;
  phone?: string;
  title?: string;
  tags: string[];
  notes?: string;
}

export interface Organization extends OperationalRecord {
  name: string;
  industry?: string;
  website?: string;
  address?: string;
  primaryContactId?: string;
  tier: 'Gold' | 'Silver' | 'Bronze' | 'Strategic';
}

export interface Project extends OperationalRecord {
  name: string;
  code: string; 
  managerId: string;
  description: string;
  status: 'Planning' | 'Active' | 'Paused' | 'Completed' | 'Archived';
  startDate: string;
  endDate?: string;
  budget?: number;
}

export interface Deal extends OperationalRecord {
  title: string;
  organizationId: string;
  contactId?: string;
  value: number;
  currency: string;
  pipelineStageId: string; 
  probability: number; // 0-100
  expectedClose: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  assignedTo: string;
}

export interface PipelineStage {
  id: string;
  name: string;
  order: number;
  color: string;
}

export interface Case extends OperationalRecord {
  subject: string;
  type: 'Incident' | 'Inquiry' | 'Support' | 'Legal';
  status: 'New' | 'Open' | 'Resolved' | 'Closed';
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  assignedTo?: string;
  userId: string; // Requester
  description: string;
}

export interface Task extends OperationalRecord {
  title: string;
  description?: string;
  projectId?: string;
  caseId?: string;
  assignedTo: string;
  secondaryOwnerId?: string;
  status: TaskStatus;
  priority: 'Normal' | 'High' | 'Urgent';
  dueDate?: string;
}

export interface Handoff extends OperationalRecord {
  entityId: string; 
  entityType: 'Project' | 'Case' | 'Deal' | 'Task';
  fromDepartmentId: DepartmentId;
  toDepartmentId: DepartmentId;
  assignedBy: string;
  assignedTo: string;
  note: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
}

export interface FileAsset extends OperationalRecord {
  name: string;
  path: string; 
  size: number;
  mimeType: string;
  linkedRecordType?: 'Project' | 'Case' | 'Deal' | 'Organization' | 'Contact';
  linkedRecordId?: string;
  isLocked: boolean;
  uploadedBy: string;
}

export interface FinanceEntry extends OperationalRecord {
  type: 'Income' | 'Expense' | 'Transfer';
  amount: number;
  currency: string;
  status: 'Pending' | 'Verified' | 'Reconciled' | 'Disputed';
  projectId?: string;
  category: string;
  description: string;
  date: string;
  recordedBy: string;
}

export interface ApprovalRequest extends OperationalRecord {
  entityId: string;
  entityType: 'FinanceEntry' | 'Project' | 'Handoff' | 'Contract';
  requestorId: string;
  approverIds: string[]; 
  status: ApprovalStatus;
  comments: string;
  decidedAt?: any;
  decidedBy?: string;
}

export interface Comment {
  id: string;
  entityId: string; // ID of task, project, etc.
  authorId: string;
  authorName: string;
  content: string;
  isInternal: boolean;
  createdAt: any;
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
  status: 'Success' | 'Warning' | 'Failure';
  ipAddress?: string;
  createdAt: any;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  departmentId?: DepartmentId;
  createdAt: any;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  type: 'Info' | 'Warning' | 'Alert' | 'Success';
  createdAt: any;
}

export interface SavedView {
  id: string;
  userId: string;
  name: string;
  entityType: string;
  filters: Record<string, any>;
  isPublic: boolean;
  createdAt: any;
}
