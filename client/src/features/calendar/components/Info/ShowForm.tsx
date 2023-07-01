import { useState } from "react";
import { Plant } from "../../types";
import { AddHistory } from "@/features/calendar/components/Forms/History/AddHistory";
import { DeleteHistory } from "@/features/calendar/components/Forms/History/DeleteHistory";
import plus from "@/assets/plus.svg";
import cancel from "@/assets/cancel.svg";

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
        <div className=" flex gap-4">
          <button
            className="rounded-md border-2 border-gray-800"
            aria-label="Show Add Date Form"
            onClick={() => setShowAddForm(true)}
          >
            <img className="w-6" src={plus} alt="Plus" />
          </button>
          <button
            className="rounded-md border-2 border-gray-800"
            aria-label="Show Delete Date Form"
            onClick={() => setShowDeleteForm(true)}
          >
            <img className="w-6" src={cancel} alt="Cancel" />
          </button>
        </div>
      );
  };

  return <div className="flex gap-6 ">{showCorrectForm()}</div>;
};
