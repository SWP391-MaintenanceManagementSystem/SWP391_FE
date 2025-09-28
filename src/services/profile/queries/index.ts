import { useQuery } from "@tanstack/react-query"
import { getProfile } from "../apis/profile.api"
import { queryKeys } from "./keys";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
export const useGetProfile = () => {
    const { setAuth } = useAuth();
    return useQuery({
        queryKey: queryKeys.profile,
        queryFn: async () => {
            try {
                const response = await getProfile();
                setAuth((prev) => ({ ...prev, user: response.data.data.account }));
                return response.data.data.account;
            } catch (error) {
                toast.error("Failed to fetch profile");
            }
        },
        staleTime: 5 * 60 * 1000,
    });
}