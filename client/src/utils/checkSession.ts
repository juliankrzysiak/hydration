import { supabase } from "@/features/auth/lib/auth";
import { redirect } from "react-router-dom";

export const checkSession = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const uid = sessionStorage.getItem("uid");
  if (!session && !uid) return redirect("/account/login");
  return null;
};
