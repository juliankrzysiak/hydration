import { create } from "zustand";

export const useShowFormStore = create(() => ({
  addPlant: false,
  editPlant: false,
  filterPlant: false,
}));
