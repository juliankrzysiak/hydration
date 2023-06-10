import { Outlet } from "react-router-dom";

export const Login = () => {
  return (
    <main className="relative min-h-screen justify-center bg-blue-300">
      <div className="absolute left-1/2 top-1/4 w-5/6 max-w-sm -translate-x-1/2 -translate-y-1/4 rounded-2xl bg-gray-700">
        <Outlet />
      </div>
    </main>
  );
};
