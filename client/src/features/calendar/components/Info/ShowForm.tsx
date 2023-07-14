import { useState } from "react";
import { Plant } from "../../types";
import { AddHistory } from "@/features/calendar/components/Forms/History/AddHistory";
import { DeleteHistory } from "@/features/calendar/components/Forms/History/DeleteHistory";
import { Buttons } from "@/components/Buttons";

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
        <Buttons
          accept={() => setShowAddForm(true)}
          cancel={() => setShowDeleteForm(true)}
        />
      );
  };

  return <div className="flex gap-6">{showCorrectForm()}</div>;
};
