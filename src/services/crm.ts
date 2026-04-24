
import { 
  Firestore, 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc, 
  serverTimestamp,
  limit
} from 'firebase/firestore';
import { Contact, OperationalRecord } from '@/lib/types';
import { logActivity } from '@/lib/audit';

const COLLECTION_NAME = 'contacts';

export class CRMService {
  constructor(private db: Firestore) {}

  async getContacts(filters?: { organizationId?: string; departmentId?: string }) {
    let q = query(collection(this.db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    
    if (filters?.organizationId) {
      q = query(q, where('organizationId', '==', filters.organizationId));
    }
    
    if (filters?.departmentId) {
      q = query(q, where('departmentId', '==', filters.departmentId));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Contact[];
  }

  async createContact(contact: Omit<Contact, keyof OperationalRecord | 'id'>, userId: string, departmentId?: any) {
    const newContact: Omit<Contact, 'id'> = {
      ...contact,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdBy: userId,
      updatedBy: userId,
      ownerId: userId,
      departmentId: departmentId,
      visibility: 'Internal',
      sharedWith: [],
      watcherIds: [],
    };

    const docRef = await addDoc(collection(this.db, COLLECTION_NAME), newContact);
    
    await logActivity(this.db, {
      userId,
      userName: 'System', // This should be replaced with real user name in production
      userRole: 'Operations', // Default for now
      action: 'INITIALIZE_CONTACT',
      details: `Initialized new stakeholder entry: ${contact.name}`,
      scope: 'Department',
      entityId: docRef.id,
      status: 'Success'
    });

    return docRef.id;
  }
}
