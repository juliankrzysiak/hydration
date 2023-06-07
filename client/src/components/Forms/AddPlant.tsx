import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useField } from "@/hooks/useField";
import { useShowStore } from "@/store";
import { createPlant } from "@/api";

export const AddPlant = () => {
  const queryClient = useQueryClient();
  const createPlantMutation = useMutation({
    mutationFn: createPlant,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["plants"] }),
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
    <section className="m-4 rounded-md bg-gray-900/20 p-4 shadow-lg">
      <h2 className="mb-4 text-xl">Add Plant</h2>
      <form className="flex flex-col gap-3" onSubmit={submitForm}>
        <div className=" flex max-w-[10rem] flex-col">
          <label className="text-lg" htmlFor="name">
            Plant name
          </label>
          <input
            className="rounded-md border-2 border-gray-600 bg-gray-100 px-2"
            {...name}
            required
          />
        </div>
        <div className="mb-6 flex max-w-[10rem] flex-col gap-1">
          <label className="text-lg" htmlFor="schedule">
            Schedule
          </label>
          <input
            className="w-20 rounded-md border-2 border-gray-600 bg-gray-100 px-2"
            {...schedule}
            list="defaultSchedule"
            min={0}
            max={365}
          />

          <datalist id="defaultSchedule">
            <option value="3" />
            <option value="7" />
            <option value="14" />
            <option value="21" />
            <option value="30" />
          </datalist>
        </div>

        <div className="flex gap-6">
          <button className="btn" type="submit" onClick={submitForm}>
            Add Plant
          </button>
          <button
            className="btn"
            type="button"
            onClick={() => useShowStore.setState({ createForm: false })}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};
