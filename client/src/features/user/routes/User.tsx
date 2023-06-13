import person from "@/assets/person.svg";
import { Tabs } from "../components/Tabs";
import { Notification } from "@/components/Notification";
import { useQuery } from "@tanstack/react-query";
import { getName } from "../api";
import { AuthError } from "@supabase/supabase-js";
import { notify } from "@/utils/notify";

export const User = () => {
  const { data: name } = useQuery({
    queryKey: ["name"],
    queryFn: getName,
    onError: (error: AuthError) => notify("error", error.message),
  });

  return (
    <main className="relative flex min-h-screen flex-col items-center bg-neutral-100">
      <div className="my-6 flex flex-col items-center ">
        <img className="w-12" src={person} alt="Person" />
        <p>Hello, {name ?? "Jane"}</p>
      </div>
      <button className="btn-warning mb-10">Sign Out</button>
      <Tabs />
      <Notification />
    </main>
  );
};
