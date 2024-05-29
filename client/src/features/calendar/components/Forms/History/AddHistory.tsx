import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plant } from "@/types";
import { ComboBox } from "../ComboBox";
import { Buttons } from "@/components/Buttons";
import { addDate } from "@/features/calendar/api";
import { useDateStore } from "@/features/calendar/stores/dateStore";
import dayjs from "dayjs";
import { useQueryFilter } from "@/features/calendar/hooks/useQueryFilter";
import { notify } from "@/utils";

interface Props {
  plants: Plant[];
  handleInput: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddHistory = ({ plants, handleInput }: Props) => {
  const queryClient = useQueryClient();
  const addDateMutation = useMutation({
    mutationFn: addDate,
    onSuccess: () => {
      notify("success", "Date added!");
      queryClient.invalidateQueries({ queryKey: ["plants"] });
    },
  });
  const date = useDateStore((state) => dayjs(state.date).format("YYYY-MM-DD"));
  const [selected, setSelected] = useState({} as Plant);
  const [query, setQuery] = useState("");
  const filteredPlants = useQueryFilter({ plants, query });

  const handleSubmit = () => {
    if (
      // Stop duplicates of dates on same plant
      plants
        .filter((plant) => plant.id === selected.id)
        .at(0)
        ?.watered.some((wDate) => dayjs(date).isSame(wDate, "day"))
    ) {
      handleInput(false);
      return;
    }
    const plant_id = [selected.id];
    addDateMutation.mutate({
      plant_id,
      date,
    });

    handleInput(false);
  };

  return (
    <form className="flex w-full flex-col">
      <ComboBox
        selected={selected}
        setSelected={setSelected}
        query={query}
        setQuery={setQuery}
        plants={filteredPlants}
        label="Add Date"
      />
      <Buttons accept={handleSubmit} cancel={() => handleInput(false)} />
    </form>
  );
};
