
import { Department, Project, Deal, UserRole } from './types';

export const DEPARTMENTS: Department[] = [
  {
    id: 'underground',
    name: 'Underground',
    headId: 'system',
    description: 'Subterranean operations and logistics.',
    color: '#10b981'
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    headId: 'system',
    description: 'Talent, events, and media production.',
    color: '#8b5cf6'
  },
  {
    id: 'corporate',
    name: 'Corporate',
    headId: 'system',
    description: 'Strategic planning, advisory, and HQ.',
    color: '#3b82f6'
  },
  {
    id: '88-department',
    name: '88 Department',
    description: 'Special operations and elite services.',
    headId: 'system',
    color: '#ef4444'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'PRJ-001',
    name: 'Operational Refresh Alpha',
    code: 'ORA-2026',
    departmentId: 'corporate',
    managerId: 'system',
    description: 'Major infrastructure and system upgrade for Harmony OS Core.',
    status: 'Active',
    startDate: '2026-01-01',
    visibility: 'Internal',
    createdAt: '2026-01-01',
    createdBy: 'system',
    ownerId: 'system',
    sharedWith: [],
    watcherIds: [],
  }
];
