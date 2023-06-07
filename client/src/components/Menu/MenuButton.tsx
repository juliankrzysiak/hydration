import { motion } from "framer-motion";

interface Props {
  ADD?: boolean;
  DELETE?: boolean;
  direction: string;
  handleClick: () => void;
}

export const MenuButton = ({ ADD, DELETE, handleClick, direction }: Props) => {
  let type;
  if (ADD) type = "plus";
  if (DELETE) type = "cancel";

  return (
    <div
      className={`absolute grid aspect-square w-16 place-content-center transition-all duration-200 ${direction}`}
    >
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="aspect-square w-12 rounded-xl border-2 border-gray-900 bg-gray-500/10 p-1"
        onClick={handleClick}
      >
        <img src={`/${type}.svg`} alt={type} />
      </motion.button>
    </div>
  );
};
