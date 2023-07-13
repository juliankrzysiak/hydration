import { useField } from "@/hooks/useField";
import { useShowFormStore } from "@/features/calendar/stores/showFormStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPlant } from "@/features/calendar/api";
import { notify } from "@/utils/notify";
import { useNavigate } from "react-router-dom";
import { Buttons } from "@/components/Buttons";

interface Props {
  id: number;
  name: string;
  schedule: number;
}

export const EditPlant = (props: Props) => {
  const navigate = useNavigate();
  const [name] = useField({
    type: "text",
    id: "name",
    defaultValue: props.name,
  });
  const [schedule] = useField({
    type: "number",
    id: "schedule",
    defaultValue: props.schedule.toString(),
  });
  const queryClient = useQueryClient();
  const editPlantMutation = useMutation({
    mutationFn: editPlant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plants"] });
      useShowFormStore.setState({ editPlant: false });
      navigate(-1);
      notify("success", "Plant edited");
    },
    onError: () => {
      notify("error", "Could not edit plant");
    },
  });

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        editPlantMutation.mutate({
          id: props.id,
          name: name.value,
          schedule: Number(schedule.value),
        });
      }}
    >
      <div className=" flex w-3/4 flex-col">
        <label htmlFor="name">Plant name</label>
        <input className="rounded-md  bg-gray-100 px-2" {...name} required />
      </div>
      <div className="mb-2 flex w-1/5  flex-col">
        <label htmlFor="schedule">Schedule</label>
        <input
          className=" rounded-md  bg-gray-100 px-2"
          {...schedule}
          list="defaultSchedule"
          min={0}
          max={365}
          required
        />
        <datalist id="defaultSchedule">
          <option value="3" />
          <option value="7" />
          <option value="14" />
          <option value="21" />
          <option value="30" />
        </datalist>
      </div>
      <Buttons cancel={() => useShowFormStore.setState({ editPlant: false })} />
    </form>
  );
};
