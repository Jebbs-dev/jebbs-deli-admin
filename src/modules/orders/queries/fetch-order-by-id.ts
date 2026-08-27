import { skipToken, useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import useAuthStore from "@/state-store/auth";
import useUserRole from "@/hooks/useUserRole";

export const useFetchOrderById = (orderId: string) => {
  const { isLoggedIn } = useAuthStore();
  const userType = useUserRole();

  return useQuery({
    queryKey: ["order", orderId],
    queryFn:
      isLoggedIn &&
      orderId &&
      (userType === "IS_ADMIN" || userType === "IS_VENDOR")
        ? async () => {
            const response = await api.get(`/v1/orders/${orderId}`);
            return response.data;
          }
        : skipToken,
  });
};
