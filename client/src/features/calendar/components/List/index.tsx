import { Plant } from "../../types";
import { ListPlant } from "./ListPlant";
import { useShowFormStore } from "../../stores/showFormStore";
import { DualButtons } from "@/components/DualButtons";

interface Props {
  plants: Plant[];
}

export const List = ({ plants }: Props) => {
  return (
    <section>
      <h1 className="mb-4 text-3xl text-gray-900 underline">Your Plants</h1>
      <ol className="mb-4 flex flex-col gap-2">
        {plants.map((plant) => (
          <ListPlant
            key={plant.id}
            name={plant.name}
            watered={plant.watered.slice(-1).at(0)}
          />
        ))}
      </ol>
      <DualButtons
        confirm={() => useShowFormStore.setState({ addPlant: true })}
        cancel={() => useShowFormStore.setState({ deletePlant: true })}
      />
    </section>
  );
};
