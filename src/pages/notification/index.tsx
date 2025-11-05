import MainContentLayout from "@/components/MainContentLayout";

import type { Notification } from "@/types/models/notification";
import { Bell, CheckCheck } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import NotificationList from "./components/NotificationList";
import { fetchNotifications } from "./mockApi";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const pageSize = 10;

  const unreadCount = notifications.filter((n) => !n.is_read).length;
  const [activeTab, setActiveTab] = useState("all");

  // Fetch data theo page
  useEffect(() => {
    const loadData = async () => {
      if (loading || !hasNextPage) return;
      setLoading(true);
      const res = await fetchNotifications({ page, limit: pageSize });
      setNotifications((prev) => [...prev, ...res.data]);
      setHasNextPage(res.pagination.hasNextPage);
      setLoading(false);
    };
    loadData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 },
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, loading]);

  // Filter theo tab
  const filteredNotifications = useMemo(() => {
    if (activeTab === "unread") return notifications.filter((n) => !n.is_read);
    if (activeTab === "read") return notifications.filter((n) => n.is_read);
    return notifications;
  }, [notifications, activeTab]);

  // Mark as read
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)),
    );
  };

  useEffect(() => {
    setPage(1);
    setNotifications([]);
    setHasNextPage(true);
  }, [activeTab]);

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
            {unreadCount > 0 && (
              <>
                <Badge variant="default" className="px-3 py-1">
                  {unreadCount} unread
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkAllAsRead}
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
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="read">
              Read ({notifications.length - unreadCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value={activeTab}
            className="mt-6 max-h-[calc(100vh-200px)] overflow-y-auto flex flex-col gap-2"
          >
            <NotificationList
              notifications={filteredNotifications}
              onMarkAsRead={handleMarkAsRead}
            />
            {loading && (
              <div className="grid justify-center items-center w-full h-full">
                <Spinner />
              </div>
            )}
            {hasNextPage && <div ref={loadMoreRef} className="h-10" />}
            {filteredNotifications.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-2">
                No notifications yet.
              </p>
            ) : hasNextPage ? (
              <div ref={loadMoreRef} className="h-10" />
            ) : (
              <p className="text-center text-sm text-muted-foreground py-2">
                No more notifications.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </MainContentLayout>
    </div>
  );
}
