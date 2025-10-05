import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import Loading from "@/components/Loading";

export default function AuthFailed() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const message = searchParams.get("message");

  useEffect(() => {
    navigate("/login");
    toast.error("Authentication Failed", {
      description: message || "Unable to authenticate. Please try again.",
    });
  }, [message]);

  return <Loading />;
}
