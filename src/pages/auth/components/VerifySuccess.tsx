import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export default function VerifySuccess() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    useEffect(() => {
        if (success === undefined || success === null) return;
        if (success) {
            toast.success("Email Verified", {
                description: "Your email has been successfully verified. You can now log in.",
            });
            navigate("/login");
        } else {
            toast.error("Verification Failed", {
                description: "Email verification failed. Please try again.",
            });
            navigate("/login");
        }
        
    }, [success, navigate]);


    return (
        <div className="flex items-center space-x-2">
            <Spinner />
            <span>Verifying you in...</span>
        </div>
    )
}
