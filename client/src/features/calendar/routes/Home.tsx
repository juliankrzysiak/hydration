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
import { useDesktopWidth } from "@/hooks/useDesktopWidth";

export const Home = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["plants"],
    queryFn: getAllPlants,
  });
  const filterSelections = useFilterStore((state) =>
    state.plants.map((plant) => plant.id)
  );
  const [width] = useDesktopWidth(1200);

  const showFilterForm = useShowFormStore((state) => state.filterPlant);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorPage />;

  return (
    <section
      className={`flex items-center justify-around gap-4 ${
        !width && "flex-col"
      }`}
    >
      <Calendar
        plants={
          filterSelections.length > 0
            ? data?.filter((plant) => filterSelections.includes(plant.id))
            : data
        }
      />
      <div className="flex w-full max-w-md flex-col gap-4">
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
      </div>
      <Notification />
    </section>
  );
};
