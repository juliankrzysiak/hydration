import leaf from "@/assets/droplet.svg";
import { Link, useLocation } from "react-router-dom";

interface Props {
  title: string;
}

export const Title = ({ title }: Props) => {
  const location = useLocation();

  return (
    <div className="relative mb-8 flex items-center justify-between">
      <span className="flex gap-2">
        <img className="w-8" src={leaf} alt="Leaf" />
        <h2 className=" text-4xl font-medium tracking-wider">{title}</h2>
      </span>
      {location.pathname !== "/account/login" && (
        <Link to={"/account/login"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </Link>
      )}
    </div>
  );
};
