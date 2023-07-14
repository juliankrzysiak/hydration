import { useFilterStore } from "../../stores/filterStore";

interface Props {
  name: string;
  id: number;
}

export const FilterSelection = ({ name, id }: Props) => {
  const deletePlant = useFilterStore((state) => state.delete);
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-gray-900/50 px-4 font-bold">
      <p className=" text-lg text-gray-200">{name}</p>
      <button className="text-lg text-gray-200" onClick={() => deletePlant(id)}>
        X
      </button>
    </div>
  );
};
