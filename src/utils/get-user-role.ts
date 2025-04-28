import { User, Vendor } from "@/types/user";

const isVendor = (user: Omit<Vendor, "password">) => user?.role === "VENDOR";
const isAdmin = (user: Omit<User, "password">) => user?.role === "ADMIN";

const getUserRole = (
  user: Omit<User, "password">,
  vendor: Omit<Vendor, "password">
) => {
  return isVendor(vendor) ? "IS_VENDOR" : isAdmin(user) ? "IS_ADMIN" : "";
};

const roles = {
  IS_VENDOR: "IS_VENDOR",
  IS_ADMIN: "IS_ADMIN",
} as const;

export { isVendor, isAdmin, roles, getUserRole };
