import { create } from "zustand";

type Store = {
  addPlant: boolean;
  editPlant: boolean;
  filterPlant: boolean;
  addGroup: boolean;
  editGroup: boolean;
};

export const useShowFormStore = create<Store>(() => ({
  addPlant: false,
  editPlant: false,
  filterPlant: false,
  addGroup: false,
  editGroup: false,
}));
