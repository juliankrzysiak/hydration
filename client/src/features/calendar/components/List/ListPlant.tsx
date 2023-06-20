interface Props {
  name: string;
}

export const ListPlant = ({ name }: Props) => {
  return (
    <li>
      <p className="text-xl font-bold text-neutral-300">{name}</p>
    </li>
  );
};
