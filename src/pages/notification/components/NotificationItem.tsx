import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { NotificationType } from "@/types/enums/notificationType";
import type { Notification } from "@/types/models/notification";
import {
  CalendarClock,
  CreditCard,
  Info,
  SparkleIcon,
  TicketPlus,
} from "lucide-react";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

export function NotificationItem({
  notification,
  onMarkAsRead,
}: NotificationItemProps) {
  const getIcon = () => {
    switch (notification.notification_type) {
      case NotificationType.BOOKING:
        return (
          <TicketPlus className="w-5 h-5 text-green-600 dark:text-green-400" />
        );
      case NotificationType.MEMBERSHIP:
        return (
          <SparkleIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
        );
      case NotificationType.PAYMENT:
        return (
          <CreditCard className="w-5 h-5 text-red-600 dark:text-red-400" />
        );
      case NotificationType.SHIFT:
        return (
          <CalendarClock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        );
      case NotificationType.SYSTEM:
        return <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      default:
        return <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  return (
    <Card
      className={`p-4 cursor-pointer transition-all hover:shadow-md ${
        !notification.is_read
          ? "bg-purple-50 border-purple-200 dark:bg-purple-950 dark:border-purple-800"
          : "bg-white dark:bg-gray-900"
      }`}
      onClick={() => !notification.is_read && onMarkAsRead(notification.id)}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">{getIcon()}</div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4
                  className={`${!notification.is_read ? "font-medium" : ""} truncate`}
                >
                  {notification.title}
                </h4>
                <Badge
                  variant="outline"
                  className="text-xs capitalize dark:border-gray-700"
                >
                  {notification.notification_type.toLowerCase()}
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {notification.content}
              </p>
            </div>

            {!notification.is_read && (
              <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full flex-shrink-0 mt-2" />
            )}
          </div>

          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
            <span>{formatDate(new Date(notification.sent_at))}</span>
            <span>
              {new Date(notification.sent_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
