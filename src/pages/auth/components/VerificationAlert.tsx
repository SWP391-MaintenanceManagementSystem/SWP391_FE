import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import useLogin from "@/services/auth/hooks/useLogin"
import { CheckCircle2Icon, X } from "lucide-react"




import { useTranslation } from "react-i18next";

export default function VerificationAlert({ }) {
    const { t } = useTranslation();
    const { handleResend } = useLogin()
    const { setIsNotVerified } = useAuth()

    return (
        <Alert className="max-w-sm relative">
            <CheckCircle2Icon />
            <X className="absolute top-2 right-2 cursor-pointer" onClick={() => setIsNotVerified(false)} />
            <AlertTitle>{t("auth.verification.title")}</AlertTitle>
            <AlertDescription>
                {t("auth.verification.desc")}
                <Button variant="outline" className="text-white hover:text-gray-400" onClick={handleResend}>{t("auth.verification.resend_button")}</Button>
            </AlertDescription>
        </Alert >
    )
}
