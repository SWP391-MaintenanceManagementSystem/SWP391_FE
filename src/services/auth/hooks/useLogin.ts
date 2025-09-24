import { useAuth } from "@/contexts/AuthContext"
import { defaultLoginValues, LoginSchema, type LoginFormData } from "@/pages/auth/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import { toast } from "sonner";
import { AxiosError } from "axios";
import type { ErrorResponse } from "@/types/models/response";
import { AccountStatus } from "@/types/enums/accountStatus";
import { resendVerifyEmail } from "../apis/auth.api";


export default function useLogin() {
    const { handleLogin, setPendingEmail, pendingEmail, setIsNotVerified } = useAuth()
    const navigate = useNavigate()
    const form = useForm<LoginFormData>({ resolver: zodResolver(LoginSchema), defaultValues: defaultLoginValues })
    const onSubmit = async (formData: LoginFormData) => {
        try {
            setPendingEmail(formData.email)
            await handleLogin(formData);
            navigate("/", { replace: true });
        } catch (error: unknown) {
            let msg = "An unexpected error occurred. Please try again later.";
            if (error instanceof AxiosError) {
                msg = error?.response?.data?.message;
                const data = error?.response?.data as ErrorResponse
                if (data?.accountStatus === AccountStatus.NOT_VERIFY) {
                    setIsNotVerified(true)
                }
            }
            toast.error("Login Failed", {
                description: msg,
            });
            form.setValue("password", "");
        }
    };

    const handleResend = async () => {
        if (pendingEmail) {
            try {
                await resendVerifyEmail(pendingEmail);
                toast.success("Verification Email Sent", {
                    description: "Please check your email to verify your account.",
                });
                setPendingEmail("")
                setIsNotVerified(false)
            } catch (error) {
                toast.error("Failed to Resend Verification Email", {
                    description: "An error occurred while resending the verification email. Please try again later.",
                });
            }
        }
    }


    return { form, onSubmit, handleResend }
}
