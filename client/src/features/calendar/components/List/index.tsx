import { Plant } from "../../types";
import { ListPlant } from "./ListPlant";
import { useShowFormStore } from "../../stores/showFormStore";
import plusSVG from "@/assets/plus.svg";
import { AddPlant } from "../Forms/Plant/AddPlant";
import Group from "./Group";

interface Props {
  plants: Plant[];
}

export const List = ({ plants }: Props) => {
  const groups = [
    ...new Set(plants.flatMap((plant) => (plant.group ? plant.group : []))),
  ];
  const singlePlants = plants.filter((plant) => Boolean(!plant.group));

  const showCreateForm = useShowFormStore((state) => state.addPlant);
  if (showCreateForm) return <AddPlant />;

  return (
    <section>
      <h1 className="mb-4 text-3xl text-gray-950 ">Your Plants</h1>
      <ul>
        {groups.map((group) => {
          return (
            <Group
              key={group}
              name={group}
              plants={plants.filter((plant) => plant.group === group)}
            />
          );
        })}
      </ul>
      <ol className="mb-6 flex flex-col gap-2">
        {singlePlants.map((plant) => (
          <ListPlant
            key={plant.id}
            id={plant.id}
            name={plant.name}
            watered={plant.watered.slice(-1).at(0)}
          />
        ))}
      </ol>
      <button
        className="rounded-md border-2 border-gray-800 hover:bg-gray-300/50"
        aria-label="Show Add Date Form"
        onClick={() => useShowFormStore.setState({ addPlant: true })}
      >
        <img className="w-7" src={plusSVG} alt="Plus" />
      </button>
    </section>
  );
};
