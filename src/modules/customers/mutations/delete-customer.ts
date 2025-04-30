import { StoreCreate } from "@/types/store";
import api from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useDeleteCustomer = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (customerId: string) => {
      const response = await api.delete(`/users/${customerId}`);
      return response.data;
    },
    onSuccess: () => {
      router.push("/");
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
