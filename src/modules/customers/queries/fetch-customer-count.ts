import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "@/utils/api";

export const useFetchCustomerCount = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
        const response = await api.get("/customers/count");
        
        return response.data;
    },
    placeholderData: keepPreviousData
  });
};