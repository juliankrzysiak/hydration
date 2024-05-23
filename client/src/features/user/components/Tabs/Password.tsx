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
      <fieldset className=" flex flex-col">
        <label htmlFor="pwd">Password</label>
        <input className="w-full rounded-md bg-gray-100 px-2" {...password} />
      </fieldset>
      <fieldset className="mb-2 flex flex-col">
        <label htmlFor="cpwd">Confirm Password</label>
        <input
          className="w-full  rounded-md bg-gray-100 px-2"
          {...confirmPassword}
        />
      </fieldset>
      <button className="self-end rounded border-2 border-gray-800 px-2 py-2 font-semibold">
        Change Password
      </button>
    </form>
  );
};
