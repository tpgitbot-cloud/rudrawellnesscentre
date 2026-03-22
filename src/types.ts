export type UserRole = 'admin' | 'patient';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  date: string;
  time: string;
  reason: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  content: string;
  rating: number;
  approved: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  image: string;
}

export interface ClinicInfo {
  about: string;
  team: string;
  contact: {
    address: string;
    phone: string;
    email: string;
    googleMapsUrl: string;
  };
  emergencyBanner: string;
  insurancePlans: string[];
}
