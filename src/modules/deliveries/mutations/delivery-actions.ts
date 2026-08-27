import api from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import useAuthStore from "@/state-store/auth";

type DeliveryAction = "pickup" | "in-transit" | "delivered" | "failed";

export const useClaimDelivery = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (orderId: string) => {
      const response = await api.post(`/deliveries/claim/${orderId}`);
      return response.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["deliveries"] });
      toast({ title: "Success", description: "Delivery claimed." });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to claim delivery",
      });
    },
  });
};

export const useDeliveryProgress = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      orderId,
      action,
      failureReason,
    }: {
      orderId: string;
      action: DeliveryAction;
      failureReason?: string;
    }) => {
      const response = await api.post(`/deliveries/${orderId}/${action}`, {
        failureReason,
      });
      return response.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["deliveries"] });
      toast({ title: "Success", description: "Delivery updated." });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update delivery",
      });
    },
  });
};

export const useUpdateRiderAvailability = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { login, user } = useAuthStore();

  return useMutation({
    mutationFn: async (isAvailable: boolean) => {
      const response = await api.patch("/deliveries/availability", {
        isAvailable,
      });
      return response.data;
    },
    onSuccess: (_data, isAvailable) => {
      void queryClient.invalidateQueries({ queryKey: ["deliveries"] });
      if (user) {
        login({
          ...user,
          riderProfile: {
            id: user.riderProfile?.id ?? "",
            userId: user.id,
            vehicle: user.riderProfile?.vehicle,
            isAvailable,
          },
        });
      }
      toast({
        title: "Success",
        description: isAvailable
          ? "You are now available for deliveries."
          : "You are now unavailable.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update availability",
      });
    },
  });
};
