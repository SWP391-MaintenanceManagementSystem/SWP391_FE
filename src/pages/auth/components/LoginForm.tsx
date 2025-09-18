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
type LoginFormProps = {
    form: ReturnType<typeof useForm<LoginFormData>>;
    onSubmit: (data: LoginFormData) => void;
}

export const LoginForm = ({ form, onSubmit }: LoginFormProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="space-y-6 lg:w-2/3">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your email" {...field} className="h-12 py-2" />
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            placeholder="Enter your password"
                                            {...field}
                                            type={showPassword ? "text" : "password"}
                                            className="h-12 py-2"
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
                    <Button type="submit" className="w-full">Sign In</Button>

                </form>
            </Form>
            <Button
                type="button"
                variant="outline"
                className="w-full h-11
                        flex items-center justify-center
                        rounded-xl border !border-gray-300
                        !bg-white text-sm font-medium !text-gray-700
                        shadow-sm !hover:bg-gray-50
                         transition"
                onClick={() =>
                    (window.location.href = `${import.meta.env.VITE_API_URL}/auth/google/login`)
                }
            >
                <span className="flex items-center justify-center leading-none text-l gap-x-2">
                    <CgGoogle />
                    Continue with Google
                </span>


            </Button>

        </div>
    )
}
