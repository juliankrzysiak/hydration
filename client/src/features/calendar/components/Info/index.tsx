import { Plant } from "../../types";
import { ShowForm } from "./ShowForm";
import { useCalendarDates } from "../../hooks/useCalendarDates";
import { PlantsInfo } from "./PlantsInfo";

interface Props {
  plants: Plant[];
}

export const Info = ({ plants }: Props) => {
  const [scheduledPlants, wateredPlants, todayOrDate] = useCalendarDates({
    plants,
  });

  return (
    <div className="flex h-full w-full flex-col items-start rounded-md bg-gray-900/20 p-4 text-gray-950 shadow-md ">
      <h2 className="absolute right-4 text-3xl  text-gray-800">
        {todayOrDate}
      </h2>
      <PlantsInfo plants={scheduledPlants} title="To Water" />
      <PlantsInfo plants={wateredPlants} title="Watered" />
      <ShowForm plants={plants} />
    </div>
  );
};
