import type { Payment } from "@/types/models/payment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { postPaymentInfo } from "../apis/payment.api";
import { queryKeys } from "@/services/membership/queries/keys";
import { stripePromise } from "@/lib/stripe";


export const usePaymentMutaition = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Payment) => {
      const updatedUser = await postPaymentInfo(data);
      return updatedUser.data.data;
    },
    onSuccess: async (data) => {
      toast.success("Redirecting to checkout...");
      const stripe = await stripePromise;
      if (stripe) {
        window.location.href = data;
      } else {
        toast.error("Stripe not loaded");
        return;
      }

      queryClient.invalidateQueries({ queryKey: queryKeys.subscription });
    },
    onError: (err: unknown) => {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed to add vehicle");
      }
    },
  });
};
