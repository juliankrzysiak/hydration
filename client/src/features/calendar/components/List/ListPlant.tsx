import dayjs from "dayjs";

interface Props {
  name: string;
  watered: Date | undefined;
}

export const ListPlant = ({ name, watered }: Props) => {
  return (
    <li className="flex gap-4 align-baseline">
      <p className="text-xl text-gray-900">{name}</p>
      <p className="text-xl font-light">
        {watered && dayjs(watered).format("MMM D")}
      </p>
    </li>
  );
};
