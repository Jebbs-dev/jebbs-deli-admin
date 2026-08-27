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
      isLoggedIn &&
      storeId &&
      (userType === "IS_VENDOR" || userType === "IS_ADMIN")
        ? async () => {
            const response = await api.get(`/v1/stores/${storeId}/manage`);
            return response.data;
          }
        : skipToken,
  });
};
