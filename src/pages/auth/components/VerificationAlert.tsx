import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import useLogin from "@/services/auth/hooks/useLogin"
import { CheckCircle2Icon, X } from "lucide-react"




export default function VerificationAlert({ }) {

    const { handleResend } = useLogin()
    const { setIsNotVerified } = useAuth()

    return (
        <Alert className="max-w-sm relative">
            <CheckCircle2Icon />
            <X className="absolute top-2 right-2 cursor-pointer" onClick={() => setIsNotVerified(false)} />
            <AlertTitle>Your account is not verified.</AlertTitle>
            <AlertDescription>
                Check your email inbox or spam folder. If not received, resend the email.
                <Button variant="outline" className="text-white hover:text-gray-400" onClick={handleResend}>Resend</Button>
            </AlertDescription>
        </Alert >
    )
}
