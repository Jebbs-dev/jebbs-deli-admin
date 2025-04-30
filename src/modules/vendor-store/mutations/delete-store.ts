import { StoreCreate } from "@/types/store";
import api from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useDeleteStore = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (storeId: string) => {
      const response = await api.delete(`/store/${storeId}`);
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
