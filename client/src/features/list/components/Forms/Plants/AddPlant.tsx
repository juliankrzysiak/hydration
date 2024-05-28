import { createPlant } from "@/features/list/api";
import { Group } from "@/types";
import { notify } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useRef } from "react";

type Props = {
  groups: Group[];
};

export const AddPlant = ({ groups }: Props) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const queryClient = useQueryClient();
  const createPlantMutation = useMutation({
    mutationFn: createPlant,
    onSuccess: () => {
      notify("success", "Plant created");
      queryClient.invalidateQueries({ queryKey: ["plants"] });
    },
  });

  function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.plantName.value;
    const schedule = Number(form.schedule.value);
    const group_id = Number(form.groupId.value) || null;

    createPlantMutation.mutate({ name, schedule, group_id });
    modalRef.current?.close();
  }

  function showModal() {
    modalRef.current?.showModal();
  }

  return (
    <>
      <button
        className="btn-neutral btn-outline btn btn-sm w-full"
        onClick={showModal}
      >
        Add
      </button>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <form
            method="dialog"
            className="mb-2 flex items-center justify-between"
          >
            <h3 className="text-2xl">Add Plant</h3>
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
          <form className="flex flex-col gap-4" onSubmit={submitForm}>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Name</span>
              </div>
              <input
                type="text"
                name="plantName"
                className="input-bordered input w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Schedule</span>
              </div>
              <input
                type="number"
                name="schedule"
                className="input-bordered input w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Group</span>
              </div>
              <select
                className="select w-full max-w-xs"
                name="groupId"
                defaultValue="null"
              >
                <option value="null">Add plant to group</option>
                {groups.map((group) => {
                  return (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  );
                })}
              </select>
            </label>
            <button type="submit" className="btn-primary btn mt-6">
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
