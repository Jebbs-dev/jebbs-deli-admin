import { Admin, User } from "@/types/user";

const isVendor = (user: Omit<Admin, "password">) => user?.role === "VENDOR";
const isAdmin = (user: Omit<Admin, "password">) => user?.role === "ADMIN";

const getUserRole = (
  user: Omit<Admin, "password">,
) => {
  return isVendor(user) ? "IS_VENDOR" : isAdmin(user) ? "IS_ADMIN" : "";
};

const roles = {
  IS_VENDOR: "IS_VENDOR",
  IS_ADMIN: "IS_ADMIN",
} as const;

export { isVendor, isAdmin, roles, getUserRole };
