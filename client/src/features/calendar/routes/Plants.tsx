import { useQuery } from "@tanstack/react-query";
import { getAllPlants } from "../api";
import { Loader } from "@/components/Loader";
import { ErrorPage } from "@/routes/ErrorPage";
import { List } from "../components/List";
import { sortAsc } from "@/utils/sortAsc";
import { ListPlantInfo } from "../components/List/ListPlantInfo";
import { useIdStore } from "../stores/idStore";

export const Plants = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["plants"],
    queryFn: getAllPlants,
  });

  const id = useIdStore((state) => state.id);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorPage />;

  return (
    <section className=" flex h-full w-full max-w-md ">
      <div className="relative flex w-full flex-col rounded-md bg-gray-900/20  p-4 shadow-lg">
        {id ? (
          <ListPlantInfo
            plant={data.filter((plant) => plant.id === Number(id)).at(0)}
          />
        ) : (
          <List plants={sortAsc(data)} />
        )}
      </div>
    </section>
  );
};
