import { http } from "@/lib/http"
import type { LoginResponse } from "@/pages/auth/lib/schema"
import type { Account } from "@/types/models/account";
import type { BaseResponse } from "@/types/models/response";

const httpClient = http()

export const login = async (email: string, password: string) => {
    const user = await httpClient.post<BaseResponse<LoginResponse>>("auth/signin", { email, password });
    return user;
}

export const logout = async () => {
    return await httpClient.post("auth/signout");
}

export const refresh = async () => {
    return await httpClient.get<BaseResponse<{ accessToken: string }>>("auth/refresh-token", { withCredentials: true })
}

export const getMe = async (token?: string) => {
    const config = token ? {
        headers: {
            Authorization: `Bearer ${token}`
        }
    } : {};

    return await httpClient.get<BaseResponse<Account>>("auth/me", config)
};
