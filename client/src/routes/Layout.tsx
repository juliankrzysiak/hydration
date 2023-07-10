import { Header } from "@/components/Header";
import { Plants } from "@/features/calendar/routes/Plants";
import { useDesktopWidth } from "@/hooks/useDesktopWidth";
import { useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const [width] = useDesktopWidth();
  const location = useLocation();

  return (
    <>
      <Header />
      <main className="flex items-center justify-evenly p-6 font-['Nunito'] text-gray-950">
        {children}
        {width && location.pathname === "/home" && <Plants />}
      </main>
    </>
  );
};
