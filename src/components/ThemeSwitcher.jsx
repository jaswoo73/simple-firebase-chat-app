import { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const ThemeSwitcher = () => {
  const defaultDark = window.matchMedia("(prefer-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "firebase-chat-app.theme",
    defaultDark ? "dark" : "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("color-scheme", theme);
  }, [theme]);

  return (
    <aside>
      <button
        className="btn theme-btn"
        onClick={() =>
          setTheme((prev) => (prev === "light" ? "dark" : "light"))
        }
      >
        {theme === "dark" ? (
          <SunIcon width={24} height={24} />
        ) : (
          <MoonIcon width={24} height={24} />
        )}
      </button>
    </aside>
  );
};

export default ThemeSwitcher;
