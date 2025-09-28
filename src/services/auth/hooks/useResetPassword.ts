import { toast } from "sonner";
import { requestResetPassword, resetPassword, verifyResetPassword } from "../apis/auth.api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { defaultForgotPasswordValues, defaultResetCodeValues, defaultResetPasswordValues, ForgotPasswordSchema, ResetCodeSchema, ResetPasswordSchema, type ForgotPasswordFormData, type ResetCodeFormData, type ResetPasswordFormData } from "@/pages/auth/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";


const PageType = {
    REQUEST: "REQUEST",
    VERIFY: "VERIFY",
    RESET: "RESET",
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
}


export default function useResetPassword() {
    const [pageType, setPageType] = useState(PageType.REQUEST);
    const forgotForm = useForm<ForgotPasswordFormData>({ resolver: zodResolver(ForgotPasswordSchema), defaultValues: defaultForgotPasswordValues })
    const resetForm = useForm<ResetPasswordFormData>({ resolver: zodResolver(ResetPasswordSchema), defaultValues: defaultResetPasswordValues })
    const resetCodeForm = useForm<ResetCodeFormData>({ resolver: zodResolver(ResetCodeSchema), defaultValues: defaultResetCodeValues })
    const form = {
        forgot: forgotForm,
        reset: resetForm,
        code: resetCodeForm,
    }
    const handleRequestReset = async (formData: ForgotPasswordFormData) => {
        try {
            await requestResetPassword(formData.email);
            setPageType(PageType.VERIFY);
            toast.success("Request sent! Please check your email for further instructions.");
        } catch (error) {
            let msg = "Failed to send request. Please try again later.";
            if (error instanceof AxiosError) {
                msg = error.response?.data?.message || msg;
            }
            toast.error(msg);
        }
    }

    const handleResendCode = async () => {
        try {
            await requestResetPassword(forgotForm.getValues("email"));
            toast.success("Reset code resent! Please check your email.");
        }
        catch (error) {
            let msg = "Failed to resend code. Please try again later.";
            if (error instanceof AxiosError) {
                msg = error.response?.data?.message || msg;
            }
            toast.error(msg);
        }
    }

    const handleVerifyReset = async (formData: ResetCodeFormData) => {
        try {
            await verifyResetPassword(formData.code, forgotForm.getValues("email"));
            setPageType(PageType.RESET);
        } catch (error) {
            let msg = "Verification failed. Please check the code and try again.";
            if (error instanceof AxiosError) {
                msg = error.response?.data?.message || msg;
            }
            toast.error(msg);

        }
    }

    const handleReset = async (formData: ResetPasswordFormData) => {
        try {
            await resetPassword(resetCodeForm.getValues("code"), formData.newPassword, formData.confirmNewPassword);
            setPageType(PageType.SUCCESS);
            toast.success("Password reset successful! You can now log in with your new password.");
        } catch (error) {
            resetForm.reset();
            let msg = "Password reset failed. Please try again later.";
            if (error instanceof AxiosError) {
                msg = error.response?.data?.message || msg;
            }
            toast.error(msg);

        }
    }

    return { handleRequestReset, handleVerifyReset, form, pageType, PageType, setPageType, handleReset, handleResendCode };
}
