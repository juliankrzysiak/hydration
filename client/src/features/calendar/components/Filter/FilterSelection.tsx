import { useFilterStore } from "../../stores/filterStore";

interface Props {
  name: string;
  id: number;
}

export const FilterSelection = ({ name, id }: Props) => {
  const deletePlant = useFilterStore((state) => state.delete);
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-blue-300 px-4 py-1 font-bold">
      <p className=" text-lg">{name}</p>
      <button className="text-lg" onClick={() => deletePlant(id)}>
        X
      </button>
    </div>
  );
};
