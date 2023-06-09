import leaf from "@/assets/droplet.svg";

interface Props {
  title: string;
}

export const Title = ({ title }: Props) => {
  return (
    <div className="justify-left relative mb-8 flex gap-4">
      <img className="w-8" src={leaf} alt="Leaf" />
      <h1 className=" text-4xl  font-medium tracking-wider">{title}</h1>
    </div>
  );
};
