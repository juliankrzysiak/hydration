import { PlantDate, PlantCreate } from "../types";

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
