import { Plant } from "../../types";

interface Props {
  plants: Plant[];
  title: string;
}

export const PlantsInfo = ({ plants, title }: Props) => {
  if (plants.length < 1) return null;
  return (
    <div className="mb-4">
      <h3 className="text-2xl font-medium ">{title}</h3>
      <ul>
        {plants.map((plant) => {
          return (
            <li className=" text-lg" key={plant.id}>
              {plant.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
