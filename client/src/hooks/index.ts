import { Group, Plant } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getAllPlants } from "@/features/calendar/api";
import { getAllGroups } from "@/features/calendar/api";

type State = {
  allPlants: Plant[];
  groupedPlants: Group[];
  singlePlants: Plant[];
  loading: boolean;
  error: boolean;
};

export function useSeparatePlants() {
  const state: State = {
    allPlants: [],
    groupedPlants: [],
    singlePlants: [],
    loading: false,
    error: false,
  };

  const allPlants = useQuery({
    queryKey: ["plants"],
    queryFn: getAllPlants,
  });
  const groups = useQuery({
    queryKey: ["groups"],
    queryFn: getAllGroups,
  });

  if (allPlants.isLoading || groups.isLoading) {
    state.loading = true;
    return state;
  }
  if (allPlants.isError || groups.isError) {
    state.error = true;
    return state;
  } else {
    const groupedPlants = groups.data.map((group) => {
      const plants = allPlants.data.filter(
        (plant) => plant.group_id === group.id
      );
      return { ...group, plants };
    });
    const singlePlants = allPlants.data.filter((plant) => !plant.group_id);

    state.allPlants = allPlants.data;
    state.groupedPlants = groupedPlants;
    state.singlePlants = singlePlants;

    return state;
  }
}
