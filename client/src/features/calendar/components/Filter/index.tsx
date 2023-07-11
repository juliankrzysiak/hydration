import { useFilterStore } from "../../stores/filterStore";
import { FilterButton } from "./FilterButton";
import { FilterSelection } from "./FilterSelection";

export const Filter = () => {
  const filterPlants = useFilterStore((state) => state.plants);
  return (
    <div className=" flex rounded-md bg-gray-900/20 p-4 text-gray-900">
      <FilterButton />
      {filterPlants.map((plant) => {
        return (
          <FilterSelection key={plant.id} id={plant.id} name={plant.name} />
        );
      })}
    </div>
  );
};
