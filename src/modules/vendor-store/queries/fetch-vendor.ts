import useUserRole from "@/hooks/useUserRole";
import useAuthStore from "@/state-store/auth";
import api from "@/utils/api";
import { skipToken, useQuery } from "@tanstack/react-query";

export const useFetchVendor = (vendorId: string) => {
  const { isLoggedIn } = useAuthStore();

  return useQuery({
    queryKey: ["vendor"],
    queryFn: isLoggedIn
      ? async () => {
          const response = await api.get(`/vendor/${vendorId}`);
          return response.data;
        }
      : skipToken,
  });
};
