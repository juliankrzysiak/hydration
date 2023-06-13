import person from "@/assets/person.svg";
import { Tabs } from "../components/Tabs";
import { Notification } from "@/components/Notification";
import { useQuery } from "@tanstack/react-query";
import { getName } from "../api";

export const User = () => {
  const { data: name } = useQuery({
    queryKey: ["name"],
    queryFn: getName,
  });

  return (
    <main className="relative flex min-h-screen flex-col items-center bg-neutral-100">
      <div className="mb-4 flex flex-col items-center">
        <img className="w-12" src={person} alt="Person" />
        <p>Hello, {name ?? "Jane"}</p>
      </div>
      <Tabs />
      <Notification />
    </main>
  );
};
