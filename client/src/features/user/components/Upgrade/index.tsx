import { useNavigate } from "react-router-dom";

export const Upgrade = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-4">
      <h2 className=" text-xl ">Guest account detected!</h2>
      <p>
        Upgrade to an email confirmed account. <br /> All of your data will be
        saved.
      </p>
      <button
        className="w-fit rounded-md border-2 border-gray-900 px-2 py-1"
        onClick={() => navigate("/account/register")}
      >
        Upgrade Account
      </button>
    </div>
  );
};
