import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";


export const useFetchVendorStore = (storeId:string, vendorId: string) => {
  return useQuery({
    queryKey: ["vendor-store", storeId, vendorId],
    queryFn: async () => {
      const response = await api.get(`/store/${storeId}`);
      return response.data;
    },
  });
}