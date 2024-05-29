import { addDate } from "@/features/calendar/api";
import { useDateStore } from "@/features/calendar/stores/dateStore";
import { Plant } from "@/types";
import { notify } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { FormEvent, useRef } from "react";

interface Props {
  plants: Plant[];
}

export const AddHistory = ({ plants }: Props) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const date = useDateStore((state) => dayjs(state.date).format("YYYY-MM-DD"));

  const queryClient = useQueryClient();
  const addDateMutation = useMutation({
    mutationFn: addDate,
    onSuccess: () => {
      notify("success", "Date added!");
      queryClient.invalidateQueries({ queryKey: ["plants"] });
    },
  });
  // const filteredPlants = useQueryFilter({ plants, query });

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const plant_id = [Number(form.plantId.value)];

    addDateMutation.mutate({
      plant_id,
      date,
    });
  };

  function showModal() {
    modalRef?.current?.showModal();
  }

  return (
    <>
      <button onClick={showModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box flex flex-col gap-6">
          <form method="dialog" className="flex items-center justify-between">
            <h3 className="text-2xl">Add Plant to Date</h3>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </form>
          <form
            className="flex  flex-col items-center gap-4"
            onSubmit={submitForm}
          >
            <label className="form-control w-full max-w-xs">
              <select
                className="select w-full max-w-xs"
                name="plantId"
                defaultValue="null"
              >
                <option value="null">Add Plant</option>
                {plants.map((group) => {
                  return (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  );
                })}
              </select>
            </label>
            <button type="submit" className="btn-primary btn w-full">
              Submit
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};
