import { useBookingDetailQuery } from "../queries";

export const useBookingDetail = (id: string) => {
  const { data, isLoading, error } = useBookingDetailQuery(id);
  return { data, isLoading, error };
};