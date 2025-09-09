import { http } from "@/lib/http"
import type { LoginFormData, LoginResponse, RegisterFormData, RegisterResponse } from "@/pages/auth/lib/schema"
import type { Account } from "@/types/models/account";
import type { BaseResponse } from "@/types/models/response";

const httpClient = http()


export const register = async (formData: RegisterFormData) => {
    const { email, password, firstName, lastName, confirmPassword } = formData;
    const user = await httpClient.post<BaseResponse<RegisterResponse>>("auth/signup", { email, password, firstName, lastName, confirmPassword });
    return user;
}

export const login = async (formData: LoginFormData) => {
    const { email, password } = formData;
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

    return await httpClient.get<BaseResponse<{ account: Account }>>("auth/me", config)
};
