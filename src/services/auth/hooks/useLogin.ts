import { useAuth } from "@/contexts/AuthContext"
import { defaultLoginValues, LoginSchema, type LoginFormData } from "@/pages/auth/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import { toast } from "sonner";



export default function useLogin() {
    const { handleLogin } = useAuth()
    const navigate = useNavigate()
    const form = useForm<LoginFormData>({ resolver: zodResolver(LoginSchema), defaultValues: defaultLoginValues })
    const onSubmit = async (formData: LoginFormData) => {
        try {
            await handleLogin(formData);
            navigate("/", { replace: true });
        } catch (error: any) {
            toast.error("Login Failed", {
                description: error?.response?.data?.message,
            });
            form.setValue("password", "");
        }
    };

    return { form, onSubmit }
}
