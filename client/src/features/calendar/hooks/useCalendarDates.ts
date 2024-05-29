import { useDateStore } from "../stores/dateStore";
import { Plant } from "@/types";
import dayjs from "dayjs";

type Tuple = [Plant[], Plant[], string];

export const usePlantsForToday = (plants: Plant[]) => {
  const date = useDateStore((state) => state.date);

  const getScheduled = () =>
    plants.filter((plant) =>
      dayjs(plant.next_water).isSame(dayjs(date), "day")
    );

  const getWatered = () =>
    plants.filter((plant) =>
      plant.watered.some((wateredDate) =>
        dayjs(wateredDate).isSame(dayjs(date), "day")
      )
    );

  const isItToday = () =>
    dayjs(date).isSame(dayjs(), "day") ? "Today" : dayjs(date).format("MMMM D");

  const dates: Tuple = [getScheduled(), getWatered(), isItToday()];

  return dates;
};
