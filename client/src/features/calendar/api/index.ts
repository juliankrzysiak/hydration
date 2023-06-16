import { PlantDate, PlantCreate } from "../types";
import { getUid } from "../utils/getUid";
import { catchApiError } from "../utils/catchApiError";
import { Plant } from "../types";

const url = "http://localhost:3001/api/plants";

export const getAllPlants = async (): Promise<Plant[] | undefined> => {
  try {
    const uid = await getUid();
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        uid,
      },
    });

    return res.json();
  } catch (error) {
    catchApiError(error, "Could not retrieve plants!");
  }
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

export const addDate = async (body: PlantDate) => {
  console.log(body);
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

export const deletePlant = async (id: { id: number }) => {
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
