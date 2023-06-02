import Calendar from "./components/Calendar";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getAllPlants } from "./api";
import { Info } from "./components/Info";
import { Menu } from "./components/Menu";
import { useShowStore } from "./store";
import { CreateForm } from "./components/Forms/CreateForm";

export default function App() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["plants"],
    queryFn: getAllPlants,
  });
  const showCreateForm = useShowStore((state) => state.createForm);

  if (isLoading) return <main>Loading...</main>;
  if (isError) return <main>Something went wrong!</main>;

  return (
    <main>
      <Calendar plants={data} />
      {showCreateForm ? <CreateForm /> : <Info plants={data} />}
      <Menu />
    </main>
  );
}
