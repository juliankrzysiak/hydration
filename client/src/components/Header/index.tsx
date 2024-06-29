import { Link, useLoaderData, useLocation } from "react-router-dom";

export const Header = () => {
  const isAuthenticated = useLoaderData() as boolean;
  const location = useLocation();
  const routes = ["calendar", "plants", "user"];
  console.log(isAuthenticated);

  return (
    <header className="flex min-w-full items-center justify-between bg-blue-100 p-3 ">
      <Link
        className="pl-2 text-2xl font-medium xl:text-3xl"
        to="/"
        aria-label="Navigate to home"
      >
        Hydration
      </Link>
      {(!location.pathname.includes("account") || isAuthenticated) && (
        <nav className="flex gap-4 px-2 text-slate-700">
          {routes.map((route) => {
            return (
              <Link
                key={route}
                to={`/${route}`}
                className={`text-lg ${route === "plants" && "lg:hidden"} ${
                  location.pathname === `/${route}` &&
                  "underline decoration-blue-300 underline-offset-8"
                }`}
              >
                {route}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
};
