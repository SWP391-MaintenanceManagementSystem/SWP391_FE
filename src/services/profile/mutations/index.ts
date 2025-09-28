import type { ChangeProfileFormData } from "@/pages/profile/components/profile/libs/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInfo } from "../apis/profile.api";
import { toast } from "sonner";
import { getAuthStorage, setAuthStorage } from "@/contexts/AuthContext";
import { queryKeys } from "../queries/keys";

export const useUpdateProfileMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: ChangeProfileFormData) => {
            const { email, ...rest } = data;
            const updatedUser = await updateInfo(rest);
            return updatedUser.data.data.account;
        },
        onSuccess: () => {
            const currentAuth = getAuthStorage();
            setAuthStorage({ ...currentAuth });
            queryClient.invalidateQueries({ queryKey: queryKeys.profile });
            toast.success("Profile updated successfully");
        },
        onError: (err: any) => {
            toast.error(err.message || "Failed to update profile");
        },
    });
};
