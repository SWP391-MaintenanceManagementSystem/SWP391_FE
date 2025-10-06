import type { AccountStatus } from "../enums/accountStatus";

export interface BaseResponse<T> {
  success: boolean;
  data: T;
  message: string;
  timestamp: string;
  path: string;
}

export interface StatusStat {
  status: string;
  count: number;
  percentage: number;
}

export interface StatusStatResponse {
  data: StatusStat[];
  total: number;
}

export interface PaginationResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ErrorResponse {
  success: boolean;
  statusCode: number;
  message: string;
  timestamp: string;
  errors: null;
  data: null;
  accountStatus?: AccountStatus | null;
  path: string;
}
