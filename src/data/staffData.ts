import type { UserRole } from '@/context/UserContext';

export interface StoredStaff {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Extract<UserRole, 'staff' | 'admin'>;
}

export const STORED_STAFF: StoredStaff[] = [
  {
    id: 's1',
    name: 'Kelly Angela',
    email: 'kellyangela@gmail.com',
    password: 'kean123',
    role: 'admin',
  },
];
