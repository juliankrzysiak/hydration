import { create } from "zustand";

export const useShowStore = create(() => ({
  createForm: false,
  deletePlant: false,
}));
