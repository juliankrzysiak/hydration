import { useState } from "react";
import { Plant } from "../../types";
import { AddHistory } from "@/features/calendar/components/Forms/AddHistory";
import { DeleteHistory } from "@/features/calendar/components/Forms/DeleteHistory";
import plus from "@/features/calendar/assets/plus.svg";
import cancel from "@/features/calendar/assets/cancel.svg";

interface Props {
  plants: Plant[];
}

export const ShowForm = ({ plants }: Props) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const showCorrectForm = () => {
    if (showAddForm)
      return <AddHistory plants={plants} handleInput={setShowAddForm} />;
    if (showDeleteForm)
      return <DeleteHistory plants={plants} handleInput={setShowDeleteForm} />;
    else
      return (
        <>
          <button
            className="rounded-md bg-gray-700/20 p-1"
            aria-label="Show Add Date Form"
            onClick={() => setShowAddForm(true)}
          >
            <img className="w-5" src={plus} alt="Plus" />
          </button>
          <button
            className="rounded-md bg-gray-700/20 p-1"
            aria-label="Show Delete Date Form"
            onClick={() => setShowDeleteForm(true)}
          >
            <img className="w-5" src={cancel} alt="Cancel" />
          </button>
        </>
      );
  };

  return <div className="flex gap-6 self-center">{showCorrectForm()}</div>;
};
