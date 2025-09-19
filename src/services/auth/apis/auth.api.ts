import { httpPublic, httpPrivate } from "@/lib/http"
import type { LoginFormData, LoginResponse, RegisterFormData, RegisterResponse } from "@/pages/auth/lib/schema"
import type { AccountWithProfile } from "@/types/models/account";
import type { BaseResponse } from "@/types/models/response";

export const register = async (formData: RegisterFormData) => {
    const { email, password, firstName, lastName, confirmPassword } = formData;
    const user = await httpPublic.post<BaseResponse<RegisterResponse>>("auth/signup", { email, password, firstName, lastName, confirmPassword });
    return user;
}

export const login = async (formData: LoginFormData) => {
    const { email, password } = formData;
    const user = await httpPublic.post<BaseResponse<LoginResponse>>("auth/signin", { email, password });
    return user;
}

export const logout = async () => {
    return await httpPrivate.post("auth/signout");
}

export const refresh = async () => {
    return await httpPublic.get<BaseResponse<{ accessToken: string }>>("auth/refresh-token", { withCredentials: true })
}

export const getMe = async (token?: string) => {
    const config = token ? {
        headers: {
            Authorization: `Bearer ${token}`
        }
    } : {};

    return await httpPrivate.get<BaseResponse<{ account: AccountWithProfile }>>("auth/me", config)
};

export const resendVerifyEmail = async (email: string) => {
    return await httpPublic.post<BaseResponse<null>>("auth/resend-activation-email", { email });
}
