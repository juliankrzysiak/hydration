import { useField } from "@/hooks/useField";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../api/supabase";
import { supabase } from "@/features/auth/lib/auth";
import { useNavigate } from "react-router-dom";
import { AuthError } from "@supabase/supabase-js";
import { notify } from "@/utils";

export const Password = () => {
  const navigate = useNavigate();
  const [{ ...password }, setPassword] = useField({
    type: "password",
    id: "pwd",
  });
  const [{ ...confirmPassword }, setConfirmPassword] = useField({
    type: "password",
    id: "cpwd",
  });
  const passwordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: async () => {
      await supabase.auth.signOut();
      notify("success", "Password changed");
      navigate("/account/login");
      setPassword("");
      setConfirmPassword("");
    },
    onError: (error: AuthError) => notify("error", error.message),
  });

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={(event: React.SyntheticEvent) => {
        event.preventDefault();
        if (password.value !== confirmPassword.value) {
          notify("error", "Passwords do not match");
          setPassword("");
          setConfirmPassword("");
          return;
        }
        passwordMutation.mutate(password.value);
      }}
    >
      <div>
        <p>Change your password here.</p>
        <p>You will be logged out.</p>
      </div>
      <label>
        Password
        <input
          className="w-full rounded-md bg-gray-100 px-2"
          autoComplete="new-password"
          {...password}
        />
      </label>
      <label htmlFor="cpwd">
        Confirm Password
        <input
          className="w-full  rounded-md bg-gray-100 px-2"
          autoComplete="new-password"
          {...confirmPassword}
        />
      </label>
      <button className="btn-primary btn self-end">Change Password</button>
    </form>
  );
};
