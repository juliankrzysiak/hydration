import { useDateStore } from "../stores/dateStore";
import { Plant } from "@/types";
import dayjs from "dayjs";

export const usePlantsForToday = (plants: Plant[]) => {
  const date = useDateStore((state) => state.date);

  const scheduledPlants = getScheduledPlants(plants, date);

  const wateredPlants = getWateredPlants(plants, date);

  const leftOverPlants = getLeftOverPlants(plants, [
    ...scheduledPlants,
    ...wateredPlants,
  ]);

  const formattedDate = getFormattedDate(date);

  return {
    scheduledPlants,
    wateredPlants,
    leftOverPlants,
    formattedDate,
  };
};

function getScheduledPlants(plants: Plant[], date: Date) {
  return plants.filter((plant) =>
    dayjs(plant.next_water).isSame(dayjs(date), "day")
  );
}

function getWateredPlants(plants: Plant[], date: Date) {
  return plants.filter((plant) =>
    plant.watered.some((wateredDate) =>
      dayjs(wateredDate).isSame(dayjs(date), "day")
    )
  );
}

function getLeftOverPlants(allPlants: Plant[], combinedPlants: Plant[]) {
  const leftOverPlants = allPlants.filter(
    ({ id }) => !combinedPlants.some((plant) => plant.id === id)
  );
  return leftOverPlants;
}

function getFormattedDate(date: Date) {
  return dayjs(date).isSame(dayjs(), "day")
    ? "Today"
    : dayjs(date).format("MMMM D");
}
