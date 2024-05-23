import EditButton from "@/components/Buttons/EditButton";
import { SinglePlantsContext } from "@/features/list/context";
import { Group, Plant } from "@/types";
import { FormEvent, useContext, useRef, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { notify } from "@/utils";
import { editGroup } from "@/features/list/api";

type Props = {
  group: Group;
};

export default function EditGroup({ group }: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const initialSinglePlants = useContext(SinglePlantsContext);
  const [groupPlants, setGroupPlants] = useState<Plant[]>(group.plants);
  const [singlePlants, setSinglePlants] = useState(initialSinglePlants);

  const queryClient = useQueryClient();
  const editGroupMutation = useMutation({
    mutationFn: editGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plants"] });
      notify("success", "Group edited");
    },
    onError: () => {
      notify("error", "Could not edit group.");
    },
  });

  function showModal() {
    // The dialog is not unmounted when dialog is closed, so to emulate the default values on remounting, I set the state manually when dialog opened
    setGroupPlants(group.plants);
    setSinglePlants(initialSinglePlants);

    modalRef.current?.showModal();
  }

  function removePlantFromGroup(id: number) {
    const currentGroupPlant = groupPlants.find((plant) => plant.id === id);
    if (!currentGroupPlant) return;

    const updatedGroupPlants = groupPlants.filter(
      (plant) => plant.id !== currentGroupPlant.id
    );
    const updatedSinglePlants = [...singlePlants, currentGroupPlant];

    setGroupPlants(updatedGroupPlants);
    setSinglePlants(updatedSinglePlants);
  }

  function addPlantToGroup() {
    const currentSinglePlant = singlePlants.find(
      (plant) => plant.id === Number(selectRef.current?.value)
    );
    if (!currentSinglePlant) return;
    const updatedSinglePlants = singlePlants.filter(
      (plant) => plant.id !== currentSinglePlant?.id
    );
    const updatedGroupPlants = [...groupPlants, currentSinglePlant];

    setGroupPlants(updatedGroupPlants);
    setSinglePlants(updatedSinglePlants);
  }

  function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const name = form.groupName.value;
    const schedule = Number(form.schedule.value);

    const data = {
      id: group.id,
      name,
      schedule,
    };

    editGroupMutation.mutate(data);
  }

  return (
    <>
      <EditButton handleClick={showModal} />
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <form method="dialog" className="flex items-center justify-between">
            <h3 className="text-2xl">Edit Group</h3>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </form>
          <form className="flex flex-col gap-2 ">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Name</span>
              </div>
              <input
                type="text"
                name="groupName"
                className="input-bordered input w-full max-w-xs"
                defaultValue={group.name}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Schedule</span>
              </div>
              <input
                type="text"
                name="schedule"
                className="input-bordered input w-full max-w-xs"
                defaultValue={group.schedule}
              />
            </label>
            <label htmlFor="addPlant" className="flex flex-col gap-1">
              <h3 className="text-lg">Plants</h3>
              <ul>
                {groupPlants.map((plant) => {
                  return (
                    <li key={plant.id} className="w-full">
                      <span className="flex items-center gap-2">
                        {plant.name}
                        <button
                          className="btn-error btn btn-square btn-sm"
                          onClick={() => removePlantFromGroup(plant.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="flex items-center justify-between gap-2">
                <select
                  ref={selectRef}
                  className="select w-full max-w-xs"
                  id="addPlant"
                  defaultValue="null"
                >
                  <option value="null">Add plant to group</option>
                  {singlePlants.map((plant) => {
                    return (
                      <option key={plant.id} value={plant.id}>
                        {plant.name}
                      </option>
                    );
                  })}
                </select>
                <button
                  type="button"
                  className="btn-primary btn btn-square btn-sm"
                  onClick={addPlantToGroup}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                </button>
              </div>
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
}
