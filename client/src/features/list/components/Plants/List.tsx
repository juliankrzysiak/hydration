import plusSVG from "@/assets/plus.svg";
import { AddPlant } from "../Forms/Plants/AddPlant";
import { useShowFormStore } from "@/stores/showFormStore";
import { Group as GroupType, Plant as PlantType } from "@/types";
import { Entry } from "./Entry";
import Group from "./Group";

interface Props {
  singlePlants: PlantType[];
  groups: GroupType[];
}

export const List = ({ singlePlants, groups }: Props) => {
  const showCreateForm = useShowFormStore((state) => state.addPlant);
  if (showCreateForm) return <AddPlant groups={groups} />;

  return (
    <div>
      <ul>
        {groups.map((group) => {
          return (
            <Group key={group.id} name={group.name} plants={group.plants} />
          );
        })}
      </ul>
      <ul className="mb-6 flex flex-col gap-2">
        {singlePlants.map((plant) => (
          <Entry
            key={plant.id}
            id={plant.id}
            name={plant.name}
            watered={plant.watered.slice(-1).at(0)}
          />
        ))}
      </ul>
      <button
        className="rounded-md border-2 border-gray-800 hover:bg-gray-300/50"
        aria-label="Show Add Date Form"
        onClick={() => useShowFormStore.setState({ addPlant: true })}
      >
        <img className="w-7" src={plusSVG} alt="Plus" />
      </button>
    </div>
  );
};
