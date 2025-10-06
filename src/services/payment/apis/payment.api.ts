import { httpPrivate } from "@/lib/http"
import type { Payment } from "@/types/models/payment"
import type { BaseResponse } from "@/types/models/response"

export const postPaymentInfo = async  (data: Payment) => {
    return await httpPrivate.post<BaseResponse<{data: string}>>("/payment", data)
}