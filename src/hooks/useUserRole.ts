import { useAuthStore } from "@/state-store/auth";
import { User, Vendor } from "@/types/user";
import { getUserRole } from "@/utils/get-user-role";

const useUserRole = () => {
  const { user, vendor } = useAuthStore();
  return getUserRole(
    user as Omit<User, "password">,
    vendor as Omit<Vendor, "password">
  );
};

export default useUserRole;
