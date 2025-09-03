import type { LoginFormData } from "@/pages/auth/lib/schema";
import { login, logout } from "@/services/apis/auth.api";
import type { Account } from "@/types/models/account";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { toast } from "sonner";

export type AuthType = {
    isAuthenticated: boolean;
    user: Account | null;
    accessToken: string | null;
}

export const defaultAuth: AuthType = {
    isAuthenticated: false,
    user: null,
    accessToken: null,
}

type AuthContextType = {
    auth: AuthType
    setAuth: React.Dispatch<React.SetStateAction<AuthType>>;
    handleLogin: (formData: LoginFormData) => Promise<void>;
    handleLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    auth: defaultAuth,
    setAuth: () => { },
    handleLogin: async () => { },
    handleLogout: async () => { },
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [persistedAuth, setPersistedAuth] = useLocalStorage<AuthType>("auth", defaultAuth);
    const [auth, setAuth] = useState<AuthType>(persistedAuth);

    useEffect(() => {
        if (JSON.stringify(auth) !== JSON.stringify(persistedAuth)) {
            setPersistedAuth(auth);
        }
    }, [auth, setPersistedAuth]);

    const handleLogin = async (formData: LoginFormData) => {
        try {
            const { email, password } = formData;
            const response = await login(email, password);
            const { accessToken, account } = response.data;

            const newAuth = {
                isAuthenticated: true,
                user: account,
                accessToken,
            };

            setAuth(newAuth);

            toast.success("Login Successful", {
                description: "Welcome back!",
            });
        } catch (error: any) {
            setAuth(defaultAuth);
            console.error("Login error:", error);
            toast.error("Login Failed", {
                description: error?.response?.data?.message,
            });
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            setAuth(defaultAuth);
            toast.success("Logout Successful", {
                description: "See you next time!",
            });
        } catch (error: any) {
            setAuth(defaultAuth);
            console.error("Logout error:", error);
        }
    }


    const values: AuthContextType = { auth, setAuth, handleLogin, handleLogout };
    return (
        <AuthContext value={values}>
            {children}
        </AuthContext>
    );

}
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}


export const getAuthStorage = (): AuthType => {
    try {
        const stored = localStorage.getItem("auth");
        return stored ? JSON.parse(stored) : defaultAuth;
    } catch {
        return defaultAuth;
    }
};

export const setAuthStorage = (auth: AuthType) => {
    try {
        localStorage.setItem("auth", JSON.stringify(auth));
    } catch {
        localStorage.removeItem("auth");
    }
};

export default AuthProvider;