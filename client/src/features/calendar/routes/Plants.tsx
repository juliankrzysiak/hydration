import { useQuery } from "@tanstack/react-query";
import { Notification } from "@/components/Notification";
import { getAllPlants } from "../api";
import { Loader } from "@/components/Loader";
import { ErrorPage } from "@/routes/ErrorPage";
import { List } from "../components/List";

export const Plants = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["plants"],
    queryFn: getAllPlants,
  });
  if (isLoading) return <Loader />;
  if (isError) return <ErrorPage />;

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 bg-gradient-to-bl from-blue-100 via-blue-300 to-blue-500 p-4">
      <List />
      <Notification />
    </main>
  );
};
