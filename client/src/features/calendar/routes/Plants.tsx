import { Loader } from "@/components/Loader";
import { ErrorPage } from "@/routes/ErrorPage";
import { sortAsc } from "@/utils/sortAsc";
import { useQuery } from "@tanstack/react-query";
import { getAllGroups, getAllPlants } from "../api";
import { List } from "../components/List";
import { ListPlantInfo } from "../components/List/ListPlantInfo";
import { useIdStore } from "../stores/idStore";

export const Plants = () => {
  const plants = useQuery({
    queryKey: ["plants"],
    queryFn: getAllPlants,
  });
  const groups = useQuery({
    queryKey: ["groups"],
    queryFn: getAllGroups,
  });

  const id = useIdStore((state) => state.id);

  if (plants.isLoading || groups.isLoading) return <Loader />;
  if (plants.isError || groups.isError) return <ErrorPage />;

  // Put into custom hook
  const createCombinedPlants = () => {
    const groupedPlants = groups.data.map((group) => {
      const filteredPlants = plants.data.filter(
        (plant) => plant.group_id === group.id
      );
      return { ...group, plants: filteredPlants };
    });
    const singlePlants = plants.data.filter((plant) => !plant.group_id);
    return { groupedPlants, singlePlants };
  };

  const { groupedPlants, singlePlants } = createCombinedPlants();

  return (
    <section className=" flex h-full w-full max-w-md ">
      <div className="relative flex w-full flex-col rounded-md bg-gray-900/20  p-4 shadow-lg">
        {id ? (
          <ListPlantInfo
            plant={plants.data.filter((plant) => plant.id === Number(id)).at(0)}
            groups={groupedPlants}
          />
        ) : (
          <List singlePlants={sortAsc(singlePlants)} groups={groupedPlants} />
        )}
      </div>
    </section>
  );
};
