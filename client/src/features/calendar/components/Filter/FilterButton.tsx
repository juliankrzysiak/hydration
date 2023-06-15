import filter from "../../assets/filter.svg";

export const FilterButton = () => {
  return (
    <button
      className="rounded-md bg-gray-700/20 p-1"
      aria-label="Show Filter Form"
    >
      <img className=" w-6" src={filter} alt="Filter" />
    </button>
  );
};
