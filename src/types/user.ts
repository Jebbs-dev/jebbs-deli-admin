import { Store } from "./store";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
};

export type RiderProfile = {
  id: string;
  userId: string;
  vehicle?: string | null;
  isAvailable: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export interface Customer extends User {
  telephone: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  store?: Store;
}

export interface Admin extends User {
  telephone?: string;
  address?: string;
  store?: Partial<Store>;
  riderProfile?: RiderProfile | null;
}
