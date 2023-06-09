import { Plant } from "../../types";
import { ShowForm } from "./ShowForm";
import { useCalendarDates } from "../../hooks/useCalendarDates";

interface Props {
  plants: Plant[];
}

export const Info = ({ plants }: Props) => {
  const [scheduledPlants, wateredPlants, todayOrDate] = useCalendarDates({
    plants,
  });

  return (
    <section className="m-4 flex flex-col rounded-md bg-gray-900/20 p-4 shadow-lg">
      <div className="flex">
        <h2 className="mb-2 text-2xl underline ">{todayOrDate}</h2>
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
