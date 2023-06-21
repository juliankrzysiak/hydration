interface Props {
  name: string;
}

export const ListPlant = ({ name }: Props) => {
  return (
    <li>
      <p className="text-xl text-gray-900">{name}</p>
    </li>
  );
};
