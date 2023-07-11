import { Plant } from "../../types";

interface Props {
  plants: Plant[];
  title: string;
}

export const PlantsInfo = ({ plants, title }: Props) => {
  if (plants.length < 1) return null;
  return (
    <div className="mb-4">
      <h3 className="mb-2 text-3xl ">{title}</h3>
      <ul className="flex flex-col gap-2 pl-2">
        {plants.map((plant) => {
          return (
            <li className=" text-xl font-medium" key={plant.id}>
              {plant.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
