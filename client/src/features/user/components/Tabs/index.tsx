import * as Tab from "@radix-ui/react-tabs";
import { Account } from "./Account";
import { Password } from "./Password";
import { Delete } from "./Delete";

export const Tabs = () => {
  return (
    <Tab.Root defaultValue="tab1" className="mb-8 w-full max-w-sm">
      <Tab.List
        aria-label="Manage your account"
        className="flex w-full justify-evenly gap-6 rounded-t-md border-b border-gray-900 bg-gray-900/20 px-4 py-2 text-gray-700"
      >
        <Tab.Trigger
          value="tab1"
          className="text-lg data-[state=active]:scale-110  data-[state=active]:font-semibold data-[state=active]:text-gray-900  "
        >
          Account
        </Tab.Trigger>
        <Tab.Trigger
          value="tab2"
          className="text-lg data-[state=active]:scale-110 data-[state=active]:font-medium data-[state=active]:text-gray-900"
        >
          Password
        </Tab.Trigger>
        <Tab.Trigger
          value="tab3"
          className="text-lg data-[state=active]:scale-110 data-[state=active]:font-medium data-[state=active]:text-gray-900"
        >
          Delete
        </Tab.Trigger>
      </Tab.List>
      <Tab.Content
        value="tab1"
        className="w-full rounded-b-md bg-gray-900/20 p-4"
      >
        <Account />
      </Tab.Content>
      <Tab.Content
        value="tab2"
        className="w-full rounded-b-md  bg-gray-900/20 p-4"
      >
        <Password />
      </Tab.Content>
      <Tab.Content
        value="tab3"
        className="w-full rounded-b-md  bg-gray-900/20 p-4"
      >
        <Delete />
      </Tab.Content>
    </Tab.Root>
  );
};
