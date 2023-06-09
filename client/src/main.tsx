import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "@/features/calendar/routes/Home";
import { ErrorPage } from "@/routes/ErrorPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Login } from "@/features/auth/routes/Login";
import { LoginForm } from "@/features/auth/components/Forms/LoginForm";
import { RegisterForm } from "@/features/auth/components/Forms/RegisterForm";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
