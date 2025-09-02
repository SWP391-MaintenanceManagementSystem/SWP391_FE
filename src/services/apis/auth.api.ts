
import { http } from "@/lib/http"
import type { LoginResponse } from "@/pages/auth/lib/schema"

const httpClient = http()

export const login = async (email: string, password: string) => {
    return await httpClient.post<LoginResponse>("auth/signin", { email, password });
}

export const logout = async () => {
    return await httpClient.post("auth/signout");
}

export const refresh = async () => {
    return await httpClient.get<{ accessToken: string }>("auth/refresh-token", { withCredentials: true })
}

export const getMe = async () => {
    return await httpClient.get("/auth/me");
}