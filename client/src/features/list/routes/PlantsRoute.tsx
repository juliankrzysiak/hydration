import { Loader } from "@/components/Loader";
import { useSeparatePlants } from "@/hooks";
import { ErrorPage } from "@/routes/ErrorPage";
import * as Tabs from "@radix-ui/react-tabs";
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
      <Tabs.Root
        defaultValue="tab1"
        className="flex h-full w-full max-w-xl flex-col bg-blue-300"
      >
        <Tabs.List
          aria-label="Pick to see plants or groups"
          className="flex w-full justify-evenly gap-6 rounded-t-md px-4 py-2 "
        >
          <Tabs.Trigger
            value="tab1"
            className="text-lg data-[state=active]:scale-110  data-[state=active]:font-semibold data-[state=active]:text-gray-900  "
          >
            Plants
          </Tabs.Trigger>
          <Tabs.Trigger
            value="tab2"
            className="text-lg data-[state=active]:scale-110 data-[state=active]:font-medium data-[state=active]:text-gray-900"
          >
            Groups
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content
          value="tab1"
          className="w-full flex-auto rounded-b-md bg-blue-100 p-4"
        >
          <PlantsLayout
            allPlants={allPlants}
            singles={singlePlants}
            groups={groupedPlants}
          />
        </Tabs.Content>
        <Tabs.Content
          value="tab2"
          className=" w-full flex-auto rounded-b-md bg-blue-100 p-4"
        >
          <GroupsLayout groups={groupedPlants} />
        </Tabs.Content>
      </Tabs.Root>
    </SinglePlantsContext.Provider>
  );
};
