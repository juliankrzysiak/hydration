import { Plant } from "../../types";
import { ListPlant } from "./ListPlant";

type Props = {
  name: string;
  plants: Plant[];
};

export default function GroupPlant({ name, plants }: Props) {
  return (
    <div className="collapse-arrow collapse border ">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">{name}</div>
      <div className="collapse-content">
        <ul>
          {plants.map((plant) => {
            return (
              <ListPlant
                key={plant.id}
                id={plant.id}
                name={plant.name}
                watered={plant.watered.slice(-1).at(0)}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
