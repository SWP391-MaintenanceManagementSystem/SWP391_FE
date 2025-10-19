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


export const addMembership = async (formData: Omit<Membership, "id" | "createdAt" | "updatedAt" | "status">) => {
  return await httpPrivate.post<BaseResponse<{ data: Membership }>>("/memberships", formData);
};

export const updateMembership = async (id: string, formData: Partial<Membership>) => { 
  return await httpPrivate.patch<BaseResponse<{ data: Membership }>>(`/memberships/${id}`, formData);
};


export const deleteMembership = async (id: string) => {
  return await httpPrivate.del<BaseResponse<{ data: Membership }>>(`/memberships/${id}`);
};
