import { Outlet } from "react-router-dom";
import { Demo } from "../components/Demo";

export const Login = () => {
  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <p className="mb-4 flex w-full max-w-md flex-col gap-2 text-center text-lg">
        <span className="text-3xl">A calendar for your plants</span>
        <span>
          Keep track of when you watered them, and know when you need to water
          them next.
        </span>
      </p>
      <div className=" w-full max-w-md rounded-2xl bg-slate-700">
        <Outlet />
      </div>
      or
      <Demo />
    </div>
  );
};
