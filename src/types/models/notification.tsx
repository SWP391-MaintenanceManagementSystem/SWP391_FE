import type { NotificationType } from "../enums/notificationType";

export type Notification = {
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
