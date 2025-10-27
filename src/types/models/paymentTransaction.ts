import type { Method } from "../enums/method";
import type { PaymentStatus } from "../enums/paymentStatus";
import type { ReferenceType } from "../enums/referenceType";

export type PaymentTransaction = {
  id: string;
  customerId: string;
  referenceId: string;
  referenceType: ReferenceType;
  sessionId: string;
  amount: number;
  status: PaymentStatus;
  method: Method;
  createdAt: string;
  updatedAt: string;
};
