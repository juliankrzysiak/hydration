import * as Tab from "@radix-ui/react-tabs";
import { Account } from "../Account";
import { Password } from "../Password";
import { Delete } from "../Delete";

export const Tabs = () => {
  return (
    <Tab.Root defaultValue="tab1" className="mb-8 w-full max-w-xs">
      <Tab.List
        aria-label="Manage your account"
        className="flex justify-around"
      >
        <Tab.Trigger value="tab1">Account</Tab.Trigger>
        <Tab.Trigger value="tab2">Password</Tab.Trigger>
        <Tab.Trigger value="tab3">Delete</Tab.Trigger>
      </Tab.List>
      <Tab.Content value="tab1" className="w-full rounded-xl bg-gray-300 p-4">
        <Account />
      </Tab.Content>
      <Tab.Content value="tab2" className="w-full rounded-xl bg-gray-300 p-4">
        <Password />
      </Tab.Content>
      <Tab.Content value="tab3" className="w-full rounded-xl bg-gray-300 p-4">
        <Delete />
      </Tab.Content>
    </Tab.Root>
  );
};
