import { register } from "@/services/auth/apis/auth.api";
import RegisterForm from "../components/RegisterForm";
import type { RegisterFormData } from "../lib/schema";

export default function RegisterPage() {

    const handleSubmit = async (data: RegisterFormData) => {
        await register(data);
    }

    return (
        <RegisterForm onSubmit={handleSubmit} />
    )
}
