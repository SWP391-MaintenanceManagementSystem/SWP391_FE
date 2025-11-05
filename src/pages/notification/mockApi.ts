import { NotificationType } from "@/types/enums/notificationType";
import type { Notification } from "@/types/models/notification";

const allNotifications: Notification[] = Array.from({ length: 60 }).map(
  (_, i) => ({
    id: (i + 1).toString(),
    accountId: "user-001",
    title: `Notification #${i + 1}`,
    content: `This is content for notification #${i + 1}`,
    notification_type: Object.values(NotificationType)[i % 5],
    is_read: i % 4 === 0,
    sent_at: new Date(2025, 10, 5 - (i % 7), 9, i * 2).toISOString(),
  }),
);

export async function fetchNotifications({
  page = 1,
  limit = 10,
  type,
}: {
  page?: number;
  limit?: number;
  type?: NotificationType | "ALL";
}) {
  let filtered = allNotifications;
  if (type && type !== "ALL") {
    filtered = filtered.filter((n) => n.notification_type === type);
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const data = filtered.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filtered.length / limit);

  await new Promise((r) => setTimeout(r, 500));

  return {
    success: true,
    message: "Notifications fetched successfully.",
    data,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: filtered.length,
      hasNextPage: page < totalPages,
    },
  };
}
