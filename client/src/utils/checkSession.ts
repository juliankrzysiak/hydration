import { supabase } from "@/features/auth/lib/auth";
import { redirect } from "react-router-dom";

export const checkSession = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return redirect("/account/login");
  return null;
};
