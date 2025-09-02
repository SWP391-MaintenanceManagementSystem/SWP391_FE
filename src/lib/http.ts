
import type { AxiosRequestConfig } from "axios";
import { axios } from "./axios"


export const http = () => {
    const get = async <T>(url: string, options?: AxiosRequestConfig) => {
        const res = await axios.get<T>(url, options);
        return res.data;
    };

    const post = async <T>(url: string, body?: any, options?: AxiosRequestConfig) => {
        const res = await axios.post<T>(url, body, options);
        return res.data;
    };

    const patch = async <T>(url: string, body?: any, options?: AxiosRequestConfig) => {
        const res = await axios.patch<T>(url, body, options);
        return res.data;
    };

    const del = async <T>(url: string, options?: AxiosRequestConfig) => {
        const res = await axios.delete<T>(url, options);
        return res.data;
    };

    return { get, post, patch, del };
};