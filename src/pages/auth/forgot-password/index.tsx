import useResetPassword from "@/services/auth/hooks/useResetPassword";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";
import { useWindowSize } from "@uidotdev/usehooks";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import loginImg from "@/assets/login-img.png";
import logo from "/logo.svg";
import { useEffect } from "react";
import { ResetCodeForm } from "../components/ResetCodeForm";
import { ResetPasswordForm } from "../components/ResetPasswordForm";
import { ArrowLeft } from "lucide-react";
import Loading from "@/components/Loading";
export default function ForgotPasswordPage() {
  const {
    form,
    handleRequestReset,
    pageType,
    PageType,
    handleVerifyReset,
    handleReset,
    handleResendCode,
  } = useResetPassword();
  const { height, width = 0 } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!width || !height) return;

    if (width < 1024) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width, height]);

  // if (auth.isAuthenticated) {
  //     return <Navigate to={"/"} replace />
  // }

  if (form.reset.formState.isSubmitting) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col relative">
      <div className="absolute top-0 left-0 p-10">
        <img src={logo} alt="Logo" />
      </div>
      <div className="min-h-fit flex items-center justify-center lg:mx-24 mx-4 overflow-hidden mt-40 shadow-lg lg:shadow-none">
        <div className="w-screen space-y-8 p-6 flex flex-col flex-1 justify-center">
          <div className="text-center lg:text-left ">
            <NavLink
              to="/login"
              className="flex items-center !text-sm !text-gray-500 mb-10"
            >
              <ArrowLeft className="mr-2" size={14} />
              Back to login
            </NavLink>

            {pageType === PageType.REQUEST && (
              <>
                <div className="mb-12">
                  <h3 className="text-3xl font-bold">Forgot your password?</h3>
                  <p>Don’t worry, it happens to all of us.</p>
                  <p>
                    Enter your{" "}
                    <strong className="text-purple-primary text-sm">
                      email
                    </strong>{" "}
                    below and we’ll send you a reset code.
                  </p>
                </div>
                <ForgotPasswordForm
                  form={form.forgot}
                  onSubmit={handleRequestReset}
                />
              </>
            )}

            {pageType === PageType.VERIFY && (
              <>
                <div className="mb-12">
                  <h3 className="text-3xl font-bold">Check your email</h3>
                  <p>We’ve sent you a verification code.</p>
                  <p>
                    Enter the{" "}
                    <strong className="text-purple-primary text-sm">
                      reset code
                    </strong>{" "}
                    below to continue.
                  </p>
                </div>
                <ResetCodeForm
                  form={form.code}
                  onSubmit={handleVerifyReset}
                  handleResendCode={handleResendCode}
                />
              </>
            )}

            {pageType === PageType.RESET && (
              <>
                <div className="mb-12">
                  <h3 className="text-3xl font-bold">Set a new password</h3>
                  <p>Your reset code has been verified.</p>
                  <p>
                    Please enter a{" "}
                    <strong className="text-purple-primary text-sm">
                      new password
                    </strong>{" "}
                    for your account.
                  </p>
                </div>
                <ResetPasswordForm form={form.reset} onSubmit={handleReset} />
              </>
            )}

            {pageType === PageType.SUCCESS && (
              <>
                <h3 className="text-3xl font-semibold">
                  Password reset successful!
                </h3>
                <p>You can now log in with your new password.</p>
              </>
            )}
          </div>
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
