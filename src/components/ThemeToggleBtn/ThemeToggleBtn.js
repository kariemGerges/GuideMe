import React,{ useState } from "react";
import ThemeContext  from "../../components/ThemeContext/ThemeContext";

const ThemeToggleBtn = () => {
    const { theme, toggleTheme } = React.useContext(ThemeContext);
    return (
        <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
        >
            {theme === 'light' ? '🌜' : '🌞'} Mode
        </button>
    )
}

export default ThemeToggleBtn;