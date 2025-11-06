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
import { Bell, CheckCheck } from "lucide-react";
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
          timeout = setTimeout(() => fetchNextPage(), 100); // debounce
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

  return (
    <Popover>
      <TooltipWrapper content="View Notifications">
        <PopoverTrigger asChild className=" absolute right-8 hidden md:flex">
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
          className="flex flex-col h-full mt-4"
        >
          {/* Tabs header */}
          <TabsList className="grid w-full grid-cols-3 max-w-md mb-4">
            <TabsTrigger value="all">All ({totalCount})</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="read">Read ({readCount})</TabsTrigger>
          </TabsList>

          {/* Notifications list */}
          <div className="flex-1 overflow-y-auto max-h-[50vh] min-h-[40vh]">
            <TabsContent value={activeTab} className="space-y-4">
              {isLoadingNotifications ? (
                <div className="w-full h-full flex justify-center items-center">
                  <Spinner />
                </div>
              ) : notifications.length > 0 ? (
                <>
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={() => onMarkAsRead(notification.id)}
                      type="SMALL"
                    />
                  ))}
                  {/* Infinite scroll sentinel */}
                  {hasNextPage && (
                    <div
                      ref={loadMoreRef}
                      className="h-10 flex justify-center items-center"
                    >
                      {isFetchingNextPage && <Spinner />}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex justify-center items-center h-full">
                  <p className="text-gray-500">No notifications</p>
                </div>
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
