import { useMutation } from "@tanstack/react-query";
import { createNewPassword } from "../../api";
import { useField } from "@/hooks/useField";
import { Title } from "./Common/Title";
import { notify } from "@/utils";
import { useNavigate } from "react-router-dom";
import { AuthError } from "@supabase/supabase-js";

export const NewPasswordForm = () => {
  const navigate = useNavigate();
  const [{ ...password }, setPassword] = useField({
    type: "password",
    id: "pwd",
  });
  const [{ ...confirmPassword }, setConfirmPassword] = useField({
    type: "password",
    id: "c_pwd",
  });

  const passwordMutation = useMutation({
    mutationFn: createNewPassword,
    onSuccess: () => {
      navigate("/account/login");
      notify("success", "Password changed, log in please");
    },
    onError: (error: AuthError) => notify("error", error.message),
  });

  return (
    <form
      className="flex flex-col px-6 py-8 font-['Inter'] text-gray-200"
      onSubmit={(event) => {
        event.preventDefault();
        if (password.value !== confirmPassword.value) {
          setPassword("");
          setConfirmPassword("");
          notify("error", "Passwords do not match");
          return;
        }
        passwordMutation.mutate(password.value);
      }}
    >
      <Title title="Hydration" />
      <div className="mb-4 flex flex-col gap-1">
        <label htmlFor="pwd">New Password</label>
        <input
          className="w-full rounded-md border border-gray-300 bg-gray-800 px-2 py-1 text-gray-200"
          {...password}
        />
      </div>
      <div className="mb-4 flex flex-col gap-1">
        <label htmlFor="c_pwd">Confirm Password</label>
        <input
          className="w-full rounded-md border border-gray-300 bg-gray-800 px-2 py-1 text-gray-200"
          {...confirmPassword}
        />
      </div>
      <button className="btn-primary btn">Change Password</button>
    </form>
  );
};
