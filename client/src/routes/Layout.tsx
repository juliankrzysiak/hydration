import { Header } from "@/components/Header";
import { Notification } from "@/components/Notification";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-auto flex-col justify-center bg-blue-200 p-4">
        {children}
        <Notification />
      </main>
    </div>
  );
};
