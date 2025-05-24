import { useCallback, useMemo, useState, type ReactNode } from "react"
import { ThemeContext } from "./ThemeContext";


interface ThemeProps {
    children: ReactNode
}



const ThemeContextProvider = ({ children }: ThemeProps) => {
    const [theme, setTheme] = useState<string>("light");

    const toggleTheme = useCallback(() => {
        setTheme(prev => (prev === "light" ? "dim" : "light"))
    }, []);
    
    const contextValue = useMemo(() => ({
        theme,
        toggleTheme
    }), [theme, toggleTheme]);

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    )
};

export default ThemeContextProvider;