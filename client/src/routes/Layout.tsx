import { Header } from "@/components/Header";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="flex justify-center p-6 font-['Nunito'] text-gray-950">
        {children}
      </main>
    </>
  );
};
