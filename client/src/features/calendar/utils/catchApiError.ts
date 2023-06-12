import { useNotificationStore } from "@/stores/notificationStore";

export const catchApiError = (
  error: unknown,
  message = "Something went wrong with the plants!"
) => {
  if (error instanceof Error)
    useNotificationStore.setState({
      type: "error",
      message: error.message || message,
    });
};
