import { Plant } from "@/types";
import { usePlantsForToday } from "./usePlantsForToday";
import { sortAsc } from "@/utils";

interface Args {
  plants: Plant[];
  query: string;
  type?: "ADD" | "DELETE";
}

const filterWithQuery = (plants: Plant[], query: string) => {
  if (!query) return plants;

  return plants.filter((plant) =>
    plant.name
      .toLowerCase()
      .replace(/\s+/g, "")
      .includes(query.toLowerCase().replace(/\s+/g, ""))
  );
};

export const useQueryFilter = ({ plants, query, type }: Args) => {
  const [, addedPlants] = usePlantsForToday(plants);

  const notAddedPlants = plants.filter((plant) => !addedPlants.includes(plant));

  // Plants that are already listed are not allowed to be ADDED again
  if (type === "ADD") {
    return filterWithQuery(sortAsc(notAddedPlants), query);
  }
  // Plants that are already listed are the only ones that can be Deleted
  if (type === "DELETE") {
    return filterWithQuery(sortAsc(addedPlants), query);
  }

  return plants;
};
