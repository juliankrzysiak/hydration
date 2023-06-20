interface Props {
  name: string;
}

export const ListPlant = ({ name }: Props) => {
  return (
    <li>
      <p className="text-xl font-bold text-neutral-200">{name}</p>
    </li>
  );
};
