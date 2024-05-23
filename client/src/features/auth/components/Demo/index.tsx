import { notify } from "@/utils";
import { supabase } from "../../lib/auth";
import { useNavigate } from "react-router-dom";

export const Demo = () => {
  const navigate = useNavigate();

  const createGuest = async () => {
    const randomValues = crypto.getRandomValues(new Int8Array(8)).join("");
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email: `${randomValues}@invalid.com`,
      password: "testing123",
    });
    if (user) sessionStorage.setItem("uid", user.id);
    if (error) notify("error", error.message);
    navigate("/home");
  };
  return (
    <button
      className="absolute -bottom-36 left-1/2 -translate-x-1/2 rounded-xl border border-gray-900 bg-gray-600 px-3 py-1 text-xl text-gray-200"
      type="button"
      aria-label="Create guest account"
      onClick={createGuest}
    >
      Demo
    </button>
  );
};
