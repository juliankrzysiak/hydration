interface Props {
  pressed: boolean;
  translate: string;
}

export const MenuButton = ({ pressed, translate }: Props) => {
  return (
    <button
      className={`absolute -z-10  aspect-square w-12 rounded-full border-2 border-gray-900 bg-gray-500/10 p-1 transition-all duration-200 
        ${
          pressed
            ? `${translate} let-1/2  visible opacity-100`
            : "invisible opacity-0"
        }
        `}
    >
      <img src="/plus.svg" alt="Plus" />
    </button>
  );
};
