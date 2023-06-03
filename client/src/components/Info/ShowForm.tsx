import { useState } from "react";
import { AddHistory } from "../Forms/AddHistory";
import { Plant } from "../../types";

interface Props {
  plants: Plant[];
}

export const ShowForm = ({ plants }: Props) => {
  const [showInput, setShowInput] = useState(false);

  return (
    <>
      {showInput ? (
        <AddHistory plants={plants} handleInput={setShowInput} />
      ) : (
        <button
          className="self-center rounded-md bg-gray-700/20 p-1"
          onClick={() => setShowInput(true)}
        >
          <img className=" w-5" src="/plus.svg" alt="plus symbol" />
        </button>
      )}
    </>
  );
};
