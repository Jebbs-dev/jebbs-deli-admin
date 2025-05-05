import { keepPreviousData, skipToken, useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import { OrderParams } from "./fetch-filtered-orders-by store";
import useAuthStore from "@/state-store/auth";
import useUserRole from "@/hooks/useUserRole";

export const useFetchOrdersCount = () => {
  const { isLoggedIn } = useAuthStore();

  const userType = useUserRole();

  return useQuery({
    queryKey: ["orders"],
    queryFn:
      isLoggedIn && userType === "IS_ADMIN"
        ? async () => {
            const response = await api.get(`/orders/count`);
            return response.data;
          }
        : skipToken,
    placeholderData: keepPreviousData,
  });
};
