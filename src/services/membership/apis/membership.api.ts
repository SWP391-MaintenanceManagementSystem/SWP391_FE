import { httpPrivate } from "@/lib/http"
import type { Membership } from "@/types/models/membership"
import type { BaseResponse } from "@/types/models/response"
import type { Subscription } from "@/types/models/subscription";

export const getAllMemberships = async  () => {
    return await httpPrivate.get<BaseResponse<{data: Membership[]}>>("/memberships")
}

export const getMySubscription = async () => {
  return await httpPrivate.get<BaseResponse<{data: Subscription}>>("/me/subscription")
}