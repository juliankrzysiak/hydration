import { create } from "zustand";
import { Plant } from "../types";

interface State {
  plants: Plant[];
  push: (plant: Plant) => void;
}

export const useFilterStore = create<State>((set) => ({
  plants: [],
  push: (plant: Plant) =>
    set((state) => ({ plants: [...state.plants, plant] })),
}));
