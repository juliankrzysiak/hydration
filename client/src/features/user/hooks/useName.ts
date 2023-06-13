import { supabase } from "@/features/auth/lib/auth";
import { useEffect, useState } from "react";

export const useName = () => {
  const [name, setName] = useState("Jane");
  useEffect(() => {
    // Get current name of session user
    (async () => {
      const { data } = await supabase.auth.getSession();
      setName(data.session?.user.user_metadata.first_name);
    })();
  }, []);
  return name;
};
