import { useIdStore } from "../../stores/idStore";

type Props = {
  id: number;
  name: string;
};

export default function Group({ id, name }: Props) {
  return (
    <li className="flex h-fit justify-between gap-4">
      <button onClick={() => useIdStore.setState({ groupId: id })}>
        {name}
      </button>
    </li>
  );
}
