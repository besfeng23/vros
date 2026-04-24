
export interface Branch {
  id: string;
  name: string;
  slug: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapUrl?: string;
  imageUrl: string;
  services: string[];
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  category: 'Skincare' | 'Laser' | 'Body' | 'Injectables';
  description: string;
  longDescription?: string;
  priceRange?: string;
  imageUrl: string;
  isFeatured?: boolean;
}

export interface Promo {
  id: string;
  title: string;
  description: string;
  validUntil: string;
  imageUrl: string;
  ctaText: string;
  price?: number; // Added for checkout logic
}

export interface Testimonial {
  id: string;
  patientName: string;
  content: string;
  rating: number;
  treatment: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
  aiSummary?: string;
  aiSentiment?: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  branchId: string;
  serviceId: string;
  appointmentDate: string;
  appointmentTime: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export type UserRole = 'SuperAdmin' | 'HQOperations' | 'BranchManager' | 'Cashier' | 'Marketing' | 'Finance' | 'Patient';

export interface StaffMember {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  branchId?: string; // Optional if HQ but required for branch staff
  createdAt: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: UserRole;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  details: string;
  collection?: string;
  docId?: string;
  branchId?: string;
  createdAt: string;
}

export interface PaymentRecord {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed' | 'refunded';
  method: string;
  userId: string;
  branchId: string;
  metadata: Record<string, any>;
  createdAt: string;
}

