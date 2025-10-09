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
        toast.success("Fetched my vehicles successfully");
        return response.data.data;
      } catch (error) {
        toast.error("Failed to fetch my vehicles");
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
        toast.success("Fetched subscription successfully");
        return response.data.data; 
      } catch (error) {
        toast.error("Failed to fetch subscription");
        return null;
      }
    },
  });
};