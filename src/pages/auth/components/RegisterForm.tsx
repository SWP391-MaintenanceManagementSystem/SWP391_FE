import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { RegisterFormData } from '../lib/schema';
import { CgGoogle } from 'react-icons/cg';

type RegisterFormProps = {
    onSubmit: (data: RegisterFormData) => Promise<void>;
    form: ReturnType<typeof useForm<RegisterFormData>>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, form }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className='w-full'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name<span className='text-gray-400'>*</span></FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your first name" {...field} required />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name<span className='text-gray-400'>*</span></FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your last name" {...field} required />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email<span className='text-gray-400'>*</span></FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Enter your email" {...field} className='h-10 py-2' required />
                                </FormControl>
                                <FormMessage />

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input type="tel" placeholder="Enter your phone number" {...field} className='h-10 py-2' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your address" {...field} className='h-10 py-2' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password<span className='text-gray-400'>*</span></FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter your password"
                                                className="h-10 py-2 pr-10"
                                                aria-invalid={!!form.formState.errors.password}
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
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password <span className='text-gray-400'><span className='text-gray-400'>*</span></span></FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Confirm your password"
                                                className="h-10 py-2 pr-10"
                                                aria-invalid={!!form.formState.errors.confirmPassword}
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
                    </div>
                    <div className='flex flex-col gap-y-3'>
                        <Button type="submit" className="w-full h-11" disabled={form.formState.isSubmitting}>
                            Register
                        </Button>
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

                </form>
            </Form>
        </div>
    );
};

export default RegisterForm;
