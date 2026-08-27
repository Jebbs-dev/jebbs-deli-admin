import api from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

type TransitionAction =
  | "confirm"
  | "preparing"
  | "ready"
  | "complete-pickup"
  | "cancel";

export const useTransitionOrder = (orderId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      action,
      note,
    }: {
      action: TransitionAction;
      note?: string;
    }) => {
      const response = await api.post(`/v1/orders/${orderId}/${action}`, {
        note,
      });
      return response.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["order", orderId] });
      void queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast({
        title: "Success",
        description: "Order status updated.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update order",
      });
    },
  });
};

export const useAssignRider = (orderId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (riderId: string) => {
      const response = await api.post(`/v1/orders/${orderId}/assign`, { riderId });
      return response.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["order", orderId] });
      void queryClient.invalidateQueries({ queryKey: ["orders"] });
      void queryClient.invalidateQueries({ queryKey: ["available-riders"] });
      toast({
        title: "Success",
        description: "Rider assigned.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to assign rider",
      });
    },
  });
};
