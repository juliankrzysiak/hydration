import { FilterButton } from "./FilterButton";
import { FilterSelection } from "./FilterSelection";

export const Filter = () => {
  return (
    <div className="flex w-full max-w-sm rounded-xl bg-gray-900/40 p-2">
      <FilterButton />
      <FilterSelection />
    </div>
  );
};
