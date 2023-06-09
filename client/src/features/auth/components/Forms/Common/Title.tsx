import { ReactComponent as Leaf } from "@/assets/droplet.svg";

interface Props {
  title: string;
}

export const Title = ({ title }: Props) => {
  return (
    <div className="justify-left relative mb-8 flex gap-4">
      <Leaf className="w-8 fill-gray-200" />
      <h1 className=" text-4xl  font-medium tracking-wider">{title}</h1>
    </div>
  );
};
