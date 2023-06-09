import { Title } from "./Common/Title";

export const RegisterForm = () => {
  return (
    <form className="flex flex-col px-6 py-8 font-['Inter'] text-gray-200">
      <Title title="Hydration" />
      <div className="mb-4 flex flex-col gap-1">
        <label className="" htmlFor="name">
          First name
        </label>
        <input
          className="w-full rounded-md border border-gray-300 bg-gray-800 px-2 py-1 text-gray-200"
          id="name"
          type="text"
        />
      </div>
      <div className="mb-4 flex flex-col gap-1">
        <label className="" htmlFor="email">
          Email address
        </label>
        <input
          required
          className="w-full rounded-md border border-gray-300 bg-gray-800 px-2 py-1 text-gray-200"
          id="email"
          type="text"
        />
      </div>
      <div className="mb-4 flex flex-col gap-1">
        <label className="" htmlFor="pwd">
          Your Password
        </label>
        <input
          required
          className="w-full rounded-md border border-gray-300 bg-gray-800 px-2 py-1 text-gray-200"
          id="pwd"
          type="password"
        />
      </div>
      <button className="mb-8 w-full rounded-md bg-blue-400 py-1 font-bold text-gray-50">
        Sign up
      </button>
    </form>
  );
};
