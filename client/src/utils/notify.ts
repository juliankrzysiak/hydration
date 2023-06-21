import { useNotificationStore } from "../stores/notificationStore";

export const notify = (type: "info" | "error" | "success", message: string) => {
  useNotificationStore.setState({ type, message });
};
