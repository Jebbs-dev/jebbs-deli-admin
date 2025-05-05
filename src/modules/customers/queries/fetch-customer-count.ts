import { keepPreviousData, skipToken, useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import useAuthStore from "@/state-store/auth";
import useUserRole from "@/hooks/useUserRole";

export const useFetchCustomerCount = () => {
  const { isLoggedIn } = useAuthStore();

  const userType = useUserRole();

  return useQuery({
    queryKey: ["users"],
    queryFn:
      isLoggedIn && userType === "IS_ADMIN"
        ? async () => {
            const response = await api.get("/customers/count");

            return response.data;
          }
        : skipToken,
    placeholderData: keepPreviousData,
  });
};
