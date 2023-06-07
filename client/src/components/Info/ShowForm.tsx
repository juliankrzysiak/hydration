import { useState } from "react";
import { Plant } from "@/types";
import { AddHistory } from "@/components/Forms/AddHistory/";
import { DeleteHistory } from "@/components/Forms/DeleteHistory";
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
        <>
          <button
            className="rounded-md bg-gray-700/20 p-1"
            onClick={() => setShowAddForm(true)}
          >
            <img className=" w-5" src={plus} alt="Add plant" />
          </button>
          <button
            className="rounded-md bg-gray-700/20 p-1"
            onClick={() => setShowDeleteForm(true)}
          >
            <img className=" w-5" src={cancel} alt="Delete plant" />
          </button>
        </>
      );
  };

  return <div className="flex gap-6 self-center">{showCorrectForm()}</div>;
};
