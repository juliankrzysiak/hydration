import { Buttons } from "@/components/Buttons";
import { AddHistory } from "@/features/calendar/components/Forms/History/AddHistory";
import { useState } from "react";
import { Plant } from "@/types";

interface Props {
  plants: Plant[];
}

export const ShowForm = ({ plants }: Props) => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="mt-4 flex w-full gap-6">
      {showAddForm ? (
        <AddHistory plants={plants} handleInput={setShowAddForm} />
      ) : (
        <Buttons accept={() => setShowAddForm(true)} />
      )}
    </div>
  );
};
