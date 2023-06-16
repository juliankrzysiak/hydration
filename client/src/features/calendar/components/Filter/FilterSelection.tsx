export const FilterSelection = ({ name }: { name: string }) => {
  return (
    <div className="flex items-baseline gap-2 rounded-3xl bg-gray-900/70 px-3 py-1 font-bold">
      <p className="text-neutral-200">{name}</p>
      <button className="text-neutral-400">x</button>
    </div>
  );
};
