import { useField } from "@/hooks/useField";
import { Title } from "./Common/Title";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../../lib/auth";
import { notify } from "@/utils";
import { useNavigate } from "react-router-dom";

export const PasswordForm = () => {
  const navigate = useNavigate();
  const [{ ...email }] = useField({ type: "text", id: "email" });

  const passwordMutation = useMutation({
    mutationFn: async () => {
      await supabase.auth.resetPasswordForEmail(email.value, {
        redirectTo: "http://localhost:5173/account/update-password",
      });
    },
    onSuccess: () => {
      notify("success", "Recovery email sent");
      navigate("/account/login");
    },
  });
  return (
    <form
      className="flex flex-col px-6 py-8 font-['Inter'] text-gray-200"
      onSubmit={(event) => {
        event.preventDefault();
        passwordMutation.mutate();
      }}
    >
      <Title title="Hydration" />
      <div className="mb-4 flex flex-col gap-1">
        <label htmlFor="email">Email address</label>
        <input
          className="w-full rounded-md border border-gray-300 bg-gray-800 px-2 py-1 text-gray-200"
          {...email}
        />
      </div>

      <button className="mb-8 w-full rounded-md bg-blue-400 py-1 font-bold text-gray-50">
        Recover Password
      </button>
    </form>
  );
};
