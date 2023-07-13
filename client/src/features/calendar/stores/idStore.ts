import { create } from "zustand";

interface State {
  id: null | number;
}

export const useIdStore = create<State>(() => ({
  id: null,
}));
