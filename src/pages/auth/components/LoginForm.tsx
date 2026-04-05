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
import { type LoginFormData } from "../lib/schema"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { CgGoogle } from "react-icons/cg";
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next";
type LoginFormProps = {
    form: ReturnType<typeof useForm<LoginFormData>>;
    onSubmit: (data: LoginFormData) => void;
}

export const LoginForm = ({ form, onSubmit }: LoginFormProps) => {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="space-y-6  lg:w-2/3">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("auth.login.email_label")}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t("auth.login.email_placeholder")} {...field} className="h-10 py-2" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("auth.login.password_label")}</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            placeholder={t("auth.login.password_placeholder")}
                                            {...field}
                                            type={showPassword ? "text" : "password"}
                                            className="h-10 py-2"
                                            aria-invalid={!!form.formState.errors.password}
                                        />
                                        <span
                                            onClick={togglePasswordVisibility}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 !bg-transparent text-gray-300 cursor-pointer"
                                        >
                                            {showPassword ? (
                                                <EyeOff size={20} />
                                            ) : (
                                                <Eye size={20} />
                                            )}
                                        </span>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end">
                        <Link to="/forgot-password" className="!text-sm !text-gray-400 !underline">
                            {t("auth.login.forgot_password")}
                        </Link>
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <Button type="submit" className="w-full h-11 mt-2" disabled={form.formState.isSubmitting}>{t("auth.login.sign_in")}</Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full h-11"
                            onClick={() =>
                                (window.location.href = `${import.meta.env.VITE_API_URL}/auth/google/login`)
                            }
                        >
                            <span className="flex items-center justify-center leading-none text-l gap-x-2">
                                <CgGoogle />
                                {t("auth.login.google_login")}
                            </span>


                        </Button>
                    </div>

                </form>
            </Form>

        </div>
    )
}
