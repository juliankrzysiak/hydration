import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plant } from "@/features/calendar/types";
import { ConfirmButtons } from "./Common/ConfirmButtons";
import { ComboBox } from "./Common/ComboBox";
import { addDate } from "@/features/calendar/api";
import { useDateStore} from "@/features/calendar/stores/dateStore";
import { useNotificationStore } from "@/stores/notificationStore";
import dayjs from "dayjs";
import { useFilter } from "@/features/calendar/hooks/useFilter";

interface Props {
  plants: Plant[];
  handleInput: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddHistory = ({ plants, handleInput }: Props) => {
  const queryClient = useQueryClient();
  const addDateMutation = useMutation({
    mutationFn: addDate,
    onSuccess: () => {
      useNotificationStore.setState({ message: "Date added!" });
      queryClient.invalidateQueries({ queryKey: ["plants"] });
    },
  });
  const date = useDateStore((state) => dayjs(state.date).format("YYYY-MM-DD"));
  const [selected, setSelected] = useState({} as Plant);
  const [query, setQuery] = useState("");
  const filteredPlants = useFilter({ plants, query });

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
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

    addDateMutation.mutate({
      id: selected.id,
      date,
    });

    handleInput(false);
  };

  return (
    <form className="flex w-3/4 flex-col" onSubmit={handleSubmit}>
      <ComboBox
        selected={selected}
        setSelected={setSelected}
        query={query}
        setQuery={setQuery}
        plants={filteredPlants}
        label="Add Date"
      />
      <ConfirmButtons handleInput={handleInput} />
    </form>
  );
};
