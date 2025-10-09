import type { ReferenceType } from "../enums/referenceType";
export type Payment = {
  referenceId: string;
  referenceType: ReferenceType;
  amount: number;
};
