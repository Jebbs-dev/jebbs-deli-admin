import { useAuthStore } from "@/state-store/auth";
import { Admin, User } from "@/types/user";
import { getUserRole } from "@/utils/get-user-role";

const useUserRole = () => {
  const { user } = useAuthStore();
  return getUserRole(user as Omit<Admin, "password">);
};

export default useUserRole;
