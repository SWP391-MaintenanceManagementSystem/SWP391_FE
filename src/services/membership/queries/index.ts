import { queryKeys } from "./keys";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getAllMemberships,
  getMySubscription,
  getMySubscriptions,
} from "../apis/membership.api";

export const useGetAllMemberships = () => {
  return useQuery({
    queryKey: queryKeys.memberships,
    queryFn: async () => {
      try {
        const response = await getAllMemberships();
        return response.data.data;
      } catch {
        toast.error("Failed to fetch my memberships");
        return [];
      }
    },
  });
};

export const useGetMySubscription = () => {
  return useQuery({
    queryKey: queryKeys.subscription,
    queryFn: async () => {
      try {
        const response = await getMySubscription();
        return response.data.data;
      } catch {
        toast.error("Failed to fetch subscription");
        return null;
      }
    },
  });
};

export const useGetMySubscriptions = () => {
  return useQuery({
    queryKey: queryKeys.subscriptions,
    queryFn: async () => {
      try {
        const response = await getMySubscriptions();
        toast.success("Fetched all subscriptions successfully");
        return response.data.data;
      } catch {
        toast.error("Failed to fetch all subscriptions");
        return [];
      }
    },
  });
};
