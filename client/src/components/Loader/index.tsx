import hourglass from "@/assets/hourglass.svg";

export const Loader = () => {
  return (
    <main className="h-screen w-screen">
      <div className="fixed left-1/2 top-1/4 flex -translate-x-1/2 flex-col">
        <img className="animate-bounce" src={hourglass} alt="Hourglass" />
        <h3 className="text-2xl">Loading</h3>
      </div>
    </main>
  );
};
