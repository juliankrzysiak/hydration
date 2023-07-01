import { useFilterStore } from "../../stores/filterStore";

interface Props {
  name: string;
  id: number;
}

export const FilterSelection = ({ name, id }: Props) => {
  const deletePlant = useFilterStore((state) => state.delete);
  return (
    <div className="flex items-baseline gap-2 rounded-3xl bg-gray-900/50 px-3 py-1 font-bold">
      <p className="text-gray-300">{name}</p>
      <button className="text-gray-400" onClick={() => deletePlant(id)}>
        x
      </button>
    </div>
  );
};
