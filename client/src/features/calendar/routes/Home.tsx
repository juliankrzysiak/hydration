import { Loader } from "@/components/Loader";
import { useDesktopWidth } from "@/hooks/useDesktopWidth";
import { ErrorPage } from "@/routes/ErrorPage";
import { useQuery } from "@tanstack/react-query";
import { getAllPlants } from "../api";
import Calendar from "../components/Calendar";
import { Filter } from "../components/Filter";
import { FilterForm } from "../components/Filter/FilterForm";
import { useFilterStore } from "../stores/filterStore";
import { useShowFormStore } from "@/stores/showFormStore";
import { PlantsRoute } from "../../list/routes/PlantsRoute";
import { Water } from "../components/Water";

export const Home = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["plants"],
    queryFn: getAllPlants,
  });
  const filterSelections = useFilterStore((state) =>
    state.plants.map((plant) => plant.id)
  );

  const showFilterForm = useShowFormStore((state) => state.filterPlant);

  const [width] = useDesktopWidth();

  if (isLoading) return <Loader />;
  if (isError) return <ErrorPage />;

  return (
    <section className="flex h-full grow flex-col items-center gap-4 xl:flex-row xl:items-start xl:justify-evenly">
      <Calendar
        plants={
          filterSelections.length > 0
            ? data?.filter((plant) => filterSelections.includes(plant.id))
            : data
        }
      />

      <div className="relative flex h-full w-full max-w-md flex-col gap-4 ">
        <Filter />
        {/* todo move this inside Info */}
        {showFilterForm ? (
          <FilterForm plants={data} />
        ) : (
          <Water
            plants={
              filterSelections.length > 0
                ? data?.filter((plant) => filterSelections.includes(plant.id))
                : data
            }
          />
        )}
      </div>
      {/* Fix using media query */}
      {width && <PlantsRoute />}
    </section>
  );
};
