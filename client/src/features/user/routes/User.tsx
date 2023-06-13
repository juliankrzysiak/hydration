import person from "@/assets/person.svg";
import { Tabs } from "../components/Tabs";
import { useName } from "../hooks/useName";
import { Notification } from "@/components/Notification";

export const User = () => {
  const name = useName();
  return (
    <main className="relative flex min-h-screen flex-col items-center bg-neutral-100">
      <div className="mb-4 flex flex-col items-center">
        <img className="w-12" src={person} alt="Person" />
        <p>Hello, {name}</p>
      </div>
      <Tabs />
      <Notification />
    </main>
  );
};
