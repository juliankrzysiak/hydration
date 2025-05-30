import { Group, Plant, PlantDate } from "../../../types";
import { catchApiError } from "../utils/catchApiError";
import { getUid } from "../utils/getUid";

// TODO: Throw this in env
const url =
  import.meta.env.VITE_LOCALHOST || "https://water-schedule.fly.dev/api";

export const getAllPlants = async (): Promise<Plant[]> => {
  const uid = await getUid();
  const res = await fetch(`${url}/plants`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      uid,
    },
  });

  return res.json();
};

export const getAllGroups = async (): Promise<Group[]> => {
  const uid = await getUid();
  const res = await fetch(`${url}/groups`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      uid,
    },
  });

  return res.json();
};

export const editPlant = async ({
  id,
  name,
  schedule,
  group_id,
}: {
  id: number;
  name: string;
  schedule: number;
  group_id: number | null;
}) => {
  try {
    const uid = await getUid();
    const body = JSON.stringify({ name, schedule, group_id });
    const res = await fetch(`${url}/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        uid,
      },
      body,
    });
    return res.json();
  } catch (error) {
    catchApiError(error, "Could not edit plant!");
  }
};

export const addDate = async (payload: PlantDate) => {
  try {
    const body = JSON.stringify(payload);
    const res = await fetch(`${url}/plants/water`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    return res;
  } catch (error) {
    catchApiError(error, "Could not add date!");
  }
};

export const deleteDate = async (payload: PlantDate) => {
  try {
    const body = JSON.stringify(payload);
    const res = await fetch(`${url}/plants/water`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    return res;
  } catch (error) {
    catchApiError(error, "Could not delete date!");
  }
};
