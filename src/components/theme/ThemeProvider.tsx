import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    resolvedTheme: "dark" | "light";
};

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
    resolvedTheme: "light",
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>(() => {
        if (typeof window !== "undefined") {
            return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
        }
        return defaultTheme;
    });

    const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">(
        () =>
            typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"
    );

    useEffect(() => {
        if (typeof window === "undefined") return;

        const root = window.document.documentElement;
        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
            root.classList.add(systemTheme);
            setResolvedTheme(systemTheme);
            return;
        }
        root.classList.add(theme);
        setResolvedTheme(theme);
    }, [theme]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        if (typeof window !== "undefined") {
            localStorage.setItem(storageKey, newTheme);
        }
    };

    const value = {
        theme,
        setTheme,
        resolvedTheme,
    };

    return (
        <ThemeProviderContext.Provider value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
};
