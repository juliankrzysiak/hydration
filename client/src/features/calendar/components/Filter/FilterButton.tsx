import filter from "../../assets/filter.svg";
import { useShowFormStore } from "../../stores/showFormStore";

export const FilterButton = () => {
  return (
    <button
      className="mr-3 rounded-md"
      aria-label="Show Filter Form"
      onClick={() => useShowFormStore.setState({ filterPlant: true })}
    >
      <img className=" w-6" src={filter} alt="Filter" />
    </button>
  );
};
