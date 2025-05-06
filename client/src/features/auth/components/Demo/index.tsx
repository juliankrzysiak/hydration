import { notify } from "@/utils";
import { supabase } from "../../lib/auth";
import { useNavigate } from "react-router-dom";

export function Demo () {
  const navigate = useNavigate();

  const createGuest = async () => {
    const { error } = await supabase.auth.signInAnonymously()
    if (error) notify("error", error.message);
    navigate("/calendar");
  };
  return (
    <button
      className="btn bg-blue-400"
      type="button"
      aria-label="Create guest account"
      onClick={createGuest}
    >
      Try it out
    </button>
  );
};
