export interface BaseResponse<T> {
    success: boolean;
    data: T;
    message: string;
    timestamp: string;
    path: string;
}

export interface PaginationResponse<T> {
    data: T[];
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
}