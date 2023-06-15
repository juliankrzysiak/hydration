import filter from "../../assets/filter.svg";
import { useShowStore } from "../../stores/showStore";

export const FilterButton = () => {
  return (
    <button
      className="mr-3 rounded-md"
      aria-label="Show Filter Form"
      onClick={() => useShowStore.setState({ filterForm: true })}
    >
      <img className=" w-6" src={filter} alt="Filter" />
    </button>
  );
};
