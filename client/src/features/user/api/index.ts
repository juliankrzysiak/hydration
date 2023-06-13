import { supabase } from "@/features/auth/lib/auth";

export const getName = async () => {
  const { data } = await supabase.auth.getSession();
  const name = await data.session?.user.user_metadata.first_name;
  if (typeof name !== "string") return "Jane";
  return name;
};
