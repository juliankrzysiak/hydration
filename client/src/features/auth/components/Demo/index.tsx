import { notify } from "@/utils";
import { supabase } from "../../lib/auth";
import { useNavigate } from "react-router-dom";

export const Demo = () => {
  const navigate = useNavigate();

  const createGuest = async () => {
    const randomValues = crypto.getRandomValues(new Int8Array(8)).join("");
    //  !: Supabase should have a guest option now
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email: `${randomValues}@invalid.com`,
      password: "testing123",
    });
    if (user) sessionStorage.setItem("uid", user.id);
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
