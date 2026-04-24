
import { Branch, Service, Promo, Testimonial } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImg = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || 'https://placehold.co/600x400';

export const SERVICES: Service[] = [
  {
    id: 's1',
    name: 'Advanced Facial Rejuvenation',
    slug: 'advanced-facial-rejuvenation',
    category: 'Skincare',
    description: 'A premium treatment focused on restoring youthful glow using medical-grade serums.',
    imageUrl: getImg('treatment-skin'),
    isFeatured: true
  },
  {
    id: 's2',
    name: 'Precise Medical Laser',
    slug: 'precise-medical-laser',
    category: 'Laser',
    description: 'State-of-the-art laser technology for skin resurfacing and pigment correction.',
    imageUrl: getImg('treatment-laser'),
    isFeatured: true
  },
  {
    id: 's3',
    name: 'Contour Sculpting',
    slug: 'contour-sculpting',
    category: 'Body',
    description: 'Non-invasive body contouring designed for refined and elegant silhouettes.',
    imageUrl: 'https://picsum.photos/seed/body1/800/600',
    isFeatured: false
  }
];

export const BRANCHES: Branch[] = [
  {
    id: 'b1',
    name: 'Ortiz Clinic Makati',
    slug: 'makati-branch',
    address: 'Level 2, Premium Tower, Ayala Avenue, Makati City',
    phone: '+63 2 8888 0001',
    email: 'makati@ortizskin.com',
    hours: 'Mon - Sun: 10:00 AM - 8:00 PM',
    imageUrl: getImg('branch-makati'),
    services: ['s1', 's2', 's3']
  },
  {
    id: 'b2',
    name: 'Ortiz Clinic BGC',
    slug: 'bgc-branch',
    address: 'High Street South, 5th Avenue, Bonifacio Global City',
    phone: '+63 2 8888 0002',
    email: 'bgc@ortizskin.com',
    hours: 'Mon - Sun: 10:00 AM - 9:00 PM',
    imageUrl: 'https://picsum.photos/seed/bgc/800/600',
    services: ['s1', 's2']
  }
];

export const PROMOS: Promo[] = [
  {
    id: 'p1',
    title: 'The Signature Glow Package',
    description: 'Indulge in our most sought-after facial treatment combined with medical-grade peeling.',
    validUntil: 'December 31, 2024',
    imageUrl: getImg('promo-banner'),
    ctaText: 'Experience Luxury'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    patientName: 'Sophia M.',
    content: 'The most refined clinical experience I have ever had in Manila. The staff is professional and the results are truly natural.',
    rating: 5,
    treatment: 'Facial Rejuvenation'
  }
];
