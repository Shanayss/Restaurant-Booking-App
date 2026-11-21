export interface StoredCustomer {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'customer';
}

export const STORED_CUSTOMERS: StoredCustomer[] = [
  {
    id: 'c1',
    name: 'Chanice Caboverde',
    email: 'chanice@gmail.com',
    password: 'chanice123',
  },
  {
    id: 'c2',
    name: 'Kelly Angela',
    email: 'kellyangela@gmail.com',
    password: 'kean123',
  },
];
