import { create } from "zustand";

export const useShowFormStore = create(() => ({
  addPlant: false,
  deletePlant: false,
  filterPlant: false,
}));
