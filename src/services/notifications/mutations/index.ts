import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  markNotificationAsRead,
  markNotificationAsReadAll,
} from "../apis/notification.api";
import { toast } from "sonner";

export const useMarkAsReadMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        await markNotificationAsRead(id);
      } catch (error) {
        toast.error("Failed to mark notification as read");
        throw error;
      }
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["notifications"],
        }),

        queryClient.invalidateQueries({
          queryKey: ["notificationsCount"],
        }),
      ]);
    },
    onError: () => {
      toast.error("Failed to mark notification as read");
    },
  });
};

export const useMarkAsReadAllMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      try {
        await markNotificationAsReadAll();
      } catch (error) {
        toast.error("Failed to mark all notifications as read");
        throw error;
      }
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["notifications"],
        }),

        queryClient.invalidateQueries({
          queryKey: ["notificationsCount"],
        }),
      ]);
    },
    onError: () => {
      toast.error("Failed to mark all notifications as read");
    },
  });
};
