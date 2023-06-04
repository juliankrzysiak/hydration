import { useState } from "react";
import { ChangeHistory } from "../Forms/ChangeHistory";
import { Plant } from "../../types";

interface Props {
  plants: Plant[];
}

export const ShowForm = ({ plants }: Props) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const showCorrectForm = () => {
    if (showAddForm)
      return (
        <ChangeHistory
          type="ADD"
          plants={plants}
          handleInput={setShowAddForm}
        />
      );
    if (showDeleteForm)
      return (
        <ChangeHistory
          type="DELETE"
          plants={plants}
          handleInput={setShowDeleteForm}
        />
      );
    else
      return (
        <>
          <button
            className="rounded-md bg-gray-700/20 p-1"
            onClick={() => setShowAddForm(true)}
          >
            <img className=" w-5" src="/plus.svg" alt="plus symbol" />
          </button>
          <button
            className="rounded-md bg-gray-700/20 p-1"
            onClick={() => setShowDeleteForm(true)}
          >
            <img className=" w-5" src="/cancel.svg" alt="plus symbol" />
          </button>
        </>
      );
  };

  return (
    <div className="flex gap-6 self-center">
      {/* {showAddForm && !showDeleteForm ? (
        <ChangeHistory plants={plants} handleInput={setShowAddForm} />
      ) : (
        <button
          className="rounded-md bg-gray-700/20 p-1"
          onClick={() => setShowAddForm(true)}
        >
          <img className=" w-5" src="/plus.svg" alt="plus symbol" />
        </button>
      )}
      {showDeleteForm && !showAddForm ? (
        <ChangeHistory plants={plants} handleInput={setShowDeleteForm} />
      ) : (
        <button
          className="rounded-md bg-gray-700/20 p-1"
          onClick={() => setShowDeleteForm(true)}
        >
          <img className=" w-5" src="/cancel.svg" alt="plus symbol" />
        </button>
      )} */}
      {showCorrectForm()}
    </div>
  );
};
