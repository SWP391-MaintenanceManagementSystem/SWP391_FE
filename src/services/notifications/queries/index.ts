import {
  useInfiniteQuery,
  useQuery,
  type InfiniteData,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "./keys";
import {
  getNotifications,
  getUnreadNotifications,
} from "../apis/notification.api";
import type {
  NotificationFilter,
  NotificationItem,
} from "@/types/models/notification";

export type NotificationResponse = {
  data: NotificationItem[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export const useGetNotifications = (
  params: Omit<NotificationFilter, "page">,
) => {
  return useInfiniteQuery<
    NotificationResponse, // TQueryFnData
    Error, // TError
    InfiniteData<NotificationResponse>, // TData → có .pages
    ReturnType<typeof queryKeys.notifications>, // TQueryKey
    number // TPageParam
  >({
    queryKey: queryKeys.notifications(params),
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const res = await getNotifications({ ...params, page: pageParam });
        return res.data as NotificationResponse;
      } catch (error) {
        toast.error("Failed to fetch notifications list");
        throw error;
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: NotificationResponse): number | undefined =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    enabled: !!params.pageSize,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetUnreadNotificationsCount = () => {
  return useQuery({
    queryKey: queryKeys.unreadNotificationsCount(),
    queryFn: async () => {
      try {
        const res = await getUnreadNotifications();
        return res.data.count;
      } catch (error) {
        toast.error("Failed to get unread notifications count");
        throw error;
      }
    },
  });
};
