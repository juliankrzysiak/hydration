import dayjs from "dayjs";
import { useIdStore } from "../../stores/idStore";

interface Props {
  name: string;
  id: number;
  watered: Date | undefined;
}

export const ListPlant = ({ name, id, watered }: Props) => {
  return (
    <li key={id} className="flex h-fit justify-between gap-4 align-baseline">
      <button
        className="h-fit rounded-lg px-2 text-start text-xl font-medium text-gray-950 hover:bg-gray-700 hover:text-gray-200"
        onClick={() => useIdStore.setState({id})}
      >
        {name}
      </button>
      <p className="flex-shrink-0 text-xl text-gray-900">
        {watered && dayjs(watered).format("MMM D")}
      </p>
    </li>
  );
};
