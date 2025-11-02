import { httpPrivate } from "@/lib/http";
import type { Payment } from "@/types/models/payment";
import type { PaymentTransaction } from "@/types/models/paymentTransaction";
import type { BaseResponse } from "@/types/models/response";

export const postPaymentInfo = async (data: Payment) => {
  return await httpPrivate.post<BaseResponse<{ data: string }>>(
    "/payment",
    data
  );
};

export const getPaymentTransaction = async (sessionId: string) => {
  return await httpPrivate.get<BaseResponse<{ data: PaymentTransaction }>>(
    `/payment/transactions/sessions/${sessionId}`
  );
};

export const getPaymentTransactionById = async (transactionId: string) => {
  return await httpPrivate.get<BaseResponse<{ data: PaymentTransaction }>>(
    `/payment/transactions/${transactionId}`
  );
};
