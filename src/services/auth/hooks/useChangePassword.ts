import { ChangePasswordFormDataValues, ChangePasswordSchema, type ChangePasswordFormData } from "@/pages/profile/components/profile/libs/schema";
import { changePassword } from "../apis/auth.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";


export function useChangePassword() {

    const form = useForm<ChangePasswordFormData>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: ChangePasswordFormDataValues
    });

    const handleChangePassword = async (data: ChangePasswordFormData) => {
        try {
            await changePassword(data);
            form.reset();
            toast.success("Password changed successfully");
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to change password");
        }
    }

    return { form, handleChangePassword };
}
