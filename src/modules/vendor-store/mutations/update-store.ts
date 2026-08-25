import { Store, StoreCreate } from "@/types/store";
import api from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const useUpdateStore = (storeId: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (store: FormData) => {
      const response = await api.patch(`/store/${storeId}`, store);
      return response.data;
    },
    onSuccess: () => {
      navigate({ to: "/vendor-store" });
      queryClient.invalidateQueries({ queryKey: ["vendor-store"] });
    },
    onError: (error) => {
      console.error("Store update failed:", error);
      // toast({
      //   variant: "destructive",
      //   title: "Error",
      //   description: error.message,
      // });
    },
  });
};
