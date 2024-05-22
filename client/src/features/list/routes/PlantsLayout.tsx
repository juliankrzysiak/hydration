import { Plant, Group } from "@/types";
import { useIdStore } from "@/features/calendar/stores/idStore";
import { sortAsc } from "@/utils/sortAsc";
import { Info } from "../components/Plants/Info";
import { List } from "../components/Plants/List";

type Props = {
  singles: Plant[];
  groups: Group[];
};

export default function PlantsLayout({ singles, groups }: Props) {
  const id = useIdStore((state) => state.id);
  const lastWaterDate = singles.find((plant) => plant.id === id);
  const sortedPlants = sortAsc(singles);

  return (
    <div className="relative flex w-full flex-col rounded-md bg-gray-900/20 p-4 shadow-lg">
      {id ? (
        <Info plant={lastWaterDate} groups={groups} />
      ) : (
        <List singlePlants={sortedPlants} groups={groups} />
      )}
    </div>
  );
}
