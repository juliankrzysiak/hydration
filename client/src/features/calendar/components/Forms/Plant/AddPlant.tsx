import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useField } from "@/hooks/useField";
import { useShowFormStore } from "@/stores/showFormStore";
import { createPlant } from "../../../api";
import { notify } from "@/utils/notify";
import { Buttons } from "@/components/Buttons";
import { Group } from "@/types";
import { useState } from "react";

type Props = {
  groups: Group[];
};

export const AddPlant = ({ groups }: Props) => {
  const queryClient = useQueryClient();
  const createPlantMutation = useMutation({
    mutationFn: createPlant,
    onSuccess: () => {
      notify("success", "Plant created");
      queryClient.invalidateQueries({ queryKey: ["plants"] });
      useShowFormStore.setState({ addPlant: false });
    },
  });
  const [name, setName] = useField({ id: "name", type: "text" });
  const [schedule, setSchedule] = useField({ id: "schedule", type: "number" });
  const [groupId, setGroupId] = useState<number | null>(null);

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createPlantMutation.mutate({
      name: name.value,
      schedule: Number(schedule.value),
      group_id: groupId ?? null,
    });
    setName("");
    setSchedule("");
  };

  return (
    <>
      <h1 className="mb-3 text-3xl ">Add Plant</h1>
      <form className="flex flex-col gap-3" onSubmit={submitForm}>
        <div className=" flex w-3/4 flex-col">
          <label className="text-lg" htmlFor="name">
            Plant name
          </label>
          <input className="input" {...name} autoFocus required />
        </div>
        <div className="mb-2 flex w-1/5 flex-col ">
          <label className="text-xl" htmlFor="schedule">
            Schedule *
          </label>
          <input
            className="input"
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
        <label>
          Group
          <select
            name="group"
            className="select w-full max-w-xs"
            onChange={(e) => setGroupId(Number(e.target.value))}
          >
            <option selected>None</option>
            {groups.map((group) => {
              return (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              );
            })}
          </select>
        </label>

        <Buttons
          cancel={() => useShowFormStore.setState({ addPlant: false })}
        />
      </form>
    </>
  );
};
