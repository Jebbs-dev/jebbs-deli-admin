import { StoreCreate } from "@/types/store";
import api from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useCreateStore = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (store: Omit<StoreCreate, "createdAt" | "updatedAt" | "id">) => {
      const response = await api.post("/store/register", store);
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
