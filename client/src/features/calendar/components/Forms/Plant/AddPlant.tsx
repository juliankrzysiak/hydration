import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useField } from "@/hooks/useField";
import { useShowFormStore } from "../../../stores/showFormStore";
import { createPlant } from "../../../api";
import { notify } from "@/utils/notify";
import { Buttons } from "@/components/Buttons";

export const AddPlant = () => {
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

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createPlantMutation.mutate({
      name: name.value,
      schedule: Number(schedule.value),
    });
    setName("");
    setSchedule("");
  };

  return (
    <>
      <h1 className="mb-3 text-3xl ">Add Plant</h1>
      <form className="flex flex-col gap-3" action="" onSubmit={submitForm}>
        <div className=" flex max-w-[10rem] flex-col">
          <label className="" htmlFor="name">
            Plant name
          </label>
          <input
            className=" rounded-md bg-gray-100 px-2"
            {...name}
            autoFocus
            required
          />
        </div>
        <div className="mb-2 flex max-w-[10rem] flex-col ">
          <label className="text-l" htmlFor="schedule">
            Schedule
          </label>
          <input
            className="w-20 rounded-md  bg-gray-100 px-2"
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

        <Buttons
          cancel={() => useShowFormStore.setState({ addPlant: false })}
        />
      </form>
    </>
  );
};
