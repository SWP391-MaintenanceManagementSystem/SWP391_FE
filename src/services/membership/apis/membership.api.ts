import { httpPrivate } from "@/lib/http"
import type { Membership } from "@/types/models/membership"
import type { BaseResponse } from "@/types/models/response"

export const getAllMemberships = async  () => {
    return await httpPrivate.get<BaseResponse<{data: Membership[]}>>("/memberships")
}