import { Admin } from "@/types/user";

const isVendor = (user: Omit<Admin, "password">) => user?.role === "VENDOR";
const isAdmin = (user: Omit<Admin, "password">) => user?.role === "ADMIN";
const isRider = (user: Omit<Admin, "password">) => user?.role === "RIDER";

const getUserRole = (user: Omit<Admin, "password">) => {
  if (isVendor(user)) return "IS_VENDOR";
  if (isAdmin(user)) return "IS_ADMIN";
  if (isRider(user)) return "IS_RIDER";
  return "";
};

const roles = {
  IS_VENDOR: "IS_VENDOR",
  IS_ADMIN: "IS_ADMIN",
  IS_RIDER: "IS_RIDER",
} as const;

export { isVendor, isAdmin, isRider, roles, getUserRole };
