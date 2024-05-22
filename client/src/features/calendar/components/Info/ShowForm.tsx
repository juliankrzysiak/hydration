import { useState } from "react";
import { Plant } from "../../../../types";
import { AddHistory } from "@/features/calendar/components/Forms/History/AddHistory";
import { DeleteHistory } from "@/features/calendar/components/Forms/History/DeleteHistory";
import { Buttons } from "@/components/Buttons";

interface Props {
  plants: Plant[];
}

export const ShowForm = ({ plants }: Props) => {
  const [showAddForm, setShowAddForm] = useState(false);
  // const [showDeleteForm, setShowDeleteForm] = useState(false);

  const showCorrectForm = () => {
    if (showAddForm)
      return <AddHistory plants={plants} handleInput={setShowAddForm} />;
    else return <Buttons accept={() => setShowAddForm(true)} />;
  };

  return <div className="mt-4 flex w-full gap-6">{showCorrectForm()}</div>;
};
