import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_AUTH_URI,
  import.meta.env.VITE_AUTH_KEY
);

export const supabaseAdmin = createClient(
  import.meta.env.VITE_AUTH_URI,
  import.meta.env.VITE_ADMIN_AUTH_KEY
);
