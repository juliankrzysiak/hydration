import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "@/features/calendar/routes/Home";
import { ErrorPage } from "@/routes/ErrorPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { Login } from "@/features/auth/routes/Login";
import { LoginForm } from "@/features/auth/components/Forms/LoginForm";
import { RegisterForm } from "@/features/auth/components/Forms/RegisterForm";
import { supabase } from "@/features/auth/lib/auth";
import { User } from "./features/user/routes/User";
import { Account } from "./features/user/components/Account";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
    loader: async () => {
      const session = await supabase.auth.getSession();
      console.log(session);
      if (!session) return redirect("account/login");
      return null;
    },
    errorElement: <ErrorPage />,
  },
  {
    path: "/account",
    element: <Login />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/account/login",
        element: <LoginForm />,
      },
      {
        path: "/account/register",
        element: <RegisterForm />,
      },
    ],
  },
  {
    path: "/user",
    element: <User />,
    children: [
      {
        path: "/user/account",
        element: <Account />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
