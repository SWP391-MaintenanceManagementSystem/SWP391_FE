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
import type { ResetPasswordFormData } from "../lib/schema"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"



type ResetPasswordProps = {
    form: ReturnType<typeof useForm<ResetPasswordFormData>>;
    onSubmit: (data: ResetPasswordFormData) => void;
}


export const ResetPasswordForm = ({ form, onSubmit }: ResetPasswordProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    return (
        <div className="space-y-6  lg:w-2/3">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative">
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password<span className='text-gray-400'>*</span></FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            className="h-10 py-2 pr-10"
                                            aria-invalid={!!form.formState.errors.newPassword}
                                            required
                                        />
                                        <span
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </span>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmNewPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm New Password <span className='text-gray-400'><span className='text-gray-400'>*</span></span></FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm your password"
                                            className="h-10 py-2 pr-10"
                                            aria-invalid={!!form.formState.errors.confirmNewPassword}
                                            required
                                        />
                                        <span
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                                        >
                                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </span>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full h-11 mt-2" disabled={form.formState.isSubmitting}>
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    )
}
