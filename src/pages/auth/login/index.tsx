import { useAuth } from "@/contexts/AuthContext"
import { LoginForm } from "../components/LoginForm"
import type { LoginFormData } from "../lib/schema"
import { Navigate, useNavigate } from "react-router-dom"
import { useEffect } from "react"

const LoginPage = () => {
    const { handleLogin, auth } = useAuth()
    const navigate = useNavigate()

    // Redirect if already authenticated
    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate("/", { replace: true });
        }
    }, [auth.isAuthenticated, navigate]);

    if (auth.isAuthenticated) {
        return <Navigate to={"/"} replace />
    }

    const handleSubmit = async (formData: LoginFormData) => {
        await handleLogin(formData)
        navigate("/", { replace: true })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-md">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <LoginForm onSubmit={handleSubmit} />
            </div>
        </div>
    )
}

export default LoginPage