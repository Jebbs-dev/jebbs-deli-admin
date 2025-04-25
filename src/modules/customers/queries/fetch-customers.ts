import { useQuery } from "@tanstack/react-query";
import api from "@/utils/api";

export const useFetchCustomer = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
        const response = await api.get("/customers");
        console.log(response.data)
        
        return response.data;
    },
  });
};