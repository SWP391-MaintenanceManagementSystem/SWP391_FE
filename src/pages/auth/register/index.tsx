import { useEffect, useState } from "react";
import RegisterForm from "../components/RegisterForm";
import useRegister from "@/services/auth/hooks/useRegister";
import { useWindowSize } from "@uidotdev/usehooks";
import logo from "/logo.svg";
import loginImg from "@/assets/login-img.png";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterPage() {
  const { form, onSubmit } = useRegister();
  const { height, width = 0 } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  const { auth } = useAuth();

  if (auth.isAuthenticated) {
    return <Navigate to={"/dasboard"} replace />;
  }

  useEffect(() => {
    if (!width || !height) return;

    if (width < 1024) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width, height]);

  return (
    <div className="w-full min-h-screen flex flex-col relative">
      <div className="absolute top-0 left-0 p-10">
        <img src={logo} alt="Logo" />
      </div>
      <div className="min-h-fit flex items-center justify-center lg:mx-24 mx-4 overflow-hidden mt-20 shadow-lg lg:shadow-none gap-x-14">
        <div className="w-screen space-y-8 p-6 flex flex-col flex-1 justify-center">
          <div className="text-center lg:text-left">
            <h3 className="text-3xl font-bold">Welcome Guest !</h3>
            <p>If you already have an account</p>
            <p>
              You can{" "}
              <Link to={"/login"} className="!text-purple-primary">
                Login here
              </Link>
            </p>
          </div>
          <RegisterForm form={form} onSubmit={onSubmit} />
        </div>
        {!isMobile && (
          <div className="w-1/2">
            <img src={loginImg} alt="Car Image" />
          </div>
        )}
      </div>
    </div>
  );
}
