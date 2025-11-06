import { useEffect } from "react";
import { useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { notificationSocket } from "@/lib/socket";
import type { NotificationItem } from "@/types/models/notification";
import type { NotificationResponse } from "../queries";

export function usePersistentNotificationSocket(
  userId?: string,
  notificationsQueryKey?: readonly unknown[],
) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userId || !notificationsQueryKey) return;

    if (!notificationSocket.connected) notificationSocket.connect();
    notificationSocket.emit("join", userId);

    const updateCache = (newNotification: NotificationItem) => {
      queryClient.setQueryData<InfiniteData<NotificationResponse>>(
        notificationsQueryKey,
        (oldData) => {
          if (!oldData) {
            return {
              pages: [
                {
                  data: [newNotification],
                  page: 1,
                  pageSize: 10,
                  total: 1,
                  totalPages: 1,
                },
              ],
              pageParams: [1],
            };
          }
          const pages = [...oldData.pages];
          pages[0] = { ...pages[0], data: [newNotification, ...pages[0].data] };
          return { ...oldData, pages };
        },
      );
    };

    notificationSocket.on("notification", (n: NotificationItem) => {
      updateCache(n);
      queryClient.invalidateQueries({ queryKey: ["notificationsCount"] });
    });

    notificationSocket.on(
      "notification:read",
      ({ notificationId }: { notificationId: string }) => {
        queryClient.setQueryData<InfiniteData<NotificationResponse>>(
          notificationsQueryKey,
          (oldData) => {
            if (!oldData) return oldData;
            const pages = oldData.pages.map((page) => ({
              ...page,
              data: page.data.map((n) =>
                n.id === notificationId ? { ...n, is_read: true } : n,
              ),
            }));
            return { ...oldData, pages };
          },
        );
        queryClient.invalidateQueries({ queryKey: ["notificationsCount"] });
      },
    );

    notificationSocket.on("notification:read-all", () => {
      queryClient.setQueryData<InfiniteData<NotificationResponse>>(
        notificationsQueryKey,
        (oldData) => {
          if (!oldData) return oldData;
          const pages = oldData.pages.map((page) => ({
            ...page,
            data: page.data.map((n) => ({ ...n, is_read: true })),
          }));
          return { ...oldData, pages };
        },
      );
      queryClient.invalidateQueries({ queryKey: ["notificationsCount"] });
    });

    notificationSocket.on(
      "notification:deleted",
      ({ notificationId }: { notificationId: string }) => {
        queryClient.setQueryData<InfiniteData<NotificationResponse>>(
          notificationsQueryKey,
          (oldData) => {
            if (!oldData) return oldData;
            const pages = oldData.pages.map((page) => ({
              ...page,
              data: page.data.filter((n) => n.id !== notificationId),
            }));
            return { ...oldData, pages };
          },
        );
        queryClient.invalidateQueries({ queryKey: ["notificationsCount"] });
      },
    );

    return () => {
      notificationSocket.emit("leave", userId);
      notificationSocket.off("notification");
      notificationSocket.off("notification:read");
      notificationSocket.off("notification:read-all");
      notificationSocket.off("notification:deleted");
    };
  }, [userId, notificationsQueryKey, queryClient]);
}
