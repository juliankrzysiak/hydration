import { Plant } from "@/types";
import { Entry } from "./Entry";
import { useState } from "react";

type Props = {
  id: number;
  name: string;
  plants: Plant[];
};

export default function Group({ id, name, plants }: Props) {
  const initialIsOpen = localStorage.getItem(id.toString()) || "false";
  const [isOpen, setIsOpen] = useState(JSON.parse(initialIsOpen));

  function toggleIsOpen() {
    const openStatus = !isOpen;

    localStorage.setItem(id.toString(), openStatus.toString());
    setIsOpen(openStatus);
  }
  return (
    <div className={`collapse ${isOpen ? "collapse-open" : "collpase-close"}`}>
      <input type="checkbox" className="min-h-0" onClick={toggleIsOpen} />
      <div className="collapse-title min-h-0 px-0 py-0 text-xl">{name}</div>
      <ul className="collapse-content flex flex-col">
        {plants.map((plant) => {
          const watered = plant.watered.slice(-1).at(0);
          return (
            <Entry
              key={plant.id}
              id={plant.id}
              name={plant.name}
              watered={watered}
            />
          );
        })}
      </ul>
    </div>
  );
}
