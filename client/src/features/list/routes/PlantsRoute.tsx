import { Loader } from "@/components/Loader";
import { useSeparatePlants } from "@/hooks";
import { ErrorPage } from "@/routes/ErrorPage";
import * as Tab from "@radix-ui/react-tabs";
import { SinglePlantsContext } from "../context";
import GroupsLayout from "./GroupsLayout";
import PlantsLayout from "./PlantsLayout";

export const PlantsRoute = () => {
  const { loading, error, allPlants, groupedPlants, singlePlants } =
    useSeparatePlants();

  if (loading) return <Loader />;
  if (error) return <ErrorPage />;

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
            allPlants={allPlants}
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
