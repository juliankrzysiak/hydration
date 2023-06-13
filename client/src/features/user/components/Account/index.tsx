export const Account = () => {
  return (
    <form className="flex flex-col gap-4">
      <p>Make changes to your account here</p>
      <fieldset className=" flex flex-col">
        <label htmlFor="name">First Name</label>
        <input className="rounded-md" type="text" />
      </fieldset>
      <fieldset className="mb-2 flex flex-col">
        <label htmlFor="email">Email</label>
        <input type="email" />
      </fieldset>
      <button className="self-end rounded border-2 border-gray-800 px-2 py-2">
        Save Changes
      </button>
    </form>
  );
};
