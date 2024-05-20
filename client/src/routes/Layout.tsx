import { Header } from "@/components/Header";
import { Notification } from "@/components/Notification";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="flex h-full justify-center p-6 text-gray-950">
        {children}
        <Notification />
      </main>
    </>
  );
};
