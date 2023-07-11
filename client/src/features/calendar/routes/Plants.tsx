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
import { ListPlantInfo } from "../components/List/ListPlantInfo";

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
    <section className=" flex w-full max-w-md ">
      <div className="relative flex w-full flex-col rounded-md bg-gray-900/20  p-4 shadow-lg">
        {!id &&
          (showCreateForm ? <AddPlant /> : <List plants={sortAsc(data)} />)}
        <Outlet context={{ ...plant }} />
        
      </div>
      <Notification />
    </section>
  );
};
