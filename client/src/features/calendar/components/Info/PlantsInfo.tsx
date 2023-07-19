import { Plant } from "../../types";

interface Props {
  plants: Plant[];
  watered?: boolean;
  handleDate: (plants: Plant[]) => void;
}

export const PlantsInfo = ({ plants, watered, handleDate }: Props) => {
  if (plants.length < 1) return null;

  return (
    <div>
      <ul className="flex flex-col gap-2 pl-2">
        {plants.map((plant) => {
          return (
            <li key={plant.id} className="">
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
    </div>
  );
};
