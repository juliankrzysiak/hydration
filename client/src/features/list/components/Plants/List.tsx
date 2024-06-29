import { useShowFormStore } from "@/stores/showFormStore";
import { Group as GroupType, Plant as PlantType } from "@/types";
import { AddPlant } from "../Forms/Plants/AddPlant";
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
    <div className="flex w-full flex-col gap-1 overflow-auto">
      <ul className="flex flex-col">
        {groups.map((group) => {
          return (
            <Group
              key={group.id}
              id={group.id}
              name={group.name}
              plants={group.plants}
            />
          );
        })}
      </ul>
      <div className="divider my-0 w-1/2"></div>
      <ul className=" flex flex-col">
        {singlePlants.map((plant) => (
          <Entry
            key={plant.id}
            id={plant.id}
            name={plant.name}
            watered={plant.watered.slice(-1).at(0)}
          />
        ))}
      </ul>
    </div>
  );
};
