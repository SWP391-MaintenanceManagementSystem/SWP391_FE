import { useGetCentersQuery } from "../queries";

export default function useCenters() {
  const { data, isLoading, error } = useGetCentersQuery();
  return { data, isLoading, error };
}
