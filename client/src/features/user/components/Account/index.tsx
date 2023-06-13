import { useField } from "@/hooks/useField";
import { useNotificationStore } from "@/stores/notificationStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeName } from "../../api";

export const Account = () => {
  const [{ ...name }, setName] = useField({ type: "text", id: "name" });
  const queryClient = useQueryClient();
  const nameMutation = useMutation({
    mutationFn: (name: string) => changeName(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["name"] });
    },
  });

  const saveChanges = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (name.value) {
      nameMutation.mutate(name.value);
      setName("");
      useNotificationStore.setState({
        type: "action",
        message: "Name changed",
      });
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={saveChanges}>
      <p>Make changes to your account here</p>
      <fieldset className=" flex flex-col">
        <label htmlFor="name">First Name</label>
        <input className="rounded-md" {...name} />
      </fieldset>
      <fieldset className="mb-2 flex flex-col">
        <label htmlFor="email">Email</label>
        <input type="email" />
      </fieldset>
      <button className="self-end rounded border-2 border-gray-800 px-2 py-2">
        Save Changes
      </button>
    </form>
  );
};
