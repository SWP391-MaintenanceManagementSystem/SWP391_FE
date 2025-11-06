import { httpPrivate } from "@/lib/http";
import type {
  NotificationItem,
  NotificationFilter,
  NotificationCount,
} from "@/types/models/notification";
import type { BaseResponse, PaginationResponse } from "@/types/models/response";

export const getNotifications = async (params: NotificationFilter) => {
  return httpPrivate.get<BaseResponse<PaginationResponse<NotificationItem>>>(
    "/notifications",
    {
      params,
    },
  );
};

export const getNotificationsCount = async () => {
  return httpPrivate.get<BaseResponse<NotificationCount>>(
    "/notifications/count",
  );
};
