import { Plant } from "../types";
interface Args {
  plants: Plant[];
  query: string;
}

export const useFilter = ({ plants, query }: Args) => {
  const filteredPlants =
    query === ""
      ? plants
      : plants.filter((plant: Plant) =>
          plant.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return [filteredPlants];
};
