import useUserRole from "@/hooks/useUserRole";
import useAuthStore from "@/state-store/auth";
import api from "@/utils/api";
import { skipToken, useQuery } from "@tanstack/react-query";

export const useFetchStore = (storeId: string) => {
  const { isLoggedIn } = useAuthStore();

  const userType = useUserRole();

  return useQuery({
    queryKey: ["vendor-store", storeId],
    queryFn:
      isLoggedIn && userType === "IS_VENDOR"
        ? async () => {
            const response = await api.get(`/store/${storeId}`);
            return response.data;
          }
        : skipToken,
  });
};
