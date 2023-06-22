import { create } from "zustand";

export const useShowFormStore = create(() => ({
  addPlant: false,
  filterPlant: false,
}));
