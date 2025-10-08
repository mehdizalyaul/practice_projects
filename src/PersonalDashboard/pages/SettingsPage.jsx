import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/theme.css";
import "../styles/SettingsPage.css";

const SettingsPage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <div className="theme-toggle">
        <p>
          Current Theme: <strong>{theme}</strong>
        </p>
        <button onClick={toggleTheme}>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
