import { useQuery } from "@tanstack/react-query"
import { getProfile } from "../apis/profile.api"
import { queryKeys } from "./keys";
export const useGetProfile = () => {
    return useQuery({
        queryKey: queryKeys.profile,
        queryFn: async () => {
            const response = await getProfile();
            return response.data.data.account;
        },
        staleTime: 5 * 60 * 1000,
        retry: 2,
        refetchOnWindowFocus: false,
    });
}