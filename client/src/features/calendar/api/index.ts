import { PlantDate, PlantCreate, PlantEdit } from "../types";
import { getUid } from "../utils/getUid";
import { catchApiError } from "../utils/catchApiError";
import { Plant } from "../types";

const url = "http://localhost:3001/api/plants";

export const getAllPlants = async (): Promise<Plant[]> => {
  const uid = await getUid();
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      uid,
    },
  });

  return res.json();
};

export const createPlant = async (plant: PlantCreate) => {
  try {
    const uid = await getUid();
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        uid,
      },
      body: JSON.stringify(plant),
    });

    return res.json();
  } catch (error) {
    catchApiError(error, "Could not create plant!");
  }
};

export const editPlant = async ({
  id,
  name,
  schedule,
}: {
  id: number;
  name: string;
  schedule: number;
}) => {
  try {
    const uid = await getUid();
    const res = await fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        uid,
      },
      body: JSON.stringify({ name, schedule }),
    });
    return res.json();
  } catch (error) {
    catchApiError(error, "Could not edit plant!");
  }
};

export const addDate = async (body: PlantDate) => {
  try {
    const res = await fetch(`${url}/water`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return res.json();
  } catch (error) {
    catchApiError(error, "Could not add date!");
  }
};

export const deleteDate = async (body: PlantDate) => {
  try {
    const res = await fetch(`${url}/water`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return res.json();
  } catch (error) {
    catchApiError(error, "Could not delete date!");
  }
};

export const deletePlant = async (id: { plant_id: number }) => {
  try {
    const uid = await getUid();
    const res = await fetch(`${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        uid,
      },
      body: JSON.stringify(id),
    });

    return res.json();
  } catch (error) {
    catchApiError(error, "Could not delete plant!");
  }
};
