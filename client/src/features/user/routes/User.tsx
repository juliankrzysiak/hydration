import { Outlet } from "react-router-dom";
import person from "@/assets/person.svg";
import { supabase } from "@/features/auth/lib/auth";
import { useName } from "../hooks/useName";

export const User = () => {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-neutral-100">
      <div className="flex flex-col">
        <img className="w-12" src={person} alt="Person" />
        <p>Hello, {"julian"}</p>
      </div>
      <Outlet />
    </main>
  );
};
