import { useField } from "@/hooks/useField";
import { useShowFormStore } from "@/features/calendar/stores/showFormStore";

interface Props {
  id: number;
  name: string;
  schedule: number;
}

export const EditPlant = (props: Props) => {
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

  return (
    <form className="flex flex-col gap-3">
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

      <div className="flex gap-6">
        <button className="btn" type="submit">
          Edit Plant
        </button>
        <button
          className="btn"
          onClick={() => useShowFormStore.setState({ editPlant: false })}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
