import { Plant, Group } from "@/types";
import { useIdStore } from "../stores/idStore";
import { sortAsc } from "@/utils";
import { Info } from "../components/Plants/Info";
import { List } from "../components/Plants/List";
import { AddPlant } from "../components/Forms/Plants/AddPlant";

type Props = {
  allPlants: Plant[];
  singles: Plant[];
  groups: Group[];
};

export default function PlantsLayout({ allPlants, singles, groups }: Props) {
  const id = useIdStore((state) => state.id);
  const currentPlant = allPlants.find((plant) => plant.id === id);
  const currentGroup = groups.find(
    (group) => group.id === currentPlant?.group_id
  );
  // Are groups not sorted?
  const sortedPlants = sortAsc(singles);

  return (
    <div className="h-full">
      {id ? (
        <Info plant={currentPlant} group={currentGroup} groups={groups} />
      ) : (
        <div className="flex h-full flex-col justify-between">
          <List singlePlants={sortedPlants} groups={groups} />
          <AddPlant groups={groups} />
        </div>
      )}
    </div>
  );
}
