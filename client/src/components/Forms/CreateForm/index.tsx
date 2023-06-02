import { useField } from "../../../hooks/useField";

export const CreateForm = () => {
  const [name, setName] = useField({ id: "name", type: "text" });
  const [schedule, setSchedule] = useField({ id: "schedule", type: "number" });

  return (
    <section className="m-4 rounded-md bg-gray-900/20 p-4 shadow-lg">
      <h2 className="mb-4 text-xl">Add Plant</h2>
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
          <button className="btn">Add Plant</button>
          <button className="btn">Cancel</button>
        </div>
      </form>
    </section>
  );
};
