import { create } from "zustand";

interface State {
  message: string;
  type: "info" | "error";
}

export const useNotificationStore = create<State>(() => ({
  message: "sd",
  type: "info",
}));
