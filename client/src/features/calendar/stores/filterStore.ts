import { create } from "zustand";
import { Plant } from "../../../types";

interface State {
  plants: Plant[];
  push: (plant: Plant) => void;
  delete: (id: number) => void;
}

export const useFilterStore = create<State>((set) => ({
  plants: [],
  push: (plant) => set((state) => ({ plants: [...state.plants, plant] })),
  delete: (id) =>
    set((state) => ({
      plants: state.plants.filter((plant) => plant.id !== id),
    })),
}));
