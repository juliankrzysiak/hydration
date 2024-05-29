import { Plant, Group } from "@/types";
import { useIdStore } from "../stores/idStore";
import { sortAsc } from "@/utils";
import { Info } from "../components/Plants/Info";
import { List } from "../components/Plants/List";

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
    <div className="relative">
      {id ? (
        <Info plant={currentPlant} group={currentGroup} />
      ) : (
        <List singlePlants={sortedPlants} groups={groups} />
      )}
    </div>
  );
}
