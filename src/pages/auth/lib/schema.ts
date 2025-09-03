import type { Account } from "@/types/models/account";
import type { BaseResponse, PaginationResponse } from "@/types/models/response";
import { z } from "zod"


export const LoginSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
    password: z.string({ error: "Password is required" }).min(6).max(100),
})

export type LoginFormData = z.infer<typeof LoginSchema>

export const defaultLoginValues: LoginFormData = {
    email: "",
    password: "",
}

export type LoginResponse = {
  account: Account
  accessToken: string;
};
