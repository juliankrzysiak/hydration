import { useField } from "@/hooks/useField";

export const Password = () => {
  const [{ ...password }, setPassword] = useField({
    type: "password",
    id: "pwd",
  });
  const [{ ...confirmPassword }, setConfirmPassword] = useField({
    type: "confirmPassword",
    id: "cpwd",
  });

  const changePassword = () => {};

  return (
    <form className="flex flex-col gap-4" onSubmit={changePassword}>
      <p>Change your password here.</p>
      <fieldset className=" flex flex-col">
        <label htmlFor="pwd">Password</label>
        <input className="rounded-md" {...password} />
      </fieldset>
      <fieldset className="mb-2 flex flex-col">
        <label htmlFor="cpwd">Confirm Password</label>
        <input {...confirmPassword} />
      </fieldset>
      <button className="self-end rounded border-2 border-gray-800 px-2 py-2">
        Change Password
      </button>
    </form>
  );
};
