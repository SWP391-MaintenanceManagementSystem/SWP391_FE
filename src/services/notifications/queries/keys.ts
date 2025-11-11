import type { NotificationFilter } from "@/types/models/notification";

export const queryKeys = {
  notifications: (params: NotificationFilter) =>
    ["notifications", params] as const,

  notificationsCount: () => ["notificationsCount"] as const,
};
