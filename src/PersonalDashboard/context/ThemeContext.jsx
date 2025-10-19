import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const initialState = JSON.parse(localStorage.getItem("theme")) || "light";

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
    document.body.classList.remove(theme === "dark" ? "light" : "dark");
    document.body.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    localStorage.setItem("theme", theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
