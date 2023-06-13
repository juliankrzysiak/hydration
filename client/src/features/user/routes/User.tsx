import person from "@/assets/person.svg";
import { Tabs } from "../components/Tabs";

export const User = () => {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-neutral-100">
      <div className="flex flex-col">
        <img className="w-12" src={person} alt="Person" />
        <p>Hello, {"Julian"}</p>
      </div>
      <Tabs />
    </main>
  );
};
