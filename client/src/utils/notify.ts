import { useNotificationStore } from "../stores/notificationStore";

export const notify = (type: "info" | "error" | "action", message: string) => {
  useNotificationStore.setState({ type, message });
};
