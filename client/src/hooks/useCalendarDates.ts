import { useDateStore } from "../store";
import { Plant } from "../types";
import dayjs from "dayjs";

interface Args {
  plants: Plant[];
}

type Tuple = [Plant[], Plant[], string];

export const useCalendarDates = ({ plants }: Args) => {
  const date = useDateStore((state) => state.date);

  const scheduled = plants.filter((plant) =>
    dayjs(plant.next_water).isSame(dayjs(date), "day")
  );

  const watered = plants.filter((plant) =>
    plant.watered.some((wateredDate) =>
      dayjs(wateredDate).isSame(dayjs(date), "day")
    )
  );

  const isItToday = dayjs(date).isSame(dayjs(), "day")
    ? "Today"
    : dayjs(date).format("MMMM D");

  const dates: Tuple = [scheduled, watered, isItToday];
  return dates;
};
