import { Plant } from "../types";
import { useCalendarDates } from "./useCalendarDates";

interface Args {
  plants: Plant[];
  query: string;
  type: "ADD" | "DELETE";
}

const filterWithQuery = (plants: Plant[], query: string) => {
  return plants.filter((plant) =>
    plant.name
      .toLowerCase()
      .replace(/\s+/g, "")
      .includes(query.toLowerCase().replace(/\s+/g, ""))
  );
};

export const useFilter = ({ plants, query, type }: Args) => {
  const [, watered] = useCalendarDates({ plants });

  const notAddedPlants = plants.filter((plant) => !watered.includes(plant));

  // Plants that are already listed are not allowed to be ADDED again
  if (type === "ADD") {
    if (!query) return notAddedPlants;
    return filterWithQuery(notAddedPlants, query);
  }
  // Plants that are already listed are the only ones that can be Deleted
  if (type === "DELETE") {
    if (!query) return watered;
    return filterWithQuery(watered, query);
  }
  return plants;
};
