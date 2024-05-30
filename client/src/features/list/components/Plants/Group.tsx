import { Plant } from "@/types";
import { Entry } from "./Entry";

type Props = {
  name: string;
  plants: Plant[];
};

export default function Group({ name, plants }: Props) {
  return (
    <div className="collapse-arrow collapse">
      <input type="checkbox" />
      <div className="collapse-title px-0 ">{name}</div>
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
