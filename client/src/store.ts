import { create } from "zustand";

interface DateState {
  date: Date;
}

export const useDateStore = create<DateState>(() => ({
  date: new Date(Date.now()),
}));

interface ShowState {
  createForm: boolean;
}

export const useShowStore = create<ShowState>(() => ({
  createForm: false,
}));
