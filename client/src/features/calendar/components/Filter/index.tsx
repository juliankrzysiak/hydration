import { useFilterStore } from "../../stores/filterStore";
import { FilterButton } from "./FilterButton";
import { FilterSelection } from "./FilterSelection";

export const Filter = () => {
  const filterPlants = useFilterStore((state) => state.plants);
  return (
    <div className="flex w-full max-w-sm rounded-xl bg-gray-900/40 p-2">
      <FilterButton />
      {filterPlants.map((plant) => {
        return <FilterSelection name={plant.name} />;
      })}
    </div>
  );
};
