import { useIdStore } from "../../stores/idStore";

interface Props {
  name: string;
  id: number;
  watered: Date | undefined;
}

export const Entry = ({ name, id }: Props) => {
  return (
    <li className="flex h-fit justify-between gap-2">
      <button
        className="w-full text-left"
        onClick={() => useIdStore.setState({ id })}
      >
        {name}
      </button>
      {/* <p>{watered && dayjs(watered).format("MMM D")}</p> */}
    </li>
  );
};
