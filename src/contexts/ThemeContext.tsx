import { createContext, useEffect, useState, type ReactNode } from 'react';

// Define the shape of the context value
interface ThemeContextType {
    theme: string | undefined;
    toggleTheme: () => void;
}

// Create context with proper typing
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define props interface for ThemeProvider
interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<string | undefined>();

    useEffect(() => {
        const localTheme = localStorage.getItem('theme');
        if (localTheme) setTheme(localTheme);
    }, []);

    useEffect(() => {
        if (!theme) return;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeProvider, ThemeContext };
export type { ThemeContextType };