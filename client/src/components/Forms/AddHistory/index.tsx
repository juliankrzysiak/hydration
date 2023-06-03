import { useState } from "react";
import { Plant } from "../../../types";
import { ConfirmButtons } from "./ConfirmButtons";
import { ComboBox } from "./ComboBox";

interface Props {
  plants: Plant[];
  handleInput: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddHistory = ({ plants, handleInput }: Props) => {
  const [selected, setSelected] = useState("");

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setSelected("");
  };

  return (
    <form className="flex w-3/4 flex-col gap-4" onSubmit={handleSubmit}>
      <ComboBox selected={selected} setSelected={setSelected} plants={plants} />
      <ConfirmButtons handleInput={handleInput} />
    </form>
  );
};
