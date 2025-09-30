import type { LoginFormData } from "@/pages/auth/lib/schema";
import { login, logout } from "@/services/auth/apis/auth.api";
import type { AccountWithProfile } from "@/types/models/account";
import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export type AuthType = {
    isAuthenticated: boolean;
    user: AccountWithProfile | null;
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
    pendingEmail: string;
    setPendingEmail: React.Dispatch<React.SetStateAction<string>>;
    isNotVerified: boolean | null;
    setIsNotVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
    auth: defaultAuth,
    setAuth: () => { },
    handleLogin: async () => { },
    handleLogout: async () => { },
    pendingEmail: "",
    setPendingEmail: () => { },
    isNotVerified: null,
    setIsNotVerified: () => { },
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useLocalStorage<AuthType>("auth", defaultAuth);
    const [pendingEmail, setPendingEmail] = useState<string>("");
    const [isNotVerified, setIsNotVerified] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const handleLogin = async (formData: LoginFormData) => {
        const response = await login(formData);
        const { accessToken, account } = response.data;
        setAuth({
            isAuthenticated: true,
            user: account,
            accessToken,
        });
        toast.success("Login Successful", { description: "Welcome back!" });
    };


    const handleLogout = async () => {
        try {
            await logout();
            setAuth(defaultAuth);
            toast.success("Logout Successful", {
                description: "See you next time!",
            });
            queryClient.clear();
        } catch (error: any) {
            setAuth(defaultAuth);
            console.error("Logout error:", error);
        }
    };

    const values: AuthContextType = { auth, setAuth, handleLogin, handleLogout, pendingEmail, setPendingEmail, isNotVerified, setIsNotVerified };

    return (
        <AuthContext value={values}>
            {children}
        </AuthContext>
    );
};

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