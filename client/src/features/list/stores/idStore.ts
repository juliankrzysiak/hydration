import { create } from "zustand";

interface State {
  id: number | null;
  groupId: number | null;
}

export const useIdStore = create<State>(() => ({
  id: null,
  groupId: null,
}));
