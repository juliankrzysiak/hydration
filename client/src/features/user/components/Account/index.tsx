import { useField } from "@/hooks/useField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeEmail, changeName } from "../../api/supabase";
import { notify } from "@/utils/notify";
import { AuthError } from "@supabase/supabase-js";

export const Account = () => {
  const [{ ...name }, setName] = useField({ type: "text", id: "name" });
  const [{ ...email }, setEmail] = useField({ type: "email", id: "email" });

  const queryClient = useQueryClient();
  const nameMutation = useMutation({
    mutationFn: (name: string) => changeName(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["name"] });
      notify("success", "Name changed");
      setName("");
    },
    onError: (error: AuthError) => notify("error", error.message),
  });
  const emailMutation = useMutation({
    mutationFn: (name: string) => changeEmail(name),
    onSuccess: () => {
      notify("success", "Email sent, please confirm your email");
      setEmail("");
    },
    onError: (error: AuthError) => notify("error", error.message),
  });

  const saveChanges = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (name.value) {
      nameMutation.mutate(name.value);
    }
    if (email.value) {
      emailMutation.mutate(email.value);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={saveChanges}>
      <p>Make changes to your account here.</p>
      <fieldset className=" flex flex-col">
        <label htmlFor="name">First Name</label>
        <input className="rounded-md bg-gray-100 px-2" {...name} />
      </fieldset>
      <fieldset className="mb-2 flex flex-col">
        <label htmlFor="email">Email</label>
        <input className="rounded-md bg-gray-100 px-2" {...email} />
      </fieldset>
      <button className="self-end rounded-md border-2 border-gray-800 px-2 py-2 font-semibold">
        Save Changes
      </button>
    </form>
  );
};
