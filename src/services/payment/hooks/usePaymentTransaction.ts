import { useQuery } from "@tanstack/react-query";
import {
  getPaymentTransaction,
  getPaymentTransactionById,
} from "../apis/payment.api";

export const usePaymentTransactionSession = (
  sessionId: string,
  enabled?: boolean
) => {
  return useQuery({
    queryKey: ["paymentTransactionSession", sessionId],
    queryFn: () => getPaymentTransaction(sessionId),
    enabled: enabled ?? !!sessionId,
  });
};

export const usePaymentTransaction = (
  transactionId: string,
  enabled?: boolean
) => {
  return useQuery({
    queryKey: ["paymentTransaction", transactionId],
    queryFn: () => getPaymentTransactionById(transactionId),
    enabled: enabled ?? !!transactionId,
  });
};