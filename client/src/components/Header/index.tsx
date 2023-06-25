import { useNavigate } from "react-router-dom";
import dropletSVG from "@/assets/droplet-dark.svg";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="flex h-fit min-w-full bg-gray-700/40 p-2">
      <button
        className="flex items-center gap-1 text-xl"
        aria-label="Navigate to home"
        onClick={() => navigate("/home")}
      >
        <img src={dropletSVG} alt="Leaf" className="w-6" />
        Hydration
      </button>
    </header>
  );
};
