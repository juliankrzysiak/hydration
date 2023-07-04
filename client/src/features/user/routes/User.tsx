import person from "@/assets/person.svg";
import { Tabs } from "../components/Tabs";
import { Notification } from "@/components/Notification";
import { useQuery } from "@tanstack/react-query";
import { getName } from "../api/supabase";
import { AuthError } from "@supabase/supabase-js";
import { notify } from "@/utils/notify";
import { supabase } from "@/features/auth/lib/auth";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../api";

export const User = () => {
  const navigate = useNavigate();
  const { data: name } = useQuery({
    queryFn: getName,
    queryKey: ["name"],
    onError: (error: AuthError) => notify("error", error.message),
  });

  const signOut = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const guestUid = sessionStorage.getItem("uid");

    if (guestUid) {
      await deleteAccount();
      sessionStorage.clear();
    } else {
      const { error } = await supabase.auth.signOut();
      if (error) return notify("error", error.message);
    }
    navigate("/account/login");
  };

  return (
    <section className="relative flex flex-col items-center">
      <div className=" mb-2 flex flex-col items-center ">
        <img className="w-12" src={person} alt="Person" />
        <p className="text-lg">{name ?? "Jane"}</p>
      </div>
      <button
        className="mb-10 rounded-md border-2 border-gray-900 bg-red-200 px-2 py-1 font-semibold"
        onClick={signOut}
      >
        Sign Out
      </button>
      <Tabs />
      {sessionStorage.getItem("uid") && (
        <p className="max-w-xs">
          To access these features, please sign out and create an account.
          <br />
          <br />
          All data will be deleted.
        </p>
      )}
      <Notification />
    </section>
  );
};
