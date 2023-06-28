import { Title } from "./Common/Title";
import { supabase, supabaseAdmin } from "../../lib/auth";
import { useField } from "@/hooks/useField";
import { useNotificationStore } from "@/stores/notificationStore";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [{ ...name }, setName] = useField({ type: "text", id: "name" });
  const [{ ...email }, setEmail] = useField({ type: "text", id: "email" });
  const [{ ...password }, setPassword] = useField({
    type: "password",
    id: "pwd",
  });

  const signUp = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (sessionStorage.getItem("uid")) {
      const { error } = await supabase.auth.signInWithPassword({
        email: "-1123612112753-22-98-4@invalid.com",
        password: "testing123",
      });
      await supabase.auth.updateUser({
        email: email.value,
        password: password.value,
        data: {
          first_name: name.value,
        },
      });
      if (error) {
        return useNotificationStore.setState({
          message: error.message,
          type: "error",
        });
      }
    } else {
      const { error } = await supabase.auth.signUp({
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
    }

    setName("");
    setEmail("");
    setPassword("");
    useNotificationStore.setState({
      message: "Email sent!",
      type: "success",
    });
    navigate("/account/login");
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
