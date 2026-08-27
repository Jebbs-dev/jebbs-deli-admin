import { redirect } from "@tanstack/react-router";
import useAuthStore from "@/state-store/auth";
import { getUserRole } from "@/utils/get-user-role";
import type { Admin } from "@/types/user";

export type AppRole = "IS_ADMIN" | "IS_VENDOR" | "IS_RIDER";

/**
 * TanStack Router beforeLoad guard: redirect to `/` when the current
 * user's role is not in `allowed`.
 */
export function requireRoles(allowed: AppRole[]) {
  return () => {
    const user = useAuthStore.getState().user as Omit<Admin, "password"> | null;
    const role = getUserRole(user as Omit<Admin, "password">) as AppRole | "";
    if (!role || !allowed.includes(role)) {
      throw redirect({ to: "/" });
    }
  };
}
