import { Plant } from "@/types";
import { useNotificationStore } from "@/stores/notificationStore";
import { supabase } from "@/features/auth/lib/auth";
import { redirect } from "react-router-dom";

export const sortAsc = (plants: Plant[]) =>
  plants.sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base" })
  );

export const notify = (type: "info" | "error" | "success", message: string) => {
  useNotificationStore.setState({ type, message });
};

export const checkSession = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const uid = sessionStorage.getItem("uid");
  if (!session && !uid) return redirect("/account/login");
  return null;
};
