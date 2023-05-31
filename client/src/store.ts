import { create } from "zustand";

interface DateState {
  date: Date;
  setDate: (value: Date) => void;
}

export const useDateStore = create<DateState>((set) => ({
  date: new Date(Date.now()),
  setDate: (value) => set((state) => ({ date: value })),
}));
