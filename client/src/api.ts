import { PlantDate, PlantCreate } from "./types";

const url = "http://localhost:3001/api/plants";

export const getAllPlants = async () => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
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

export const addDate = async (date: PlantDate) => {
  const res = await fetch(`${url}/water`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(date),
  });

  return res.json();
};

export const deleteDate = async (date: PlantDate) => {
  const res = await fetch(`${url}/water`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(date),
  });

  return res.json();
};
