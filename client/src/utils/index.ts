import { Group, Plant } from "@/types";
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
  if (!session && !uid) return false;
  else return true;
};

export async function redirectGuest() {
  const isUser = await checkSession();
  if (!isUser) return redirect("/account/login");
  else return null;
}

export function mapId(items: Plant[] | Group[]) {
  return items.map((e) => e.id);
}

export function getDifferenceOfArrays<T>(oldArr: T[], newArr: T[]) {
  const removedItems = oldArr.filter((id) => !newArr.includes(id));
  const addedItems = newArr.filter((id) => !oldArr.includes(id));

  return [addedItems, removedItems];
}
