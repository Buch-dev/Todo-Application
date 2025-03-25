import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState("light");

  const lightTheme = () => setThemeMode("light");
  const darkTheme = () => setThemeMode("dark");

  return (
    <ThemeContext.Provider value={{ themeMode, lightTheme, darkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};