import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useShowStore, useToastStore } from "@/store";
import { deletePlant } from "@/api";
import { ComboBox } from "./AddHistory/ComboBox";
import { Plant } from "@/types";
import { sortAsc } from "@/utils/sortAsc";

interface Props {
  plants: Plant[];
}

export const DeletePlant = ({ plants }: Props) => {
  const queryClient = useQueryClient();
  const deletePlantMutation = useMutation({
    mutationFn: deletePlant,
    onSuccess: () => {
      useToastStore.setState({ toast: "Plant deleted" });
      useShowStore.setState({ deletePlant: false });
      queryClient.invalidateQueries({ queryKey: ["plants"] });
    },
  });

  const [selected, setSelected] = useState({} as Plant);
  const [query, setQuery] = useState("");

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    deletePlantMutation.mutate({
      id: selected.id,
    });
  };

  return (
    <section className="m-4 rounded-md bg-gray-900/20 p-4 shadow-lg">
      <h2 className="mb-4 text-xl">Delete Plant</h2>
      <form className="flex flex-col gap-3" onSubmit={submitForm}>
        <ComboBox
          {...{
            selected,
            setSelected,
            query,
            setQuery,
            plants: sortAsc(plants),
          }}
        />

        <div className="flex gap-6">
          <button className="btn" type="submit" onClick={submitForm}>
            Delete Plant
          </button>
          <button
            className="btn"
            type="button"
            onClick={() => useShowStore.setState({ deletePlant: false })}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};
