import { Header } from "@/components/Header";
import { Plants } from "@/features/calendar/routes/Plants";
import { useDesktopWidth } from "@/hooks/useDesktopWidth";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const [width] = useDesktopWidth();
  return (
    <>
      <Header />
      <main className="flex items-center justify-evenly p-10 font-['Nunito'] text-gray-950">
        {children}

        {width && <Plants />}
      </main>
    </>
  );
};
