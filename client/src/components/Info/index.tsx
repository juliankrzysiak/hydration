import { useDateStore } from "../../store";
import { Plant } from "../../types";
import dayjs from "dayjs";
import { ShowForm } from "./ShowForm";

interface Props {
  plants: Plant[];
}

export const Info = ({ plants }: Props) => {
  const date = useDateStore((state) => state.date);

  const scheduledPlants = plants.filter((plant) =>
    dayjs(plant.next_water).isSame(dayjs(date), "day")
  );

  const wateredPlants = plants.filter((plant) =>
    plant.watered.some((wateredDate) =>
      dayjs(wateredDate).isSame(dayjs(date), "day")
    )
  );

  return (
    <section className="m-4 flex flex-col rounded-md bg-gray-900/20 p-4 shadow-lg">
      <div className="flex">
        <h2 className="mb-2 text-2xl underline ">
          {dayjs(date).isSame(dayjs(), "day")
            ? "Today"
            : dayjs(date).format("MMMM D")}
        </h2>
      </div>
      {scheduledPlants.length > 0 && <h3>To Water</h3>}
      {scheduledPlants.map((plant) => {
        return (
          <div className="mb-2 flex text-lg" key={plant.id}>
            <h3 className="text-lg">{plant.name}</h3>
          </div>
        );
      })}
      {wateredPlants.length > 0 && <h3>Watered</h3>}
      {wateredPlants.map((plant) => {
        return (
          <div className="mb-2 flex text-lg" key={plant.id}>
            <h3 className="text-lg">{plant.name}</h3>
          </div>
        );
      })}
      <ShowForm plants={plants} />
    </section>
  );
};
