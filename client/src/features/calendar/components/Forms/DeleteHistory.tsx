import { useState } from "react";
import { Plant } from "../../types";
import { ConfirmButtons } from "./Common/ConfirmButtons";
import { ComboBox } from "./Common/ComboBox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDate } from "../../api";
import { useDateStore } from "../../stores/dateStore";
import { useNotificationStore } from "@/stores/notificationStore";
import dayjs from "dayjs";
import { useFilter } from "../../hooks/useFilter";

interface Props {
  plants: Plant[];
  handleInput: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeleteHistory = ({ plants, handleInput }: Props) => {
  const queryClient = useQueryClient();
  const deleteDateMutation = useMutation({
    mutationFn: deleteDate,
    onSuccess: () => {
      useNotificationStore.setState({ message: "Date removed!" });
      queryClient.invalidateQueries({ queryKey: ["plants"] });
    },
  });

  const date = useDateStore((state) => dayjs(state.date).format("YYYY-MM-DD"));
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState({} as Plant);
  const filteredPlants = useFilter({ plants, query, type: "DELETE" });

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    deleteDateMutation.mutate({
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
        label="Delete Date"
      />
      <ConfirmButtons handleInput={handleInput} />
    </form>
  );
};
