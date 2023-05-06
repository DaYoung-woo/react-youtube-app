import logoLight from "../assets/img/yt_logo_rgb_light.png";
import logoDark from "../assets/img/yt_logo_rgb_dark.png";
import { useTheme } from "../context/ThemeContext";
export default function VideoList() {
  const { theme } = useTheme();
  return (
    <header className={`AppHeader ${theme}`}>
      <img src={theme === "dark" ? logoDark : logoLight} alt="logo" />
      <div className="flex">
        <input type="text" className="search-input" />
        <button></button>
      </div>

      <button></button>
    </header>
  );
}
