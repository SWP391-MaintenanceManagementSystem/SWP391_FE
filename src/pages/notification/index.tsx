import MainContentLayout from "@/components/MainContentLayout";
import { Bell } from "lucide-react";

export default function NotificationSystem() {
  return (
    <div className="w-full h-[calc(100vh-32px)] font-inter">
      <MainContentLayout className="mt-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Bell className="w-8 h-8 text-primary" />
            <div>
              <h2 className="text-3xl font-medium">Notifications</h2>
              <p className="text-muted-foreground">
                Stay updated with your latest activities
              </p>
            </div>
          </div>
        </div>
      </MainContentLayout>
    </div>
  );
}
