import { Loader } from "@/components/Loader";
import { useSeparatePlants } from "@/hooks";
import { ErrorPage } from "@/routes/ErrorPage";
import { useShowFormStore } from "@/stores/showFormStore";
import { PlantsRoute } from "../../list/routes/PlantsRoute";
import Calendar from "../components/Calendar";
import { Filter } from "../components/Filter";
import { FilterForm } from "../components/Filter/FilterForm";
import { Water } from "../components/Water";
import { useFilterStore } from "../stores/filterStore";

export const CalendarRoute = () => {
  const { loading, error, allPlants } = useSeparatePlants();

  const filterSelections = useFilterStore((state) =>
    state.plants.map((plant) => plant.id)
  );

  const showFilterForm = useShowFormStore((state) => state.filterPlant);

  if (loading) return <Loader />;
  if (error) return <ErrorPage />;

  return (
    <div className="flex h-full w-full flex-col lg:items-start items-center justify-evenly gap-4 lg:max-w-none lg:flex-row">
      <div className="flex-1">
        <Calendar
          plants={
            filterSelections.length > 0
              ? allPlants.filter((plant) => filterSelections.includes(plant.id))
              : allPlants
          }
        />
      </div>

      <div className="relative flex h-full w-full flex-col  gap-4 lg:flex-1">
        <Filter />
        {/* todo move this inside Info */}
        {showFilterForm ? (
          <FilterForm plants={allPlants} />
        ) : (
          <Water
            plants={
              filterSelections.length > 0
                ? allPlants.filter((plant) =>
                    filterSelections.includes(plant.id)
                  )
                : allPlants
            }
          />
        )}
      </div>
      <div className="hidden h-full w-full flex-1  lg:block">
        <PlantsRoute />
      </div>
    </div>
  );
};
