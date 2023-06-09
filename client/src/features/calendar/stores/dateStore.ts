import { create } from "zustand";

export const useDateStore = create(() => ({
  date: new Date(Date.now()),
}));
