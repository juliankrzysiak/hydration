import { supabase } from "@/features/auth/lib/auth";
import { PlantDate, PlantCreate } from "../types";
import { useNotificationStore } from "@/stores/notificationStore";

const url = "http://localhost:3001/api/plants";

export const getAllPlants = async () => {
  try {
    const { data } = await supabase.auth.getSession();
    if (!data.session)
      throw new Error("Session does not exist, please log in.");
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        uid: `${data.session.user.id}`,
      },
    });

    return res.json();
  } catch (error) {
    if (error instanceof Error)
      useNotificationStore.setState({
        type: "error",
        message: error.message || "Could not retreive plants!",
      });
  }
};

export const createPlant = async (plant: PlantCreate) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plant),
  });

  return res.json();
};

export const addDate = async (body: PlantDate) => {
  const res = await fetch(`${url}/water`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return res.json();
};

export const deleteDate = async (body: PlantDate) => {
  const res = await fetch(`${url}/water`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return res.json();
};

export const deletePlant = async (id: { id: number }) => {
  const res = await fetch(`${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });

  return res.json();
};
