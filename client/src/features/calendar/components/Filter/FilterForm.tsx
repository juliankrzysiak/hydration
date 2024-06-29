import { useRef, useState } from "react";
import { ComboBox } from "../Forms/ComboBox";
import { Plant } from "../../../../types";
import { useFilterStore } from "../../stores/filterStore";
import { useShowFormStore } from "@/stores/showFormStore";
import { useClickOutside } from "../../hooks/useClickOutside";
import { Buttons } from "@/components/Buttons";

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
      className=" flex h-full w-full flex-col rounded-md bg-blue-100 p-4  shadow-sm"
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

        <Buttons cancel={closeForm} />
      </form>
    </section>
  );
};
