import { useRef, useState } from "react";
import { ComboBox } from "../Forms/Common/ComboBox";
import { Plant } from "../../types";
import { useFilterStore } from "../../stores/filterStore";
import { useShowFormStore } from "../../stores/showFormStore";
import { useClickOutside } from "../../hooks/useClickOutside";
import plusSVG from "@/assets/plus.svg";
import cancelSVG from "@/assets/cancel.svg";

interface Props {
  plants: Plant[];
}

export const FilterForm = ({ plants }: Props) => {
  const [selected, setSelected] = useState({} as Plant);
  const [query, setQuery] = useState("");
  const [push, filterSelections] = useFilterStore((state) => [
    state.push,
    state.plants.map((plant) => plant.id),
  ]);

  const ref = useRef<HTMLElement>(null);
  const closeForm = () => useShowFormStore.setState({ filterPlant: false });
  useClickOutside(closeForm, ref);

  const addToFilterStore = (event: React.SyntheticEvent) => {
    event.preventDefault();
    push(selected);
    closeForm();
  };

  return (
    <section
      ref={ref}
      className="flex flex-col rounded-md bg-gray-900/20 p-4 text-gray-800 shadow-sm"
    >
      <h2 className="mb-2 text-2xl font-medium">Filter Plants</h2>
      <form className=" flex  flex-col" onSubmit={addToFilterStore}>
        <ComboBox
          {...{
            selected,
            setSelected,
            query,
            setQuery,
            plants: plants?.filter(
              (plant) => !filterSelections.includes(plant.id)
            ),
          }}
        />

        <div className="mt-4 flex gap-4">
          <button
            className="rounded-md border-2 border-gray-800"
            aria-label="Show Add Date Form"
            type="submit"
          >
            <img className="w-6" src={plusSVG} alt="showAddForm" />
          </button>
          <button
            className="rounded-md border-2 border-gray-800"
            aria-label="Show Delete Date Form"
            type="button"
            onClick={closeForm}
          >
            <img className="w-6" src={cancelSVG} alt="Cancel" />
          </button>
        </div>
      </form>
    </section>
  );
};
