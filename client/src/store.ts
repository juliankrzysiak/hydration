import { create } from "zustand";

export const useDateStore = create(() => ({
  date: new Date(Date.now()),
}));

export const useShowStore = create(() => ({
  createForm: false,
  deletePlant: false,
}));

export const useToastStore = create(() => ({
  toast: "",
}));
