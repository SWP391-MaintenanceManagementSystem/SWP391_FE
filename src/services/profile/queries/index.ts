import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../apis/profile.api";
import { queryKeys } from "./keys";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
export const useGetProfile = () => {
<<<<<<< HEAD
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
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
  });
};
=======
    const { setAuth } = useAuth();
    return useQuery({
        queryKey: queryKeys.profile,
        queryFn: async () => {
            try {
                const response = await getProfile();
                setAuth((prev) => ({ ...prev, user: response.data.account }));
                return response.data.account;
            } catch (error) {
                toast.error("Failed to fetch profile");
            }
        },
        staleTime: 5 * 60 * 1000,
    });
}
>>>>>>> c136a9d80eab19a68d0335e55e15b4d4b69b9f05
