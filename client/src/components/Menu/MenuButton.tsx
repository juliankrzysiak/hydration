interface Props {
  ADD?: boolean;
  direction: string;
  handleClick: () => void;
}

export const MenuButton = ({ ADD, handleClick, direction }: Props) => {
  let type;
  if (ADD) type = "plus";

  return (
    <button
      onClick={handleClick}
      className={`aspect-square w-12 rounded-xl border-2 border-gray-900 bg-gray-500/10 p-1 transition-all duration-200 ${direction}`}
    >
      <img src={`/${type}.svg`} alt={type} />
    </button>
  );
};
