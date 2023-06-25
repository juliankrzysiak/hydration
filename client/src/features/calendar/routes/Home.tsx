import Calendar from "../components/Calendar";
import { useQuery } from "@tanstack/react-query";
import { getAllPlants } from "../api";
import { Info } from "../components/Info";
import { Menu } from "../components/Menu";
import { useShowFormStore } from "../stores/showFormStore";
import { Notification } from "@/components/Notification";
import { Filter } from "../components/Filter";
import { FilterForm } from "../components/Filter/FilterForm";
import { useFilterStore } from "../stores/filterStore";
import { Loader } from "@/components/Loader";
import { ErrorPage } from "@/routes/ErrorPage";
import { Header } from "@/components/Header";

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
    <main className="flex min-h-screen flex-col items-center gap-4  p-4">
      <Calendar
        plants={
          filterSelections.length > 0
            ? data?.filter((plant) => filterSelections.includes(plant.id))
            : data
        }
      />
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
      <Menu />
      <Notification />
    </main>
  );
};
