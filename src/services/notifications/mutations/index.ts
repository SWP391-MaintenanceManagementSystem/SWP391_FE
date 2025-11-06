import { useMutation } from "@tanstack/react-query";
import {
  markNotificationAsRead,
  markNotificationAsReadAll,
} from "../apis/notification.api";
import { toast } from "sonner";

export const useMarkAsReadMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        await markNotificationAsRead(id);
      } catch (error) {
        toast.error("Failed to mark notification as read");
        throw error;
      }
    },
  });
};

export const useMarkAsReadAllMutation = () => {
  return useMutation({
    mutationFn: async () => {
      try {
        await markNotificationAsReadAll();
      } catch (error) {
        toast.error("Failed to mark all notifications as read");
        throw error;
      }
    },
  });
};
