import { Plant as PlantType } from "../../../calendar/types";
import { Entry } from "./Entry";

type Props = {
  name: string;
  plants: PlantType[];
};

export default function Group({ name, plants }: Props) {
  return (
    <div className="collapse-arrow collapse border ">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">{name}</div>
      <div className="collapse-content">
        <ul>
          {plants.map((plant) => {
            return (
              <Entry
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
