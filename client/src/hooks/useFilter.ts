import { Plant } from "../types";
import { useCalendarDates } from "./useCalendarDates";

interface Args {
  plants: Plant[];
  query: string;
  type: "ADD" | "DELETE";
}

// Asc
const sortPlants = (plants: Plant[]) =>
  plants.sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base" })
  );

const filterWithQuery = (plants: Plant[], query: string) => {
  if (!query) return plants;

  return plants.filter((plant) =>
    plant.name
      .toLowerCase()
      .replace(/\s+/g, "")
      .includes(query.toLowerCase().replace(/\s+/g, ""))
  );
};

export const useFilter = ({ plants, query, type }: Args) => {
  const [, addedPlants] = useCalendarDates({ plants });

  const notAddedPlants = plants.filter((plant) => !addedPlants.includes(plant));

  // Plants that are already listed are not allowed to be ADDED again
  if (type === "ADD") {
    return filterWithQuery(sortPlants(notAddedPlants), query);
  }
  // Plants that are already listed are the only ones that can be Deleted
  if (type === "DELETE") {
    return filterWithQuery(sortPlants(addedPlants), query);
  }

  return plants;
};
