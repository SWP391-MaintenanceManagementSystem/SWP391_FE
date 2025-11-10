import { queryKeys } from "./keys";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { getAllMemberships, getMySubscription } from "../apis/membership.api";

export const useGetAllMemberships = () => {
  return useQuery({
    queryKey: queryKeys.memberships,
    queryFn: async () => {
      try {
        const response = await getAllMemberships();
        return response.data.data;
      } catch (error) {
        console.log("Failed to fetch all memberships");
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
      } catch (error) {
        console.log("Failed to fetch my subscription");
        return null;
      }
    },
  });
};
