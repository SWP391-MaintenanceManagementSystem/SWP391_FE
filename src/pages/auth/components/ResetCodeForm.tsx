import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import type { ForgotPasswordFormData, ResetCodeFormData } from "../lib/schema"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { RESEND_CODE_COOLDOWN } from "@/utils/constant"
import { formatCooldown } from "@/utils"



type ResetCodeFormProps = {
    form: ReturnType<typeof useForm<ResetCodeFormData>>;
    onSubmit: (data: ResetCodeFormData) => void;
    handleResendCode: () => void;
}


export const ResetCodeForm = ({ form, onSubmit, handleResendCode }: ResetCodeFormProps) => {

    const [cooldown, setCooldown] = useState(0);
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (cooldown > 0) {
            timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [cooldown]);
    const handleResendClick = () => {
        if (cooldown === 0) {
            handleResendCode();
            setCooldown(RESEND_CODE_COOLDOWN);
        }
    }

    return (
        <div className="space-y-6 lg:w-2/3">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative">
                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Reset Code</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your reset code" {...field} className="h-10 py-2" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end relative">
                        <Button
                            className="!bg-transparent !text-sm !text-gray-400 flex items-center"
                            variant="link"
                            onClick={handleResendClick}
                            disabled={cooldown > 0}
                        >
                            Resend Code
                            {cooldown > 0 && (
                                <span className="text-xs text-gray-500">
                                    ({formatCooldown(cooldown)})
                                </span>
                            )}
                        </Button>
                    </div>

                    <Button type="submit" className="w-full h-11 mt-2" disabled={form.formState.isSubmitting}>
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    )
}
