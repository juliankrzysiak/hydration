import { useDesktopWidth } from "@/hooks/useDesktopWidth";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  const [width] = useDesktopWidth();
  const routes = ["calendar", "plants", "user"];
  return (
    <header className="flex min-w-full items-center justify-between border-b border-gray-700 bg-gray-900/20 p-3 text-gray-900 shadow-sm">
      <Link
        className="pl-2 text-2xl font-medium xl:text-3xl"
        to="/home"
        aria-label="Navigate to home"
      >
        Hydration
      </Link>
      <nav className="flex gap-4 px-2">
        {routes.map((route) => {
          return (
            <Link
              to={`/${route}`}
              className={`text-xl font-medium xl:text-2xl ${
                location.pathname !== `/${route}` && "text-gray-900/70"
              }`}
            >
              {route}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};
