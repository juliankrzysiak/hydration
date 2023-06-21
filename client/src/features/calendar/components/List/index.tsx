import { Plant } from "../../types";
import { ListPlant } from "./ListPlant";
import { useShowStore } from "../../stores/showStore";
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
          <ListPlant key={plant.id} name={plant.name} />
        ))}
      </ol>
      <DualButtons
        confirm={() => useShowStore.setState({ createForm: true })}
        cancel={() => useShowStore.setState({ deletePlant: true })}
      />
    </section>
  );
};
