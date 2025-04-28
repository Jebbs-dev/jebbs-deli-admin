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
}

export interface Vendor extends User {
  store: Partial<Store>;
}
