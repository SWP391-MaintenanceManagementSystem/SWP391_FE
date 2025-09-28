import { defaultAuth, useAuth } from "@/contexts/AuthContext"
import { refresh } from "@/services/auth/apis/auth.api";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";


export const PersistLogin = () => {
    const { auth, setAuth } = useAuth()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                if (auth.isAuthenticated && auth.accessToken) {
                    setLoading(false);
                    return;
                }
                if (!auth.accessToken) {
                    const res = await refresh();
                    const { accessToken } = res.data
                    if (accessToken) {
                        setAuth(prev => ({
                            ...prev,
                            isAuthenticated: true,
                            accessToken: accessToken,
                        }));
                    } else {
                        setAuth(defaultAuth);
                    }
                }
            } catch (err) {
                console.error("Persist login failed:", err);
                setAuth(defaultAuth);
            } finally {
                setLoading(false);
            }
        };
        verifyToken();
    }, []);

    if (loading) return <p>Loading...</p>;

    return <Outlet />
}
