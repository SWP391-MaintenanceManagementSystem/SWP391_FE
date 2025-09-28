import { axiosPrivate } from "@/lib/axios"
import type { ChangeProfileFormData } from "@/pages/profile/components/profile/libs/schema"
import type { AccountWithProfile } from "@/types/models/account"
import type { BaseResponse } from "@/types/models/response"



export const updateInfo = async (data: ChangeProfileFormData) => {
    return axiosPrivate.patch<BaseResponse<{ account: AccountWithProfile }>>("/me", data)
}

export const getProfile = async () => {
    return axiosPrivate.get<BaseResponse<{ account: AccountWithProfile }>>("auth/me");
}