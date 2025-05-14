import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  let errorMessage;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
  }
  return (
    <div
      id="error-page"
      className="flex min-h-screen flex-col items-center justify-center gap-4"
    >
      <h1 className="text-4xl">Uh, oh!</h1>
      <p className="mb-10 text-xl">Sorry, an unexpected error has occurred.</p>
      {errorMessage || <i>{errorMessage}</i>}
    </div>
  );
};
