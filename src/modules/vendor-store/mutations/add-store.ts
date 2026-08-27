import { StoreCreate } from "@/types/store";
import api from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const useCreateStore = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (store: Omit<StoreCreate, "createdAt" | "updatedAt" | "id">) => {
      const response = await api.post("/v1/stores", store);
      return response.data;
    },
    onSuccess: () => {
      navigate({ to: "/" });
    },
    onError: (error) => {
      console.error("Login failed:", error);
      // toast({
      //   variant: "destructive",
      //   title: "Error",
      //   description: error.message,
      // });
    },
  });
};
