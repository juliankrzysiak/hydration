import { Outlet } from "react-router-dom";
import { Demo } from "../components/Demo";

export const Login = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className=" w-full max-w-md rounded-2xl bg-slate-700">
        <Outlet />
      </div>
      or
      <Demo />
    </div>
  );
};
