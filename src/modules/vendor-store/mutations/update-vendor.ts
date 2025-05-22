import { Admin } from "@/types/user";
import api from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateVendor = (vendorId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Admin>) => {
      const response = await api.patch(`/users/${vendorId}`, data);
      return response.data;
    },
    onSuccess: () => {
      // Refetch the vendor data after the update
      queryClient.invalidateQueries({ queryKey: ["vendor"] });
    },
    onError: (error) => {
      console.error("Error updating vendor:", error);
    },
  });
};
