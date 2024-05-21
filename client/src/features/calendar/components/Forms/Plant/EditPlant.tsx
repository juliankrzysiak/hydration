import { useField } from "@/hooks/useField";
import { useShowFormStore } from "@/features/calendar/stores/showFormStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPlant } from "@/features/calendar/api";
import { notify } from "@/utils/notify";
import { useNavigate } from "react-router-dom";
import { Buttons } from "@/components/Buttons";
import { Group } from "@/features/calendar/types";
import { FormEvent } from "react";

type Props = {
  id: number;
  name: string;
  schedule: number;
  group_id: number;
  groups: Group[];
};

export const EditPlant = ({ id, name, schedule, group_id, groups }: Props) => {
  const navigate = useNavigate();
  // const [name] = useField({
  //   type: "text",
  //   id: "name",
  //   defaultValue: props.name,
  // });
  // const [schedule] = useField({
  //   type: "number",
  //   id: "schedule",
  //   defaultValue: props.schedule.toString(),
  // });
  const queryClient = useQueryClient();

  const editPlantMutation = useMutation({
    mutationFn: editPlant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plants"] });
      useShowFormStore.setState({ editPlant: false });
      navigate("/home");
      notify("success", "Plant edited");
    },
    onError: () => {
      notify("error", "Could not edit plant");
    },
  });

  function submitForm(e: FormEvent) {
    e.preventDefault();
    e.target;

    // editPlantMutation.mutate({
    //   id: props.id,
    //   name: name.value,
    //   schedule: Number(schedule.value),
    // });
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={submitForm}>
      <div className=" flex w-3/4 flex-col">
        <label htmlFor="name">Name *</label>
        <input
          className="rounded-md  bg-gray-100 px-2"
          type="text"
          name="name"
          defaultValue={name}
          required
        />
      </div>
      <div className="mb-2 flex w-1/5  flex-col">
        <label htmlFor="schedule">Schedule</label>
        <input
          className=" rounded-md  bg-gray-100 px-2"
          type="number"
          name="schedule"
          defaultValue={schedule}
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
      <label>
        Group
        <select
          className="select w-full max-w-xs"
          name="group"
          defaultValue={group_id.toString()}
        >
          <option>None</option>
          {groups.map((group) => {
            return (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            );
          })}
        </select>
      </label>
      <Buttons cancel={() => useShowFormStore.setState({ editPlant: false })} />
    </form>
  );
};
