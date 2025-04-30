import { Product } from "@/types/products";
import api from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type UpdateProductProps = Omit<Product, "image"> & {
    image: File | null;
  }


export const useUpdateProduct = (productId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.patch(`/products/${productId}`, data);
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      router.push("/products");
    },
    onError: (error) => {
      console.error("Error updating product:", error);
    },
  });
};
