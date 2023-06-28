import { notify } from "@/utils/notify";
import { supabase } from "../../lib/auth";
import { useNavigate } from "react-router-dom";

export const Demo = () => {
  const randomValues = crypto.getRandomValues(new Int8Array(8)).join("");
  const navigate = useNavigate();

  const createGuest = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email: `${randomValues}@invalid.com`,
      password: "testing123",
    });
    if (error) notify("error", error.message);
    if (user) sessionStorage.setItem("uid", user.id);
    navigate("/home");
  };
  return (
    <button
      className="absolute -bottom-36 left-1/2 -translate-x-1/2 rounded-xl border border-gray-900 bg-gray-600/70 px-3 py-1 text-xl text-gray-200"
      onClick={createGuest}
    >
      Demo
    </button>
  );
};
