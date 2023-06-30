import { supabase } from "@/features/auth/lib/auth";

export const getUid = async (): Promise<string> => {
  const { data } = await supabase.auth.getSession();

  if (!data.session) throw new Error("Session does not exist, please log in.");

  return data.session.user.id;
};
