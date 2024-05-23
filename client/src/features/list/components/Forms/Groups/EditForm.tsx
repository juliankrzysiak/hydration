import EditButton from "@/components/Buttons/EditButton";
import { SinglePlantsContext } from "@/features/list/context";
import { Group, Plant } from "@/types";
import { useContext, useRef, useState } from "react";

type Props = {
  group: Group;
};

export default function EditForm({ group }: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const initialSinglePlants = useContext(SinglePlantsContext);
  const [groupPlants, setGroupPlants] = useState<Plant[]>(group.plants);
  const [singlePlants, setSinglePlants] = useState(initialSinglePlants);

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

  return (
    <>
      <EditButton handleClick={showModal} />
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <form action="">
            <h3 className="text-lg font-bold">Edit Group</h3>
            <label className="input-bordered input flex items-center gap-2">
              Name
              <input type="text" className="grow" defaultValue={group.name} />
            </label>
            <label className="input-bordered input flex items-center gap-2">
              Schedule
              <input
                type="number"
                className="grow"
                defaultValue={group.schedule}
              />
            </label>
            <label htmlFor="">
              Plants
              <ul>
                {groupPlants.map((plant) => {
                  return (
                    <li key={plant.id} className="w-full">
                      <span>
                        {plant.name}
                        <button onClick={() => removePlantFromGroup(plant.id)}>
                          X
                        </button>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </label>
            <div>
              <select ref={selectRef} className="select w-full max-w-xs">
                <option disabled selected>
                  Add plant to group
                </option>
                {singlePlants.map((plant) => {
                  return (
                    <option key={plant.id} value={plant.id}>
                      {plant.name}
                    </option>
                  );
                })}
              </select>
              <button type="button" onClick={addPlantToGroup}>
                Add
              </button>
            </div>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
