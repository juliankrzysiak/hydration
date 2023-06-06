import { useState } from "react";
import { Plant } from "../../../types";
import { ConfirmButtons } from "./ConfirmButtons";
import { ComboBox } from "./ComboBox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDate, deleteDate } from "../../../api";
import { useDateStore, useToastStore } from "../../../store";
import dayjs from "dayjs";

interface Props {
  plants: Plant[];
  handleInput: React.Dispatch<React.SetStateAction<boolean>>;
  type: "ADD" | "DELETE";
}

export const ChangeHistory = ({ plants, handleInput, type }: Props) => {
  const queryClient = useQueryClient();
  const addDateMutation = useMutation({
    mutationFn: addDate,
    onSuccess: () => {
      useToastStore.setState({ toast: "Date added!" });
      queryClient.invalidateQueries({ queryKey: ["plants"] });
    },
  });
  const deleteDateMutation = useMutation({
    mutationFn: deleteDate,
    onSuccess: () => {
      useToastStore.setState({ toast: "Date removed!" });
      queryClient.invalidateQueries({ queryKey: ["plants"] });
    },
  });

  const date = useDateStore((state) => state.date);
  const [selected, setSelected] = useState({} as Plant);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (
      // Stop duplicates of dates on same plant
      type === "ADD" &&
      plants
        .filter((plant) => plant.id === selected.id)
        .at(0)
        ?.watered.some((wDate) => dayjs(date).isSame(wDate, "day"))
    ) {
      handleInput(false);
      return;
    }
    if (type === "ADD") {
      addDateMutation.mutate({
        id: selected.id,
        date,
      });
    }
    if (type === "DELETE") {
      deleteDateMutation.mutate({
        id: selected.id,
        date,
      });
    }

    handleInput(false);
  };

  return (
    <form className="flex w-3/4 flex-col" onSubmit={handleSubmit}>
      <ComboBox
        type={type}
        selected={selected}
        setSelected={setSelected}
        plants={plants}
      />
      <ConfirmButtons handleInput={handleInput} />
    </form>
  );
};
