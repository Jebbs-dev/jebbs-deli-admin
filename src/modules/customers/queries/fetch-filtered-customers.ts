import { keepPreviousData, skipToken, useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import useAuthStore from "@/state-store/auth";
import useUserRole from "@/hooks/useUserRole";

export type UserParams = {
  search?: string;
  limit: number;
  offset: number;
  sortBy?: string;
  sortOrder?: string;
  startDate?: string;
  endDate?: string;
  [key: string]: string | number | boolean | undefined;
};

export const useFetchFilteredCustomers = (params?: UserParams) => {

  const {isLoggedIn} = useAuthStore();

  const userType = useUserRole()

  return useQuery({
    queryKey: ["users", params],
    queryFn: isLoggedIn && userType === "IS_ADMIN" ? async () => {
        const response = await api.get("/customers", { params });
        console.log(response.data)
        
        return response.data;
    } : skipToken,
    placeholderData: keepPreviousData
  });
};