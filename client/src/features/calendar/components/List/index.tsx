import { Plant } from "../../types";
import { ListPlant } from "./ListPlant";

interface Props {
  plants: Plant[];
}

export const List = ({ plants }: Props) => {
  return (
    <section className=" flex w-full max-w-sm flex-col rounded-md bg-gray-800/90 p-4 shadow-lg">
      <h1 className="mb-4 text-3xl text-neutral-200 underline">Your Plants</h1>
      <ol className="flex flex-col gap-2">
        {plants.map((plant) => (
          <ListPlant key={plant.id} name={plant.name} />
        ))}
      </ol>
    </section>
  );
};
