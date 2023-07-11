import { create } from "zustand";

interface State {
  message: string | null;
  type: "info" | "error" | "success";
}

export const useNotificationStore = create<State>(() => ({
  message: null,
  type: "error",
}));
