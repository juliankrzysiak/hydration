import { useState } from "react";
import { ComboBox } from "../Forms/Common/ComboBox";
import { Plant } from "../../types";

interface Props {
  plants: Plant[];
}

export const FilterForm = ({ plants }: Props) => {
  const [selected, setSelected] = useState({} as Plant);
  const [query, setQuery] = useState("");
  return (
    <section className="m-4  w-full  rounded-md bg-gray-900/80 p-4  shadow-lg">
      <h2 className="text-xl font-bold text-neutral-300">Filter Plants</h2>
      <form className="flex flex-col">
        <ComboBox
          {...{
            selected,
            setSelected,
            query,
            setQuery,
            plants,
          }}
        />
        <button className="btn self-center">Accept</button>
      </form>
    </section>
  );
};
