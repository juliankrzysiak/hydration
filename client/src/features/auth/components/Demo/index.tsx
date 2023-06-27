import { notify } from "@/utils/notify";
import { supabase } from "../../lib/auth";

export const Demo = () => {
  const randomValues = crypto.getRandomValues(new Int8Array(8)).join("");
  const createGuest = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: `${randomValues}@invalid.com`,
      password: "testing123",
    });
    if (error) notify("error", error.message);
  };
  return (
    <button
      className="absolute -bottom-24 left-1/2 -translate-x-1/2 rounded-xl border border-gray-900 bg-gray-700 px-3 py-1 text-2xl text-gray-200"
      onClick={createGuest}
    >
      Demo
    </button>
  );
};
