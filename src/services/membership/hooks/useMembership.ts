import { useGetAllMemberships, useGetMySubscription } from "../queries";

export const useMembership = () => {
  const { data, isLoading } = useGetAllMemberships();
  return { data, isLoading };
};

export const useSubscription = () => {
  const { data, isLoading } = useGetMySubscription();
  return { data, isLoading };
};
