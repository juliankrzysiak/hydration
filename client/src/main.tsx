import React from "react";
import ReactDOM from "react-dom/client";
import { CalendarRoute } from "@/features/calendar/routes/CalendarRoute";
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
import { User } from "./features/user/routes/User";
import { checkSession } from "@/utils";
import { PasswordForm } from "@/features/auth/components/Forms/PasswordForm";
import { NewPasswordForm } from "@/features/auth/components/Forms/NewPasswordForm";
import { PlantsRoute } from "@/features/list/routes/PlantsRoute";
import { Layout } from "./routes/Layout";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/account/login"),
  },
  {
    path: "/calendar",
    element: (
      <Layout>
        <CalendarRoute />
      </Layout>
    ),
    loader: checkSession,
    errorElement: <ErrorPage />,
  },
  {
    path: "/plants",
    element: (
      <Layout>
        <PlantsRoute />
      </Layout>
    ),
    loader: checkSession,
    errorElement: <ErrorPage />,
  },

  {
    path: "/account",
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
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
      {
        path: "/account/password",
        element: <PasswordForm />,
      },
      {
        path: "/account/update-password",
        element: <NewPasswordForm />,
      },
    ],
  },
  {
    path: "/user",
    element: (
      <Layout>
        <User />
      </Layout>
    ),
    loader: checkSession,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
