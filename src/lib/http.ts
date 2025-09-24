import type { AxiosRequestConfig } from "axios";
import { axiosPrivate, axiosPublic } from "./axios";

const wrap = (client: typeof axiosPrivate | typeof axiosPublic) => {
    return {
        get: async <T>(url: string, options?: AxiosRequestConfig) => {
            const res = await client.get<T>(url, options);
            return res.data;
        },
        post: async <T>(url: string, body?: any, options?: AxiosRequestConfig) => {
            const res = await client.post<T>(url, body, options);
            return res.data;
        },
        patch: async <T>(url: string, body?: any, options?: AxiosRequestConfig) => {
            const res = await client.patch<T>(url, body, options);
            return res.data;
        },
        del: async <T>(url: string, options?: AxiosRequestConfig) => {
            const res = await client.delete<T>(url, options);
            return res.data;
        },
    };
};

export const httpPublic = wrap(axiosPublic);
export const httpPrivate = wrap(axiosPrivate);
