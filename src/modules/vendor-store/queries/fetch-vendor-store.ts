import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";


export const useFetchStore = (storeId:string) => {
  return useQuery({
    queryKey: ["vendor-store", storeId],
    queryFn: async () => {
      const response = await api.get(`/store/${storeId}`);
      return response.data;
    },
  });
}