import Calendar from "./components/Calendar";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getAllPlants } from "./api";
import { Info } from "./components/Info";

export default function App() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["plants"],
    queryFn: getAllPlants,
  });

  if (isLoading) return <main>Loading...</main>;
  if (isError) return <main>Something went wrong!</main>;

  return (
    <main>
      <Calendar plants={data} />
      <Info plants={data} />
    </main>
  );
}
