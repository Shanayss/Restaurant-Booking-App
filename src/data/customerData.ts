export interface StoredCustomer {
  id: string;
  name: string;
  email: string;
  password: string;
}

export const STORED_CUSTOMERS: StoredCustomer[] = [
  {
    id: 'c1',
    name: 'Chanice Caboverde',
    email: 'chanice@gmail.com',
    password: 'chanice123',
  },
];
