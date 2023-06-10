import { create } from "zustand";

interface State {
  message: string;
  type: "info" | "error";
}

export const useNotificationStore = create<State>(() => ({
  message: "Password should be at least 6 characters long",
  type: "error",
}));
