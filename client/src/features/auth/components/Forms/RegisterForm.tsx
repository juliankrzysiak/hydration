import { Title } from "./Common/Title";
import { supabase } from "../../lib/auth";
import { useField } from "@/hooks/useField";
import { useNotificationStore } from "@/stores/notificationStore";

export const RegisterForm = () => {
  const [{ ...email }] = useField({ type: "text", id: "email" });
  const [{ ...password }] = useField({
    type: "password",
    id: "pwd",
  });
  const [{ ...name }] = useField({ type: "text", id: "name" });

  const signUp = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          first_name: name.value,
        },
      },
    });
    if (error) {
      return useNotificationStore.setState({
        message: error.message,
        type: "error",
      });
    }

    useNotificationStore.setState({
      message: "Email sent",
      type: "action",
    });
  };
  return (
    <form
      className="flex flex-col px-6 py-8 font-['Inter'] text-gray-200"
      onSubmit={signUp}
    >
      <Title title="Hydration" />
      <div className="mb-4 flex flex-col gap-1">
        <label className="" htmlFor="name">
          First name
        </label>
        <input
          className="w-full rounded-md border border-gray-300 bg-gray-800 px-2 py-1 text-gray-200"
          {...name}
        />
      </div>
      <div className="mb-4 flex flex-col gap-1">
        <label className="" htmlFor="email">
          Email address
        </label>
        <input
          required
          className="w-full rounded-md border border-gray-300 bg-gray-800 px-2 py-1 text-gray-200"
          {...email}
        />
      </div>
      <div className="mb-4 flex flex-col gap-1">
        <label className="" htmlFor="pwd">
          Your Password
        </label>
        <input
          required
          className="w-full rounded-md border border-gray-300 bg-gray-800 px-2 py-1 text-gray-200"
          {...password}
        />
      </div>
      <button className="mb-8 w-full rounded-md bg-blue-400 py-1 font-bold text-gray-50">
        Sign up
      </button>
    </form>
  );
};
