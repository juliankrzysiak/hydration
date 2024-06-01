import { Plant } from "@/types";
import { Entry } from "./Entry";

type Props = {
  name: string;
  plants: Plant[];
};

export default function Group({ name, plants }: Props) {
  return (
    <div className="collapse">
      <input type="checkbox" className="min-h-0" />
      <div className="collapse-title min-h-0 px-0 py-0 text-xl">{name}</div>
      <ul className="collapse-content flex flex-col">
        {plants.map((plant) => {
          const watered = plant.watered.slice(-1).at(0);
          return (
            <Entry
              key={plant.id}
              id={plant.id}
              name={plant.name}
              watered={watered}
            />
          );
        })}
      </ul>
    </div>
  );
}
