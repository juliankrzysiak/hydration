import { supabase } from "@/features/auth/lib/auth";
import { useNotificationStore } from "@/stores/notificationStore";

export const getName = async () => {
  const { data } = await supabase.auth.getSession();
  const name = await data.session?.user.user_metadata.first_name;
  if (typeof name !== "string") return "Jane";
  return name;
};

export const changeName = async (name: string) => {
  try {
    await supabase.auth.updateUser({ data: { first_name: name } });
  } catch (error) {
    if (error instanceof Error)
      useNotificationStore.setState({
        type: "error",
        message: "Could not change name",
      });
  }
};
