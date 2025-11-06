import type { NotificationType } from "../enums/notificationType";

export type NotificationItem = {
  id: string;
  accountId: string;
  title: string;
  content: string;
  notification_type: NotificationType;
  is_read: boolean;
  sent_at: string;
  read_at?: string | null;
  created_at?: string;
};

export type NotificationFilter = {
  search?: string;
  notification_type?: NotificationType | NotificationType[];
  is_read?: boolean;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  orderBy?: "asc" | "desc";
};

export type NotificationCount = {
  total: number;
  unreadCount: number;
  readCount: number;
};
