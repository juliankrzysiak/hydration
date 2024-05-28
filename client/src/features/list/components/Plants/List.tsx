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
    <div className="flex w-full flex-col gap-4">
      <ul className="flex flex-col gap-1">
        {groups.map((group) => {
          return (
            <Group key={group.id} name={group.name} plants={group.plants} />
          );
        })}
      </ul>
      <ul className=" flex flex-col gap-1">
        {singlePlants.map((plant) => (
          <Entry
            key={plant.id}
            id={plant.id}
            name={plant.name}
            watered={plant.watered.slice(-1).at(0)}
          />
        ))}
      </ul>
      <AddPlant groups={groups} />
    </div>
  );
};
