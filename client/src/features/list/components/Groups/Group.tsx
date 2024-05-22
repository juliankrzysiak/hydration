import { useIdStore } from "../../stores/idStore";

type Props = {
  id: number;
  name: string;
};

export default function Group({ id, name }: Props) {
  return (
    <li className="flex h-fit justify-between gap-4 align-baseline">
      <button
        className="h-fit rounded-lg px-2 text-start text-xl font-medium text-gray-950 hover:bg-gray-700 hover:text-gray-200"
        onClick={() => useIdStore.setState({ groupId: id })}
      >
        {name}
      </button>
    </li>
  );
}
