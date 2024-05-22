import { Loader } from "@/components/Loader";
import { ErrorPage } from "@/routes/ErrorPage";
import * as Tab from "@radix-ui/react-tabs";
import { useQuery } from "@tanstack/react-query";
import { getAllGroups, getAllPlants } from "../../calendar/api";
import PlantsLayout from "./PlantsLayout";

export const PlantsRoute = () => {
  const allPlants = useQuery({
    queryKey: ["plants"],
    queryFn: getAllPlants,
  });
  const groups = useQuery({
    queryKey: ["groups"],
    queryFn: getAllGroups,
  });

  if (allPlants.isLoading || groups.isLoading) return <Loader />;
  if (allPlants.isError || groups.isError) return <ErrorPage />;

  // Put into custom hook
  const separatePlants = () => {
    const groupedPlants = groups.data.map((group) => {
      const plants = allPlants.data.filter(
        (plant) => plant.group_id === group.id
      );
      return { ...group, plants };
    });
    const singlePlants = allPlants.data.filter((plant) => !plant.group_id);

    return { groupedPlants, singlePlants };
  };

  const { groupedPlants, singlePlants } = separatePlants();

  return (
    <Tab.Root defaultValue="tab1" className="mb-8 w-full max-w-sm">
      <Tab.List
        aria-label="Pick to see plants or groups"
        className="flex w-full justify-evenly gap-6 rounded-t-md border-b border-gray-900 bg-gray-900/20 px-4 py-2 text-gray-700"
      >
        <Tab.Trigger
          value="tab1"
          className="text-lg data-[state=active]:scale-110  data-[state=active]:font-semibold data-[state=active]:text-gray-900  "
        >
          Plants
        </Tab.Trigger>
        <Tab.Trigger
          value="tab2"
          className="text-lg data-[state=active]:scale-110 data-[state=active]:font-medium data-[state=active]:text-gray-900"
        >
          Groups
        </Tab.Trigger>
      </Tab.List>
      <Tab.Content
        value="tab1"
        className="w-full rounded-b-md bg-gray-900/20 p-4"
      >
        <PlantsLayout allPlants={allPlants.data} singles={singlePlants} groups={groupedPlants} />
      </Tab.Content>
      <Tab.Content
        value="tab2"
        className="w-full rounded-b-md  bg-gray-900/20 p-4"
      ></Tab.Content>
    </Tab.Root>
  );
};
