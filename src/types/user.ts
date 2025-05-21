import { Store } from "./store";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface Customer extends User  {
  telephone: string,
  avatar: string,
  createdAt: string,
  updatedAt: string,
  store?: Store;
}

export interface Admin extends User {
  store?: Partial<Store>;
}
