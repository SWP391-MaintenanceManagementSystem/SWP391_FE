import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getMe } from "@/services/auth/apis/auth.api";
import { toast } from "sonner";
import Loading from "@/components/Loading";
import { b64DecodeUnicode } from "@/utils/base64";

export default function AuthSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setAuth } = useAuth();

  useEffect(() => {
    const run = async () => {
      const token = searchParams.get("token");
      const decodedToken = token ? b64DecodeUnicode(token) : "null";

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await getMe(decodedToken);
        const { account } = res.data;
        setAuth({
          user: account,
          accessToken: decodedToken,
          isAuthenticated: true,
        });
        navigate("/dashboard");
        toast.success("Login Successful", {
          description: "Welcome back!",
        });
      } catch (err) {
        console.error("Auth error:", err);
        navigate("/login");
      }
    };

    run();
  }, []);

  return (
    <div>
      <Loading />
    </div>
  );
}
