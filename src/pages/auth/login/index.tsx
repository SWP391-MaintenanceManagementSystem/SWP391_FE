import { useAuth } from "@/contexts/AuthContext"
import { LoginForm } from "../components/LoginForm"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import logo from "/logo.svg"
import loginImg from "@/assets/login-img.png"
import { useWindowSize } from "@uidotdev/usehooks";
import useLogin from "@/services/auth/hooks/useLogin"
import VerificationAlert from "../components/VerificationAlert"

const LoginPage = () => {
    const { auth, isNotVerified } = useAuth()
    const { form, onSubmit } = useLogin()
    const { height, width = 0 } = useWindowSize()
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        if (!width || !height) return;

        if (width < 1024) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }, [width, height])



    if (auth.isAuthenticated) {
        return <Navigate to={"/"} replace />
    }


    return (
        <div className="w-full min-h-screen flex flex-col relative">
            <div className="absolute top-0 left-0 p-10">
                <img src={logo} alt="Logo" />
            </div>
            <div className="min-h-fit flex items-center justify-center lg:mx-24 mx-4 overflow-hidden mt-40 shadow-lg lg:shadow-none">
                <div className="w-screen space-y-8 p-6 flex flex-col flex-1 justify-center">
                    <div className="text-center lg:text-left">
                        <h3 className="text-3xl font-bold">
                            Welcome Back !
                        </h3>
                        <p>If you don't have an account register</p>
                        <p>You can <Link to={"/register"} className="!text-purple-primary">Register here</Link></p>
                    </div>
                    <LoginForm form={form} onSubmit={onSubmit} />
                </div>
                {!isMobile && (<div className="w-1/2">
                    <img src={loginImg} alt="Car Image" />
                </div>)}
            </div>
            {isNotVerified && (
                <div className="fixed lg:bottom-6  right-6 z-50">
                    <VerificationAlert />
                </div>
            )}
        </div>
    )
}

export default LoginPage