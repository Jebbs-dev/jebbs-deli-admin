import { keepPreviousData, skipToken, useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import { UserParams } from "@/modules/customers/queries/fetch-filtered-customers";
import useAuthStore from "@/state-store/auth";
import useUserRole from "@/hooks/useUserRole";

export const useFetchFilteredVendors = (params: UserParams) => {
  const { isLoggedIn } = useAuthStore();

  const userType = useUserRole();

  return useQuery({
    queryKey: ["users", params],
    queryFn:
      isLoggedIn && userType === "IS_ADMIN"
        ? async () => {
            const response = await api.get("/users/admins/vendors", { params });
            return response.data;
          }
        : skipToken,
    placeholderData: keepPreviousData,
  });
};
