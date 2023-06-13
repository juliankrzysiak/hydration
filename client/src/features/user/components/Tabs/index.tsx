import * as Tab from "@radix-ui/react-tabs";

export const Tabs = () => {
  return (
    <Tab.Root defaultValue="">
      <Tab.List aria-label="Manage your account">
        <Tab.Trigger value="tab1">Account</Tab.Trigger>
        <Tab.Trigger value="tab2">Password</Tab.Trigger>
        <Tab.Trigger value="tab3">Delete</Tab.Trigger>
      </Tab.List>
      <Tab.Content value="tab1">stuff</Tab.Content>
    </Tab.Root>
  );
};
