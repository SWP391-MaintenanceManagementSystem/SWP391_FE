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
import { zodResolver } from "@hookform/resolvers/zod"
import { defaultLoginValues, LoginSchema, type LoginFormData } from "../lib/schema"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { FcGoogle } from "react-icons/fc";
type LoginFormProps = {
    onSubmit: (data: LoginFormData) => void;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const form = useForm<LoginFormData>({ resolver: zodResolver(LoginSchema), defaultValues: defaultLoginValues })
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="space-y-6">


            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your email" {...field} />
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
                                            className="pr-10"
                                        />
                                        <Button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-gray-500 hover:text-gray-700 focus:outline-none"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">Sign In</Button>

                </form>
            </Form>
            <div className="flex items-center gap-4 my-6">
                <div className="flex-1 border-t" />
                <span className="text-xs uppercase text-muted-foreground">
                    Or continue with
                </span>
                <div className="flex-1 border-t" />
            </div>

            <Button
                type="button"
                variant="outline"
                className="w-full h-11
                        flex items-center justify-center gap-3
                        rounded-xl border border-gray-300
                        bg-white text-sm font-medium text-gray-700
                        shadow-sm hover:bg-gray-50
                         transition"
                onClick={() =>
                    (window.location.href = `${import.meta.env.VITE_API_URL}/auth/google/login`)
                }
            >
                <FcGoogle className="h-5 w-5" />
                <span>Continue with Google</span>
            </Button>

        </div>
    )
}
