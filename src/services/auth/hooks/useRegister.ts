

import { defaultRegisterValues, RegisterSchema, type RegisterFormData } from '@/pages/auth/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { register } from '../apis/auth.api';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';
export default function useRegister() {
    const form = useForm<RegisterFormData>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: defaultRegisterValues
    });
    const navigate = useNavigate();
    const onSubmit = async (formData: RegisterFormData) => {
        try {
            await register(formData);
            toast.success("Registration Successful", {
                description: "Please check your email to verify your account.",
            });
            navigate("/login");
        } catch (err: unknown) {
            const error = err as AxiosError<{ message?: string }>;

            if (error.response?.data?.message) {
                const msg = error.response.data.message;

                if (msg.includes("email")) {
                    form.setError("email", { type: "server", message: msg });
                    return;
                }

                toast.error("Registration Failed", {
                    description: msg,
                });
                return;
            }

            toast.error("Registration Failed", {
                description: "An error occurred while registering your account.",
            });
        }
    };

    return { form, onSubmit }
}
