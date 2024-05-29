import { Loader } from "@/components/Loader";
import { ErrorPage } from "@/routes/ErrorPage";
import * as Tab from "@radix-ui/react-tabs";
import { useQuery } from "@tanstack/react-query";
import { getAllGroups, getAllPlants } from "../../calendar/api";
import { SinglePlantsContext } from "../context";
import GroupsLayout from "./GroupsLayout";
import PlantsLayout from "./PlantsLayout";
import { useSeparatePlants } from "@/hooks";

export const PlantsRoute = () => {
  const allPlants = useQuery({
    queryKey: ["plants"],
    queryFn: getAllPlants,
  });
  const groups = useQuery({
    queryKey: ["groups"],
    queryFn: getAllGroups,
  });

  const [groupedPlants, singlePlants] = useSeparatePlants(
    allPlants.data,
    groups.data
  );

  if (allPlants.isLoading || groups.isLoading) return <Loader />;
  if (allPlants.isError || groups.isError) return <ErrorPage />;

  return (
    <SinglePlantsContext.Provider value={singlePlants}>
      <Tab.Root defaultValue="tab1" className="w-full max-w-sm">
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
          <PlantsLayout
            allPlants={allPlants.data}
            singles={singlePlants}
            groups={groupedPlants}
          />
        </Tab.Content>
        <Tab.Content
          value="tab2"
          className=" w-full rounded-b-md  bg-gray-900/20 p-4"
        >
          <GroupsLayout groups={groupedPlants} />
        </Tab.Content>
      </Tab.Root>
    </SinglePlantsContext.Provider>
  );
};
