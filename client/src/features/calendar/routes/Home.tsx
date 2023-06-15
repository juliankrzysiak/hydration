import Calendar from "../components/Calendar";
import { useQuery } from "@tanstack/react-query";
import { getAllPlants } from "../api";
import { Info } from "../components/Info";
import { Menu } from "../components/Menu";
import { useShowStore } from "../stores/showStore";
import { AddPlant } from "@/features/calendar/components/Forms/AddPlant";
import { Notification } from "@/components/Notification";
import { DeletePlant } from "../components/Forms/DeletePlant";
import { Filter } from "../components/Filter";
import { FilterForm } from "../components/Filter/FilterForm";

export const Home = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["plants"],
    queryFn: getAllPlants,
  });
  const showCreateForm = useShowStore((state) => state.createForm);
  const showDeleteForm = useShowStore((state) => state.deletePlant);
  const showFilterForm = useShowStore((state) => state.filterForm);

  if (isLoading) return <main>Loading...</main>;
  if (isError) return <main>Something went wrong!</main>;

  const showForm = () => {
    if (showCreateForm) return <AddPlant />;
    if (showDeleteForm) return <DeletePlant plants={data} />;
    if (showFilterForm) return <FilterForm plants={data} />;

    return <Info plants={data} />;
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 bg-gradient-to-bl from-blue-100 via-blue-300 to-blue-500 p-4">
      <Calendar plants={data} />
      <Filter />
      {showForm()}
      <Menu />
      <Notification />
    </main>
  );
};
