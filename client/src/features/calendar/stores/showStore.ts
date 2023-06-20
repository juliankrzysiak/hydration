import { create } from "zustand";
// TODO: Rename to be more consistent
export const useShowStore = create(() => ({
  createForm: false,
  deletePlant: false,
  filterForm: false,
}));
