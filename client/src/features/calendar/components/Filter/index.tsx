import { useFilterStore } from "../../stores/filterStore";
import { FilterButton } from "./FilterButton";
import { FilterSelection } from "./FilterSelection";

export const Filter = () => {
  const filterPlants = useFilterStore((state) => state.plants);
  return (
    <div className="flex h-16 gap-3 rounded-md bg-blue-100 p-4 shadow-sm">
      <FilterButton />
      {filterPlants.map((plant) => {
        return (
          <FilterSelection key={plant.id} id={plant.id} name={plant.name} />
        );
      })}
    </div>
  );
};
