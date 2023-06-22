import { useQuery } from "@tanstack/react-query";
import { Notification } from "@/components/Notification";
import { getAllPlants } from "../api";
import { Loader } from "@/components/Loader";
import { ErrorPage } from "@/routes/ErrorPage";
import { List } from "../components/List";
import { sortAsc } from "@/utils/sortAsc";
import { useShowFormStore } from "../stores/showFormStore";
import { AddPlant } from "../components/Forms/Plant/AddPlant";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

export const Plants = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["plants"],
    queryFn: getAllPlants,
  });
  const showCreateForm = useShowFormStore((state) => state.addPlant);
  const { id } = useParams();

  if (isLoading) return <Loader />;
  if (isError) return <ErrorPage />;

  const plant = data.filter((plant) => plant.id === Number(id)).at(0);

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 bg-gradient-to-bl from-blue-100 via-blue-300 to-blue-500 p-4">
      <section className="relative flex w-full max-w-sm flex-col rounded-md bg-gray-900/20  p-4 shadow-lg">
        {!id &&
          (showCreateForm ? <AddPlant /> : <List plants={sortAsc(data)} />)}
        <Outlet context={{ ...plant }} />
      </section>
      <Notification />
    </main>
  );
};
