import dropletSVG from "@/assets/droplet-dark.svg";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  return (
    <header className="flex min-w-full items-center justify-between border-b border-gray-700 bg-gray-900/20 p-2 text-gray-900 shadow-sm">
      <Link
        className=" pl-2 text-2xl font-medium"
        to="/home"
        aria-label="Navigate to home"
      >
        Hydration
      </Link>
      <nav className="flex gap-4 px-2">
        <Link
          to="/plants"
          className={`text-lg font-medium ${
            location.pathname !== "/plants" && "text-gray-900/60"
          }`}
        >
          Plants
        </Link>
        <Link
          to="/user"
          className={`text-lg font-medium  ${
            location.pathname !== "/user" && "text-gray-900/60"
          }`}
        >
          User
        </Link>
      </nav>
    </header>
  );
};
