import { Loader } from "@/components/Loader";
import { useSeparatePlants } from "@/hooks";
import { useDesktopWidth } from "@/hooks/useDesktopWidth";
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

  const [width] = useDesktopWidth();

  if (loading) return <Loader />;
  if (error) return <ErrorPage />;

  return (
    <section className="flex h-full grow flex-col items-center gap-4 xl:flex-row xl:items-start xl:justify-evenly">
      <Calendar
        plants={
          filterSelections.length > 0
            ? allPlants.filter((plant) => filterSelections.includes(plant.id))
            : allPlants
        }
      />

      <div className="relative flex h-full w-full max-w-md flex-col gap-4 ">
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
      {/* Fix using media query */}
      {width && <PlantsRoute />}
    </section>
  );
};
