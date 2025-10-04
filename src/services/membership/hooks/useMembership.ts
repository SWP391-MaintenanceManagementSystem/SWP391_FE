import { useGetAllMemberships } from "../queries";

export const useMembership = () => {
  const { data, isLoading } = useGetAllMemberships();
  return { data, isLoading };
};
