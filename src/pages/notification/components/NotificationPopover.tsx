import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useGetNotifications,
  useGetNotificationsCount,
} from "@/services/notifications/queries";
import {
  useMarkAsRead,
  useMarkAsReadAll,
} from "@/services/notifications/hooks/useMarkAsRead";
import { Bell, BellOff, CheckCheck } from "lucide-react";
import { NotificationItem } from "./NotificationItem";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import { useState, useMemo, useEffect, useRef } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { usePersistentNotificationSocket } from "@/services/notifications/hooks/useNotificationSocket";
import { useAuth } from "@/contexts/AuthContext";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useNavigate } from "react-router-dom";

export default function NotificationsPopover() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  // Notification counts
  const { data: notificationsCount } = useGetNotificationsCount();
  const unreadCount = notificationsCount?.unreadCount ?? 0;
  const readCount = notificationsCount?.readCount ?? 0;
  const totalCount = notificationsCount?.total ?? 0;

  const [activeTab, setActiveTab] = useState("all");

  // Query params
  const notificationQueryParams = {
    pageSize: 10,
    is_read:
      activeTab === "unread" ? false : activeTab === "read" ? true : undefined,
  };

  const notificationsQueryKey = [
    "notifications",
    notificationQueryParams,
  ] as const;

  // Socket connection
  usePersistentNotificationSocket(auth?.user?.id, notificationsQueryKey);

  // Notifications query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingNotifications,
  } = useGetNotifications(notificationQueryParams);

  const notifications = useMemo(
    () => data?.pages.flatMap((p) => p.data) ?? [],
    [data?.pages],
  );

  const { onMarkAsRead } = useMarkAsRead();
  const { onMarkAsReadAll } = useMarkAsReadAll();

  // Infinite scroll
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!loadMoreRef.current) return;
    let timeout: NodeJS.Timeout;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          clearTimeout(timeout);
          timeout = setTimeout(() => fetchNextPage(), 100);
        }
      },
      { threshold: 1 },
    );
    observer.observe(loadMoreRef.current);
    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [hasNextPage, fetchNextPage]);

  // Group notifications by Today / Yesterday
  const groupedNotifications = useMemo(() => {
    const today: typeof notifications = [];
    const yesterday: typeof notifications = [];
    const now = new Date();
    const yest = new Date();
    yest.setDate(now.getDate() - 1);

    notifications.forEach((n) => {
      const sent = new Date(n.sent_at);
      if (sent.toDateString() === now.toDateString()) today.push(n);
      else if (sent.toDateString() === yest.toDateString()) yesterday.push(n);
    });

    return { today, yesterday };
  }, [notifications]);

  const renderNotificationSection = (
    title: string,
    list: typeof notifications,
  ) => {
    if (list.length === 0) return null;
    return (
      <div className="mb-3">
        <h3 className="font-semibold text-gray-600 dark:text-gray-400 mb-2">
          {title}
        </h3>
        <div className="space-y-2">
          {list.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={() => onMarkAsRead(notification.id)}
              type="SMALL"
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <Popover>
      <TooltipWrapper content="View Notifications">
        <PopoverTrigger asChild className="absolute right-8 hidden md:flex">
          <div className="cursor-pointer">
            <Bell />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 rounded-full bg-red-500 text-white flex items-center justify-center text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
        </PopoverTrigger>
      </TooltipWrapper>

      <PopoverContent
        side="bottom"
        align="end"
        sideOffset={6}
        className="w-96 font-inter max-h-[800px] overflow-hidden data-[state=open]:!zoom-in-0 data-[state=closed]:!zoom-out-0 origin-top-right duration-400"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-2">
          <h2 className="font-semibold text-xl">Your Notifications</h2>
          {unreadCount > 0 && (
            <Button
              size="sm"
              className="border-0 shadow-none"
              variant="outline"
              onClick={onMarkAsReadAll}
            >
              <CheckCheck />
              Mark all read
            </Button>
          )}
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-col h-full"
        >
          <TabsList className="grid w-full grid-cols-3 max-w-md mb-4">
            <TabsTrigger value="all">All ({totalCount})</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="read">Read ({readCount})</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto max-h-[50vh] min-h-[40vh] space-y-4">
            <TabsContent value={activeTab}>
              {isLoadingNotifications ? (
                <div className="w-full h-full flex justify-center items-center">
                  <Spinner />
                </div>
              ) : (
                <>
                  {renderNotificationSection(
                    "Today",
                    groupedNotifications.today,
                  )}
                  {renderNotificationSection(
                    "Yesterday",
                    groupedNotifications.yesterday,
                  )}

                  {groupedNotifications.today.length === 0 &&
                    groupedNotifications.yesterday.length === 0 && (
                      <div className="text-center py-12">
                        <BellOff className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">
                          No Notifications
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {activeTab === "unread"
                            ? "You're all caught up! No unread notifications."
                            : activeTab === "read"
                              ? "No read notifications found."
                              : "You don't have any notifications yet."}
                        </p>
                      </div>
                    )}

                  {hasNextPage && (
                    <div
                      ref={loadMoreRef}
                      className="h-10 flex justify-center items-center"
                    >
                      {isFetchingNextPage && <Spinner />}
                    </div>
                  )}
                </>
              )}
            </TabsContent>
          </div>

          {/* Footer */}
          <div className="flex py-4 justify-between items-center border-t">
            <p className="text-sm font-semibold text-gray-500">
              Manage Notifications
            </p>
            <Button
              variant="secondary"
              className="hover:bg-purple-primary hover:text-white"
              onClick={() => navigate("/notification")}
            >
              View all notifications
            </Button>
          </div>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
