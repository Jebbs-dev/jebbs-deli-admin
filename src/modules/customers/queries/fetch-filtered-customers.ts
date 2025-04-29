import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "@/utils/api";

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
  return useQuery({
    queryKey: ["users", params],
    queryFn: async () => {
        const response = await api.get("/customers", { params });
        console.log(response.data)
        
        return response.data;
    },
    placeholderData: keepPreviousData
  });
};