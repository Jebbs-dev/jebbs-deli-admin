import { StoreCreate } from "@/types/store";
import api from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const useDeleteOrder = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (orderId: string) => {
      const response = await api.delete(`/orders/${orderId}`);
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
