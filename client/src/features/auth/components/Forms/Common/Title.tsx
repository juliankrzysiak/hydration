import leaf from "@/assets/droplet.svg";
import { Link } from "react-router-dom";

interface Props {
  title: string;
}

export const Title = ({ title }: Props) => {
  return (
    <div className="justify-left relative mb-8 flex gap-4">
      <img className="w-8" src={leaf} alt="Leaf" />
      <Link
        className=" text-4xl  font-medium tracking-wider"
        to={"/account/login"}
      >
        {title}
      </Link>
    </div>
  );
};
