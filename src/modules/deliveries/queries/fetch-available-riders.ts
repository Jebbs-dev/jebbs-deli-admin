import { skipToken, useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import useAuthStore from "@/state-store/auth";
import useUserRole from "@/hooks/useUserRole";

export const useFetchAvailableRiders = () => {
  const { isLoggedIn } = useAuthStore();
  const userType = useUserRole();

  return useQuery({
    queryKey: ["available-riders"],
    queryFn:
      isLoggedIn && (userType === "IS_ADMIN" || userType === "IS_VENDOR")
        ? async () => {
            const response = await api.get("/deliveries/riders/available");
            return response.data;
          }
        : skipToken,
  });
};
