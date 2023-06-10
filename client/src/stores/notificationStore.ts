import { create } from "zustand";

interface State {
  message: string;
  type: "info" | "error" | "action";
}

export const useNotificationStore = create<State>(() => ({
  message: "",
  type: "info",
}));
