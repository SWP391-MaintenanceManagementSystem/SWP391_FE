import MainContentLayout from "@/components/MainContentLayout";
import { Bell, CheckCheck, Filter } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import NotificationList from "./components/NotificationList";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import {
  useGetNotifications,
  useGetUnreadNotificationsCount,
} from "@/services/notifications/queries";

export default function NotificationSystem() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Server-side filtering via is_read param
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetNotifications({
      pageSize: 10,
      is_read:
        activeTab === "unread"
          ? false
          : activeTab === "read"
            ? true
            : undefined,
    });

  // Flatten all pages into single array
  const notifications = useMemo(() => {
    const pages = data?.pages ?? [];
    return pages.flatMap((page) => page.data);
  }, [data?.pages]);

  const { data: unreadCount } = useGetUnreadNotificationsCount();

  // Infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
      },
      { threshold: 1.0 },
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
      <MainContentLayout className="mt-0 grid grid-rows-[auto_1fr] pb-0">
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
            {unreadCount! > 0 && (
              <>
                <Badge variant="default" className="px-3 py-1">
                  {unreadCount} unread
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <CheckCheck className="w-4 h-4" />
                  Mark all as read
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between mr-10">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="all">
                All ({notifications.length})
              </TabsTrigger>
              <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
              <TabsTrigger value="read">
                Read ({notifications.length - unreadCount!})
              </TabsTrigger>
            </TabsList>
            <Filter size={18} />
          </div>

          <TabsContent
            value={activeTab}
            className="mt-6 max-h-[calc(100vh-200px)] overflow-y-auto flex flex-col gap-2"
          >
            <NotificationList
              notifications={notifications}
              onMarkAsRead={() => console.log("Mark Read")}
            />

            {(isLoading || isFetchingNextPage) && (
              <div className="grid justify-center items-center w-full h-full py-2">
                <Spinner />
              </div>
            )}

            {hasNextPage && <div ref={loadMoreRef} className="h-10" />}

            {!hasNextPage && notifications.length > 0 && (
              <p className="text-center text-sm text-muted-foreground py-2">
                No more notifications.
              </p>
            )}

            {notifications.length === 0 &&
              !isLoading &&
              !isFetchingNextPage && (
                <p className="text-center text-sm text-muted-foreground py-2">
                  No notifications yet.
                </p>
              )}
          </TabsContent>
        </Tabs>
      </MainContentLayout>
    </div>
  );
}
