import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getMe } from "@/services/apis/auth.api";
import { toast } from "sonner";

export default function AuthSuccess() {
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    useEffect(() => {
        const run = async () => {
            const params = new URLSearchParams(window.location.search);
            const token = params.get("token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const res = await getMe(token);
                const { account } = res.data;
                setAuth({
                    user: account,
                    accessToken: token,
                    isAuthenticated: true,
                });

                navigate("/");
                toast.success("Login Successful", {
                    description: "Welcome back!",
                });
            } catch (err) {
                console.error("Auth error:", err);
                navigate("/login");
            }
        };

        run();
    }, [navigate, setAuth]);

    return <div>Signing you in...</div>;
}
