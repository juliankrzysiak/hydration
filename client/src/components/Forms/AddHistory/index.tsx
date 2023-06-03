import { useState } from "react";
import { Plant } from "../../../types";
import { ConfirmButtons } from "./ConfirmButtons";
import { ComboBox } from "./ComboBox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDate } from "../../../api";
import { useDateStore } from "../../../store";
import dayjs from "dayjs";

interface Props {
  plants: Plant[];
  handleInput: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddHistory = ({ plants, handleInput }: Props) => {
  const queryClient = useQueryClient();
  const addDateMutation = useMutation({
    mutationFn: addDate,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["plants"] }),
  });
  const date = useDateStore((state) => state.date);
  const [selected, setSelected] = useState({} as Plant);

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
    <form className="flex w-3/4 flex-col gap-4" onSubmit={handleSubmit}>
      <ComboBox selected={selected} setSelected={setSelected} plants={plants} />
      <ConfirmButtons handleInput={handleInput} />
    </form>
  );
};
