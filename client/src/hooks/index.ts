import { Group, Plant } from "@/types";

export function useSeparatePlants(
  allPlants: Plant[] | undefined,
  groups: Group[] | undefined
): [Group[], Plant[]] {
  if (!allPlants || !groups) return [[], []];
  const groupedPlants = groups.map((group) => {
    const plants = allPlants.filter((plant) => plant.group_id === group.id);
    return { ...group, plants };
  });
  const singlePlants = allPlants.filter((plant) => !plant.group_id);

  return [groupedPlants, singlePlants];
}
