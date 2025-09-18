import type { LoginFormData } from "@/pages/auth/lib/schema";
import { login, logout } from "@/services/auth/apis/auth.api";
import type { AccountWithProfile } from "@/types/models/account";
import { createContext, useContext } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { toast } from "sonner";

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
}

const AuthContext = createContext<AuthContextType>({
    auth: defaultAuth,
    setAuth: () => { },
    handleLogin: async () => { },
    handleLogout: async () => { },
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useLocalStorage<AuthType>("auth", defaultAuth);

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
        } catch (error: any) {
            setAuth(defaultAuth);
            console.error("Logout error:", error);
        }
    };

    const values: AuthContextType = { auth, setAuth, handleLogin, handleLogout };

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