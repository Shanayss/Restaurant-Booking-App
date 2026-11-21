export interface StoredCustomer {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "customer";
}

export const STORED_CUSTOMERS: StoredCustomer[] = [
  {
    id: "c1",
    name: "Chanice Caboverde",
    email: "chanice@gmail.com",
    password: "chanice123",
    role: "customer",
  },
  {
    id: "c3",
    name: "Allen Literato",
    email: "literato.allen@gmail.com",
    password: "mwehehe18",
    role: "customer",
  },
  {
    id: "c4",
    name: "Vanessa Dajang",
    email: "vanessada758@gmail.com",
    password: "vanzy13",
    role: "customer",
  },
];
