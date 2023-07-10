import Calendar from "../components/Calendar";
import { useQuery } from "@tanstack/react-query";
import { getAllPlants } from "../api";
import { Info } from "../components/Info";
import { useShowFormStore } from "../stores/showFormStore";
import { Notification } from "@/components/Notification";
import { Filter } from "../components/Filter";
import { FilterForm } from "../components/Filter/FilterForm";
import { useFilterStore } from "../stores/filterStore";
import { Loader } from "@/components/Loader";
import { ErrorPage } from "@/routes/ErrorPage";

export const Home = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["plants"],
    queryFn: getAllPlants,
  });
  const filterSelections = useFilterStore((state) =>
    state.plants.map((plant) => plant.id)
  );

  const showFilterForm = useShowFormStore((state) => state.filterPlant);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorPage />;

  return (
    <section className="flex flex-col items-center gap-4">
      <Calendar
        plants={
          filterSelections.length > 0
            ? data?.filter((plant) => filterSelections.includes(plant.id))
            : data
        }
      />
      <section className="flex w-full max-w-md flex-col gap-4">
        <Filter />
        {showFilterForm ? (
          <FilterForm plants={data} />
        ) : (
          <Info
            plants={
              filterSelections.length > 0
                ? data?.filter((plant) => filterSelections.includes(plant.id))
                : data
            }
          />
        )}
      </section>
      <Notification />
    </section>
  );
};
