import { Plant } from "@/types";

interface Props {
  plants: Plant[];
  handleDate: (plants: Plant[]) => void;
}

export const PlantsInfo = ({ plants, watered, handleDate }: Props) => {
  if (plants.length < 1) return null;

  return (
    <ul className="flex flex-col gap-1 pl-2">
      {plants.map((plant) => {
        return (
          <li key={plant.id} >
            <button
              className={`text-xl font-medium ${watered && "line-through"}`}
              onClick={() => handleDate([plant])}
            >
              {plant.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
