import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useShowFormStore } from "../../../stores/showFormStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { deletePlant } from "../../../api";
import { ComboBox } from "../Common/ComboBox";
import { Plant } from "../../../types";
import { sortAsc } from "@/utils/sortAsc";
import { notify } from "@/utils/notify";

interface Props {
  plants: Plant[];
}

export const DeletePlant = ({ plants }: Props) => {
  const queryClient = useQueryClient();
  const deletePlantMutation = useMutation({
    mutationFn: deletePlant,
    onSuccess: () => {
      notify("success", "Plant deleted");
      useShowFormStore.setState({ deletePlant: false });
      queryClient.invalidateQueries({ queryKey: ["plants"] });
    },
  });

  const [selected, setSelected] = useState({} as Plant);
  const [query, setQuery] = useState("");

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    deletePlantMutation.mutate({
      plant_id: selected.id,
    });
  };

  return (
    <>
      <h2 className="text-3xl text-gray-900 underline">Delete Plant</h2>
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
            onClick={() => useShowFormStore.setState({ deletePlant: false })}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};
