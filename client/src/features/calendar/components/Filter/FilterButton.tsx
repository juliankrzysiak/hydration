import filter from "../../assets/filter.svg";

export const FilterButton = () => {
  return (
    <button className="mr-3 rounded-md" aria-label="Show Filter Form">
      <img className=" w-6" src={filter} alt="Filter" />
    </button>
  );
};
