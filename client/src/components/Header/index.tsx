import dropletSVG from "@/assets/droplet-dark.svg";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  return (
    <header className="flex  min-w-full items-center justify-between bg-gray-700/40 p-2">
      <Link
        className="flex items-center gap-1 text-2xl"
        to="/home"
        aria-label="Navigate to home"
      >
        <img src={dropletSVG} alt="Leaf" className="w-6" />
        Hydration
      </Link>
      <nav className="flex gap-4 px-2">
        <Link
          to="/plants"
          className={`text-lg  ${
            location.pathname !== "/plants" && "font-light"
          }`}
        >
          Plants
        </Link>
        <Link
          to="/user"
          className={`text-lg  ${
            location.pathname !== "/user" && "font-light"
          }`}
        >
          User
        </Link>
      </nav>
    </header>
  );
};
