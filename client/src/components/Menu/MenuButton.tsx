interface Props {
  pressed: boolean;
  direction: string;
  handleClick: (value: boolean) => void;
}

export const MenuButton = ({ pressed, direction, handleClick }: Props) => {
  return (
    <button
      onClick={() => handleClick(true)}
      className={`absolute -z-10  aspect-square w-12 rounded-full border-2 border-gray-900 bg-gray-500/10 p-1 transition-all duration-200 
        ${
          pressed
            ? `${direction} let-1/2  visible opacity-100`
            : "invisible opacity-0"
        }
        `}
    >
      <img src="/plus.svg" alt="Plus" />
    </button>
  );
};
