import { Group, Plant } from "@//types";
import EditButton from "@/components/Buttons/EditButton";
import { editPlant } from "@/features/calendar/api";
import { useShowFormStore } from "@/stores/showFormStore";
import { notify } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useRef } from "react";

type Props = {
  plant: Plant;
  groups: Group[];
};

export const EditPlant = ({ plant, groups }: Props) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const queryClient = useQueryClient();

  const editPlantMutation = useMutation({
    mutationFn: editPlant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plants"] });
      useShowFormStore.setState({ editPlant: false });
      notify("success", "Plant edited");
    },
    onError: () => {
      notify("error", "Could not edit plant");
    },
  });

  function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.plantName.value;
    const schedule = Number(form.schedule.value);
    const group_id = Number(form.groupId.value) || null;

    const data = {
      id: plant.id,
      name,
      schedule,
      group_id,
    };

    editPlantMutation.mutate(data);
    modalRef.current?.close();
  }

  function showModal() {
    modalRef.current?.showModal();
  }

  return (
    <>
      <EditButton handleClick={showModal} />
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <form
            method="dialog"
            className="mb-2 flex items-center justify-between"
          >
            <h3 className="text-2xl">Edit Plant</h3>
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
          <form className="flex flex-col gap-3" onSubmit={submitForm}>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Name</span>
              </div>
              <input
                type="text"
                name="plantName"
                className="input-bordered input w-full max-w-xs"
                defaultValue={plant.name}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Schedule</span>
              </div>
              <input
                className="input-bordered input w-full max-w-xs"
                type="number"
                min="0"
                max="365"
                name="schedule"
                defaultValue={plant.schedule}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Group</span>
              </div>
              <select
                className="select w-full max-w-xs"
                name="groupId"
                defaultValue={plant.group_id}
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
