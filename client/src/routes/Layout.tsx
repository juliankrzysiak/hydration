import { Header } from "@/components/Header";
import { Plants } from "@/features/calendar/routes/Plants";
import { useDesktopWidth } from "@/hooks/useDesktopWidth";
import { useLocation } from "react-router-dom";
import { Notification } from "@/components/Notification";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="h-full  p-6 font-['Nunito'] text-gray-950">
        {children}
        <Notification />
      </main>
    </>
  );
};
