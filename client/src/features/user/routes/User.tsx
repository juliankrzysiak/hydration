import person from "@/assets/person.svg";
import { Tabs } from "../components/Tabs";
import { Notification } from "@/components/Notification";
import { useQuery } from "@tanstack/react-query";
import { getName } from "../api/supabase";
import { AuthError } from "@supabase/supabase-js";
import { notify } from "@/utils/notify";
import { supabase } from "@/features/auth/lib/auth";
import { useNavigate } from "react-router-dom";

export const User = () => {
  const navigate = useNavigate();
  const { data: name } = useQuery({
    queryFn: getName,
    queryKey: ["name"],
    onError: (error: AuthError) => notify("error", error.message),
  });

  return (
    <main className="relative flex min-h-screen flex-col items-center bg-neutral-100">
      <div className="my-6 flex flex-col items-center ">
        <img className="w-12" src={person} alt="Person" />
        <p>Hello, {name ?? "Jane"}</p>
      </div>
      <button
        className="btn-warning mb-10"
        onClick={() => {
          supabase.auth.signOut();
          navigate("/account/login");
        }}
      >
        Sign Out
      </button>
      <Tabs />
      {sessionStorage.getItem("uid") && (
        <p className="max-w-xs">
          To access these features, please sign out and create an account.
          <br />
          All data will be deleted.
        </p>
      )}
      <Notification />
    </main>
  );
};
