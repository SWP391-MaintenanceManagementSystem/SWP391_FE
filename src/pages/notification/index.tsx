import MainContentLayout from "@/components/MainContentLayout";
import { Bell, BellOff, CheckCheck, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@uidotdev/usehooks";
import { NotificationItem } from "./components/NotificationItem";
import { NotificationTypeFilter } from "./components/NotificationTypeFilter";
import type { NotificationType } from "@/types/enums/notificationType";
import { useAuth } from "@/contexts/AuthContext";
import { usePersistentNotificationSocket } from "@/services/notifications/hooks/useNotificationSocket";
import {
  useGetNotifications,
  useGetNotificationsCount,
} from "@/services/notifications/queries";
import {
  useMarkAsRead,
  useMarkAsReadAll,
} from "@/services/notifications/hooks/useMarkAsRead";
import NotificationSkeleton from "./components/NotificationSkeleton";

export default function NotificationSystem() {
  const { auth } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchValue, setSearchValue] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<NotificationType[]>([]);
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Query params
  const notificationQueryParams = {
    pageSize: 10,
    search: debouncedSearchValue,
    notification_type: typeFilter.length > 0 ? typeFilter : undefined,
    is_read:
      activeTab === "unread" ? false : activeTab === "read" ? true : undefined,
  };

  const notificationsQueryKey = [
    "notifications",
    notificationQueryParams,
  ] as const;

  // Connect socket
  usePersistentNotificationSocket(auth?.user?.id, notificationsQueryKey);

  // Notifications query
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetNotifications(notificationQueryParams);
  const notifications = useMemo(
    () => (data?.pages ?? []).flatMap((p) => p.data),
    [data?.pages],
  );

  // Notifications count
  const { data: notificationCount, isLoading: isNotificationCountLoading } =
    useGetNotificationsCount();
  const unreadCount = notificationCount?.unreadCount ?? 0;
  const totalCount = notificationCount?.total ?? 0;
  const readCount = notificationCount?.readCount ?? 0;

  // Infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
      },
      { threshold: 1 },
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  const clearSearch = () => setSearchValue("");

  const { onMarkAsRead } = useMarkAsRead();
  const { onMarkAsReadAll } = useMarkAsReadAll();

  if (isNotificationCountLoading && isLoading) return <NotificationSkeleton />;

  return (
    <div className="w-full h-screen font-inter">
      <MainContentLayout className="mt-0 grid grid-rows-[auto_auto_1fr] h-full overflow-visible pb-0">
        {/* Header */}
        <div className="mr-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-8 h-8 text-primary" />
            <div>
              <h2 className="text-3xl font-medium">Notifications</h2>
              <p className="text-muted-foreground">
                Stay updated with your latest activities
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <>
                <Badge variant="default" className="px-3 py-1">
                  {unreadCount} unread
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={onMarkAsReadAll}
                >
                  <CheckCheck className="w-4 h-4" /> Mark all as read
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search notifications..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchValue && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-col h-full"
        >
          <div className="flex gap-4">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="all">All ({totalCount})</TabsTrigger>
              <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
              <TabsTrigger value="read">Read ({readCount})</TabsTrigger>
            </TabsList>
            <NotificationTypeFilter
              value={typeFilter}
              setValue={setTypeFilter}
            />
          </div>

          <div className="max-h-[calc(100vh-260px)] overflow-y-auto mt-6">
            <TabsContent value={activeTab} className="space-y-4">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={() => onMarkAsRead(notification.id)}
                    type="LARGE"
                  />
                ))
              ) : isLoading || isFetchingNextPage ? (
                <div className="flex justify-center items-center w-full h-full gap-2 mt-6">
                  <Spinner />
                  <p className="text-muted-foreground">
                    Please wait while we fetch your notifications.
                  </p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <BellOff className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    {searchValue
                      ? "No notifications found"
                      : "No notifications"}
                  </h3>
                  <p className="text-muted-foreground">
                    {searchValue
                      ? `No notifications match "${searchValue}". Try adjusting your search terms.`
                      : activeTab === "unread"
                        ? "You're all caught up! No unread notifications."
                        : activeTab === "read"
                          ? "No read notifications found."
                          : "You don't have any notifications yet."}
                  </p>
                </div>
              )}
              <div ref={loadMoreRef}></div>
            </TabsContent>
          </div>
        </Tabs>
      </MainContentLayout>
    </div>
  );
}
