import { usePaymentMutaition } from "../mutations";

export const usePayment = () => {
  const paymentMutation = usePaymentMutaition();
  return { paymentMutation };
};
