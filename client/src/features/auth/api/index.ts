import { supabase } from "../lib/auth";

export const createNewPassword = async (password: string) => {
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw error;
};
